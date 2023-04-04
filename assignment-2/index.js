let http = require("http");
let url = require("url");
let colorData = require("./data");
http
  .createServer((request, response, error) => {
    if (error) {
      console.log(error);
      return;
    }
    if (response === "localhost://4000") {
      return;
    }
    let data = colorData.getRandom(5);
    console.log(data);
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(data));
    response.end();
  })
  .listen(4000);
