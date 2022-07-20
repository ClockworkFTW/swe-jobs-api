const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  //   User.associate = (models) => {
  //     User.hasMany(models.Message, { onDelete: "CASCADE" });
  //   };

  return User;
};

export default getUserModel;
