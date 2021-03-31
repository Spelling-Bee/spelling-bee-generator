import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";
import createDirectoryRecursively from "@helpers/createDirectoryRecursively";
import fs from "fs";
import path from "path";

describe("deleteDirectoryRecursively", () => {
  const dir = "test/output";

  beforeEach(() => {
    createDirectoryRecursively(dir);
  });

  it("can delete a directory", () => {
    expect(fs.existsSync(dir)).toBeTruthy();
    deleteDirectoryRecursively(dir);
    expect(fs.existsSync(dir)).toBeFalsy();
  });

  it("can delete a directory recursively", () => {
    expect(fs.existsSync(path.dirname(dir))).toBeTruthy();
    deleteDirectoryRecursively(path.dirname(dir));
    expect(fs.existsSync(path.dirname(dir))).toBeFalsy();
  });
});
