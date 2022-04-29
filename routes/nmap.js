var shell = require("shelljs");
var cp = require("child_process");
var process = require("process");
//req.userData contains _id and username fields from checkAuth which can be extracted
const scan = async (req, res) => {
  var savefile = "n";
  var { choice, ip } = req.body;
  var nmap = shell.exec(
    `${process.cwd()}/server/scripts/nmap.sh`,
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
  if (choice === 2) {
    nmap.stdin.write(`${choice} \n`); //these are the inputs provided by the user to the bash file
    var ports = req.body;
    nmap.stdin.write(`${ports} \n`);
    nmap.stdin.write(`${ip} \n`);
    nmap.stdin.write(`${savefile} \n`);
  } else {
    nmap.stdin.write(`${choice} \n`); //these are the inputs provided by the user to the bash file
    nmap.stdin.write(`${ip} \n`);
    nmap.stdin.write(`${savefile} \n`);
  }
};

module.exports = scan;

// var choice = 1;
// var ip = "127.0.0.1";
// var savefile = "n";
// var nmap = shell.exec(
//   `${process.cwd()}/scripts/nmap.sh`,
//   (error, stdout, stderr) => {
//     console.log(typeof stdout);
//     console.log(stderr);
//     if (error !== 0) {
//       console.log(`exec error: ${error}`);
//     } else {
//       console.log("\n\n", stdout, "\n\n");
//     }
//   }
// );
// if (choice === 2) {
//   nmap.stdin.write(`${choice} \n`); //these are the inputs provided by the user to the bash file
//   var ports = req.body;
//   nmap.stdin.write(`${ports} \n`);
//   nmap.stdin.write(`${ip} \n`);
//   nmap.stdin.write(`${savefile} \n`);
// } else {
//   nmap.stdin.write(`${choice} \n`); //these are the inputs provided by the user to the bash file
//   nmap.stdin.write(`${ip} \n`);
//   nmap.stdin.write(`${savefile} \n`);
// }
//above code is for testing purpose only and hence commented out
