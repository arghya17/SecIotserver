var shell = require("shelljs");
var process = require("process");

//exname is the name of malicious executable in metasploit.sh
//spayload is the send payload option
var metasploit = async (req, res) => {
  var { ip, port, exname } = req.body;
  var { spayload } = req.body;
  if (spayload === "") {
    spayload = "n";
  }
  var meta = shell.exec(
    `${process.cwd()}/scripts/metasploit.sh`,
    (error, stdout, stderr) => {
      console.log(stdout);
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
  meta.stdin.write(`${ip} \n`);
  meta.stdin.write(`${port} \n`);
  meta.stdin.write(`${exname} \n`);
  meta.stdin.write(`${spayload} \n`);
  shell.rm(`${exname}.exe`);
};

module.exports = metasploit;

//code for dry run

// var ip = "127.0.0.1";
// var spayload = "n";
// var port = 3000;
// var exname = "abdc";
// shell.rm("-f", `${exname}.exe`);
// if (spayload === "") {
//   spayload = "n";
// }
// var meta = shell.exec(
//   `${process.cwd()}/scripts/metasploit.sh`,
//   (error, stdout, stderr) => {
//     console.log(stdout);
//     console.log(stderr);
//     if (error !== 0) {
//       res.status(400);
//       return res.json({ status: "error", error: stderr });
//     } else {
//       res.status(200);
//       res.json({ status: "ok", output: stdout });
//     }
//   }
// );
// meta.stdin.write(`${ip} \n`);
// meta.stdin.write(`${port} \n`);
// meta.stdin.write(`${exname} \n`);
// meta.stdin.write(`${spayload} \n`);
