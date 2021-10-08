const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    //inserindo datatype da nova coluna
    phone_num: DataTypes.STRING,
  });

  return User;
};

module.exports = User;