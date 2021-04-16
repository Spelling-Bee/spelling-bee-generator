import AWS from "aws-sdk";
import path from "path";
import fs from "fs";
import mime from "mime-types";

class S3Service {
  Bucket: string;
  s3: AWS.S3;
  files: Promise<string[]>;

  constructor(Bucket: string) {
    this.Bucket = Bucket;
    this.s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    this.files = this.s3
      .listObjects({ Bucket })
      .promise()
      .then((data) => {
        return data.Contents.map((object) => object.Key);
      });
  }

  public async upload(filePath: string, directory = "") {
    if (this.isDirectory(filePath)) {
      const files = fs.readdirSync(filePath);
      for (const file of files) {
        await this.upload(
          path.join(filePath, file),
          path.join(directory, path.basename(filePath))
        );
      }
    } else {
      await this.uploadFile(filePath, directory);
    }
  }

  public async uploadFile(filePath: string, directory: string = "") {
    const Key = path.join(directory, path.basename(filePath));
    await this.s3.createBucket({ Bucket: this.Bucket }).promise();

    if (!(await this.files).includes(Key)) {
      const fileStream = fs.createReadStream(filePath);

      await this.s3
        .upload({
          Bucket: this.Bucket,
          Body: fileStream,
          Key,
          ContentType: mime.lookup(path.extname(filePath)) || undefined,
          ACL: "public-read",
        })
        .promise();
    } else {
      console.log(Key, "already exists");
    }
  }

  protected isDirectory(filePath: string) {
    return fs.lstatSync(filePath).isDirectory();
  }
}

export default S3Service;
