const getJobModel = (sequelize, { DataTypes }) => {
  const Job = sequelize.define("job", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  //   Job.associate = (models) => {
  //     Job.belongsTo(models.User);
  //   };

  return Job;
};

export default getJobModel;
