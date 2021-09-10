const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

// products경로로 GET 명령을 했을 때 두번째 인자 함수가 실행 됨
app.get("/products", (req, res) => {
  const query = req.query;
  console.log("QUERY:", query);
  res.send({
    product: [
      {
        id: 1,
        name: "농구공",
        price: 100000,
        seller: "조던",
        imageurl: "images/products/basketball1.jpeg",
      },
      {
        id: 2,
        name: "축구공",
        price: 500000,
        seller: "메시",
        imageurl: "images/products/soccerball1.jpg",
      },
      {
        id: 3,
        name: "키보드",
        price: 10000,
        seller: "그랩",
        imageurl: "images/products/keyboard1.jpg",
      },
    ],
  });
});

// 브라우저 주소창에서는 GET method만 활용가능
// post method도 이용해보기 위해서는 postman 사용하면 됨!
app.post("/products", (req, res) => {
  // POST는 바디에 data 담을 수 있음
  const body = req.body;
  res.send({
    body: body,
  });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  res.send(`id는 ${id}입니다.`);
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다.");
});
