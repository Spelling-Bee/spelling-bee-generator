import createDirectoryRecursively from "@helpers/createDirectoryRecursively";
import deleteDirectoryRecursively from "@helpers/deleteDirectoryRecursively";
import fs from "fs";
import path from "path";

describe("createDirectoryRecursively", () => {
  const dir = "test/path";

  afterEach(() => {
    deleteDirectoryRecursively(dir);
  });

  it("can create a directory", () => {
    expect(fs.existsSync(path.dirname(dir))).toBeFalsy();
    createDirectoryRecursively(path.dirname(dir));
    expect(fs.existsSync(path.dirname(dir))).toBeTruthy();
  });

  it("can create a directory recursively", () => {
    expect(fs.existsSync(dir)).toBeFalsy();
    createDirectoryRecursively(dir);
    expect(fs.existsSync(dir)).toBeTruthy();
  });
});
