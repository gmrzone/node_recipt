import Sequelize from "sequelize";
import sequilize from "../config/index.js";

export const Category = sequilize.define("category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

export const Recipt = sequilize.define("recipt", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cost: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  categoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: "id",
    },
  },
  time: {
    type: Sequelize.DATE,
  },
});
