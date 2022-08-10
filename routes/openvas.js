var shell = require("shelljs");
var process = require("process");
const { resolveSoa } = require("dns");

const openvas = async (req, res) => {
  shell.exec(`${process.cwd()}/scripts/openvas.sh`, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== 0) {
      res.status(400);
      res.json({ status: "error", error: stderr });
    } else {
      res.status(200);
      res.json({ status: "ok", output: stdout });
    }
  });
};
module.exports = openvas;
