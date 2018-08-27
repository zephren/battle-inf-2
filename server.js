const http = require("http");
const fs = require("fs");

const port = 8080;

http
  .createServer((req, res) => {
    const url = req.url;

    console.log(url);

    if (url === "/") {
      fs.readFile("./dist/index.html", "utf8", function(err, contents) {
        if (!err) {
          res.write(contents);
          res.end();
        } else {
          res.statusCode = 404;
          res.end();
        }
      });
    } else if (!url.includes("..")) {
      const path = "./dist" + url;

      fs.readFile(path, "utf8", function(err, contents) {
        if (!err) {
          res.write(contents);
          res.end();
        } else {
          res.statusCode = 404;
          res.end();
        }
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
  .listen(port, () => {
    console.log("Listening on " + port);
  });
