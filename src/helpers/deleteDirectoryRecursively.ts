import fs from "fs";
import path from "path";

function deleteDirectoryRecursively(dir: string) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        deleteDirectoryRecursively(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(dir);
  }
}
export default deleteDirectoryRecursively;
