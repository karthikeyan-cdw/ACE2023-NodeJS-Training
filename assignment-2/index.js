let http = require("http");
let url = require("url");
let colorData = require("./data");
http
  .createServer((req, res, err) => {
    if (err) {
      console.log(err);
      return;
    }
    if (res === "localhost://4000") {
      return;
    }
    let data = colorData.getRandom(5);
    res.write(JSON.stringify(data));
    res.end();
  })
  .listen(4000);
