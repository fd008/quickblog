import { Sequelize, DataTypes } from "sequelize";
import path from "path";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve("../data/data.db")
});

try {
    await sequelize.authenticate();
    console.log("Connection has been made!")
} catch (error) {
    console.error("error ", error);
}

export {DataTypes}
export default sequelize;