// database.sqlite3 : 실제 Data들이 쌓이게 되는 곳
// DB 모델링 : ./models에서 한다 -> sequelize가 이 곳을 읽어서 DB에 명령을 내림
// commonJS 문법 사용
module.exports = function (sequelize, DataTypes) {
  // Table(Product)생성, 인자에는 column 설정
  // 새로운 column을 추가하면, DB Browser에서 직접 column 추가해주는 과정이 필요
  const product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    seller: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    soldout: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  });
  return product;
};
