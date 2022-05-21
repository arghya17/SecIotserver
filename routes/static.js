const shell = require("shelljs");
const cp = require("child_process");
const process = require("process");
const path = require("path");
const fs = require("fs");

let apktool = async (req, res) => {
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
        let data_apk = fs.readFileSync(
          path.join(process.cwd(), "/scripts/results/apktool_result.json"),
          "utf-8"
        );
        res.status(200);
        res.json({ status: "ok", output: JSON.parse(data_apk) });
      }
    }
  );
};
let mobsf = async (req, res) => {
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
        let data_mob = fs.readFileSync(
          path.join(process.cwd(), "/scripts/results/mobsf_results.json"),
          "utf-8"
        );
        res.status(200);
        res.json({ status: "ok", output: JSON.parse(data_mob) });
      }
    }
  );
};
module.exports = { apktool, mobsf };
