// banner의 DB 생성
module.exports = function (sequelize, dataTypes) {
  // table 명 'Banner'로 생성
  const banner = sequelize.define("Banner", {
    imageurl: {
      type: dataTypes.STRING(300),
      allowNull: false,
    },
    // 이미지 클릭했을 때 어떤 경로로 이동할 것인지의 정보
    href: {
      type: dataTypes.STRING(200),
      allowNull: false,
    },
  });
  return banner;
};
