import fs from "fs";
import path from "path";

function createDirectoryRecursively(target: string) {
  if (!fs.existsSync(target)) {
    const subTarget = path.dirname(target);
    if (subTarget !== "") {
      createDirectoryRecursively(subTarget);
    }
    fs.mkdirSync(target);
  }
}

export default createDirectoryRecursively;
