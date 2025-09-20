import express from "express";
import SEQUELIZE from "./configs/database.js";
import BookRoutes from "./routes/v1/BookRoutes.js";

const APP = express();

APP.use(express.json());

SEQUELIZE.sync().then(() => {
    console.log("se sincronizo la base");
})

APP.use("/api/v1/books",BookRoutes);

export default APP;