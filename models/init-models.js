import _holiday from "./holiday_model.js";
const initModels = (sequelize) => {
  const holiday = _holiday(sequelize);

  return {
    holiday,
  };
};

export default initModels;
