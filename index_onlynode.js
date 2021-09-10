var http = require("http");
var hostname = "127.0.0.1";
var port = 8080;

// node js로 만으로 서버를 개발하기에는 코드가 매우 복잡해진다.
// 그래서 사용하는 것이 Express!
const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;
  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const products = JSON.stringify([
        {
          name: "농구공",
          price: 50000,
        },
      ]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성되었습니다.");
    }
  } else {
    res.end("good bye");
  }
});

// listen : 요청을 기다리고 있다는 의미
// localhost:8080  브라우저를 열면 listen 실행
server.listen(port, hostname);

console.log("Grab Market Server ON!");
