import "module-alias/register";
import S3Service from "@library/Services/S3Service";
import path from "path";
import fs from "fs";
const dictionary = process.argv[2];
if (fs.existsSync(dictionary)) {
  const filePath = path.join(dictionary);

  const s3 = new S3Service(process.env.S3_BUCKET);

  s3.upload(filePath).then(() => {
    console.log("Upload Successful.");
    process.exit();
  });
} else {
  console.log("Dictionary does not exist.");
  process.exit();
}
