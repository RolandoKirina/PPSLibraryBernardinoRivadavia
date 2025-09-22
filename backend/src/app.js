import express from "express";
import sequelize from "./configs/database.js";
import BookRoutes from "./routes/v1/BookRoutes.js";

const app = express();

app.use(express.json());

sequelize.sync().then(() => {
    console.log("se sincronizo la base");
})

app.use("/api/v1/books",BookRoutes);

export default app;