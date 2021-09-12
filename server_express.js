const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const port = 8080;

app.use(express.json());
app.use(cors());

// products경로로 GET 명령을 했을 때 두번째 인자 함수가 실행 됨
app.get("/products", (req, res) => {
  // findAll을  limit 없이 써버리면 DB를 다읽어서 비효율적이 코드가 되어버림
  models.Product.findAll({
    // limit: 1,
    order: [["createdAt", "DESC"]],
    // 필요한 정보들만 get할 수 있도록 한다
    attributes: ["id", "name", "price", "createdAt", "seller", "imageurl"],
  })
    .then((result) => {
      res.send({
        products: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러발생");
      //   const query = req.query;
      //   console.log("QUERY:", query);
      //   res.send({
      //     product: [
      //       {
      //         id: 1,
      //         name: "농구공",
      //         price: 100000,
      //         seller: "조던",
      //         imageurl: "images/products/basketball1.jpeg",
      //       },
      //       {
      //         id: 2,
      //         name: "축구공",
      //         price: 500000,
      //         seller: "메시",
      //         imageurl: "images/products/soccerball1.jpg",
      //       },
      //       {
      //         id: 3,
      //         name: "키보드",
      //         price: 10000,
      //         seller: "그랩",
      //         imageurl: "images/products/keyboard1.jpg",
      //       },
      //     ],
    });
});

// 브라우저 주소창에서는 GET method만 활용가능
// post method도 이용해보기 위해서는 postman 사용하면 됨!
app.post("/products", (req, res) => {
  // 2. 쌓여있는 Data 조회해서 결과 보여주기
  models.Product.findAll()
    .then((result) => {
      res.send({
        products: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러발생");
    });
  // 1. 직접 DB에 데이터 입력해서 결과 보여주기
  // // POST는 바디에 data 담을 수 있음
  // const body = req.body;
  // const { name, description, price, seller } = body;
  // // 방어 코드 생성
  // if (!name || !description || !price || !seller) {
  //   res.send("모든 필드를 입력해주세요");
  // }
  // models.Product.create({
  //   name,
  //   description,
  //   price,
  //   seller,
  // })
  //   .then((result) => {
  //     console.log("상품 생성 결과: ", result);
  //     res.send({
  //       result,
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.send("상품 업로드에 문제가 발생했습니다.");
  //   });
  // // res.send({
  // //   body: body,
  // // });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.log("상품 조회에 에러가 발생했습니다.");
    });
  // res.send(`id는 ${id}입니다.`);
});

app.listen(port, () => {
  console.log("Seoyeon's 서버가 돌아가고 있습니다.");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공!");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB 연결 에러!");
      process.exit();
    });
});
