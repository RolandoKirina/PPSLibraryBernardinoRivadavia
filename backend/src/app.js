import express from "express";
import sequelize from "./configs/database.js";
import BookRoutes from "./routes/v1/book/BookRoutes.js";
//loan
import LoanRoutes from "./routes/v1/loan/LoanRoutes.js";
import BookReservationsRoutes from './routes/v1/loan/BookReservationsRoutes.js';
import ReservationsRoutes from './routes/v1/loan/ReservationsRoutes.js';
import LoanBookRoutes from './routes/v1/loan/LoanBookRoutes.js';
import LoanTypeRoutes from './routes/v1/loan/LoanTypeRoutes.js';

//author
import AuthorsRoutes from './routes/v1/author/AuthorsRoutes.js';
import BookAuthor from './routes/v1/author/BookAuthorRoutes.js';

const app = express();

app.use(express.json());

sequelize.sync().then(() => {
    console.log("se sincronizo la base");
})

app.use("/api/v1/books",BookRoutes);

//loan
app.use("/api/v1/loans", LoanRoutes);
app.use("/api/v1/book-reservations", BookReservationsRoutes);
app.use("/api/v1/reservations", ReservationsRoutes);
app.use("/api/v1/loan-books", LoanBookRoutes);
app.use("/api/v1/loan-types", LoanTypeRoutes);

//author
app.use("/api/v1/authors", AuthorsRoutes);
app.use("/api/v1/book-authors", BookAuthor);


export default app;