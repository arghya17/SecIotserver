var shell = require("shelljs");
var process = require("process");
const fs = require("fs");

//exname is the name of malicious executable in metasploit.sh
//spayload is the send payload option
var metasploit1 = async (req, res) => {
  let meta = shell.exec(
    `${process.cwd()}/scripts/metasploit2.sh`,
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
    }
  );
  // try {
  //   shell.rm(`${payload}.exe`);
  // } catch (err) {
  //   console.error(err);
  // }
  res.json({ status: "ok", output: "metasploit console started " });
};

module.exports = metasploit1;
