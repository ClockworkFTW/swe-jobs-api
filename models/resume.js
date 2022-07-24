const getResumeModel = (sequelize, { DataTypes }) => {
  const Resume = sequelize.define("resume", {
    text: {
      type: DataTypes.TEXT,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  });

  Resume.associate = (models) => {
    Resume.belongsTo(models.User);
  };

  return Resume;
};

export default getResumeModel;
