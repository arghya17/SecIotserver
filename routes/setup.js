const shell = require("shelljs");
const cp = require("child_process");
const process = require("process");
const path = require("path");
const fs = require("fs");

let setup = async (req, res) => {
  await shell.exec(
    `${process.cwd()}/scripts/setup.sh`,
    (error, stdout, stderr) => {
      //console.log(stdout);
      console.log(stderr);
      if (error !== 0) {
        res.status(400);
        return res.json({ status: "error", error: stderr });
      } else {
        res.status(200);
        res.json({ status: "ok", output: stdout });
      }
    }
  );
};
module.exports = setup;
