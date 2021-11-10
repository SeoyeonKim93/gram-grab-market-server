// mobilenet
//  : 이미지나 동영상의 경우 2차원의 데이터는 CNN 알고리즘을 사용하는데,
//    CNN의 대표적인 model 중 하나가 mobilenet임 !

const tf = require("@tensorflow/tfjs-node");
const mobilenet = require("@tensorflow-models/mobilenet");
const fs = require("fs");
// const path = require("path");

// 밖에서 사용하 수 있게 module.export로 함수 꺼내주기
module.exports = function detectProduct(url, callback) {
  const image = fs.readFileSync(url);
  // image를 3차원 형식의 data로 넣어준다
  const input = tf.node.decodeImage(image, 3);
  // console.log(input);
  mobilenet.load().then((model) => {
    //   classify : mobilenet의 기본 함수, model이 어떤 사물인지 분석해 줌
    model.classify(input).then((result) => {
      // className보면 제대로 노트북인 것을 인지하는 것을 확인할 수 있음
      // console.log(result);

      // 가장 유사한 사물의 이름을 callback 함수에 넣어준다
      callback(result[0].className);
    });
  });
};

// // 그냥 경로 입력하면 작동안함, path 변수 사용 필요!
// detectProduct(
//   path.join(__dirname, "../uploads/notebook1.jpg"),
//   function (data) {
//     console.log(data);
//   }
// );
