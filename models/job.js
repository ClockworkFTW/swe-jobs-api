const getJobModel = (sequelize, { DataTypes }) => {
  const Job = sequelize.define("job", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
    },
    company: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    link: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
    },
  });

  //   Job.associate = (models) => {
  //     Job.belongsTo(models.User);
  //   };

  return Job;
};

export default getJobModel;
