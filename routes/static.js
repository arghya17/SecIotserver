const shell = require("shelljs");
const cp = require("child_process");
const process = require("process");
const path = require("path");
const fs = require("fs");

let static = async (req, res) => {
  await shell.exec(
    `${process.cwd()}/scripts/static.sh -1 ${process.cwd()}/uploads/${
      req.file.filename
    }`,
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== 0) {
        res.status(400);
        return res.json({ status: "error", error: stderr });
      } else {
        res.status(200);
        res.json({ status: "ok" });
      }
    }
  );
  await shell.exec(
    `${process.cwd()}/scripts/static.sh -2 ${process.cwd()}/uploads/${
      req.file.filename
    }`,
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== 0) {
        res.status(400);
        return res.json({ status: "error", error: stderr });
      } else {
        res.status(200);
        res.json({ status: "ok" });
      }
    }
  );
  res.sendFile(path.join(process.cwd(), "/results/apktool_result.json"));
  res.sendFile(path.join(process.cwd()), "/results/mobsf_results.json");
};
module.exports = static;
