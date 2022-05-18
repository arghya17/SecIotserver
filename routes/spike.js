var shell = require("shelljs");
var process = require("process");

var spike = async (req, res) => {
  var { host, port, skipvar, skipstring } = req.body;
  if (skipvar === "") {
    skipvar = 0;
  }
  if (skipstring === "") {
    skipstring = 0;
  }
  var spk = shell.exec(
    `${process.cwd()}/scripts/spike.sh`,
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
  spk.stdin.write(`${host} \n`);
  spk.stdin.write(`${port} \n`);
  spk.stdin.write(`${skipvar} \n`);
  spk.stdin.write(`${skipstring} \n`);
};

module.exports = spike;

//for testing
// var spk = shell.exec(
//   `${process.cwd()}/scripts/spike.sh`,
//   (error, stdout, stderr) => {
//     console.log(stdout);
//     console.log(stderr);
//     //   if (error !== 0) {
//     //     res.status(400);
//     //     return res.json({ status: "error", error: stderr });
//     //   } else {
//     //     res.status(200);
//     //     res.json({ status: "ok", output: stdout });
//     //   }
//   }
// );
// var host = "192.106.0.106";
// var port = 9999;
// var skipvar = 0;
// var skipstring = 0;
// spk.stdin.write(`${host} \n`);
// spk.stdin.write(`${port} \n`);
// spk.stdin.write(`${skipvar} \n`);
// spk.stdin.write(`${skipstring} \n`);
