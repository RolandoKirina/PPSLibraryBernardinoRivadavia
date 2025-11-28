import express from "express";
import { sequelize } from "./models/index.js";

// book
import BookRoutes from "./routes/v1/book/BookRoutes.js";
import BookKeyRoutes from "./routes/v1/book/BookKeyRoutes.js";
import KeyRouter from "./routes/v1/book/KeyRouter.js";
import SignsRouter from "./routes/v1/book/SignsRoutes.js";
import StatsBookRoutes from "./routes/v1/book/StatsBookRoutes.js";

// fee
import FeeRouter from "./routes/v1/fee/FeeRouter.js";
import LastGenerationRouter from "./routes/v1/fee/LastGenerationRouter.js";

// partner
import LocalityRouter from "./routes/v1/partner/LocalityRouter.js";
import MaritalStatusRouter from "./routes/v1/partner/MaritalStatusRouter.js";
import PartnerCategoryRouter from "./routes/v1/partner/PartnerCategoryRouter.js";
import PartnerRouter from "./routes/v1/partner/PartnerRouter.js";
import ReaderRouter from "./routes/v1/reader/ReaderRouter.js"; 
import ReasonForWithDrawalRouter from "./routes/v1/partner/ReasonForWithDrawalRouter.js";
import statePartner from "./routes/v1/partner/StatePartner.js";

// loan
import LoanRoutes from "./routes/v1/loan/LoanRoutes.js";
import BookReservationsRoutes from "./routes/v1/loan/BookReservationsRoutes.js";
import ReservationsRoutes from "./routes/v1/loan/ReservationsRoutes.js";
import LoanBookRoutes from "./routes/v1/loan/LoanBookRoutes.js";
import LoanTypeRoutes from "./routes/v1/loan/LoanTypeRoutes.js";

// author
import AuthorsRoutes from "./routes/v1/author/AuthorsRoutes.js";
import BookAuthor from "./routes/v1/author/BookAuthorRoutes.js";

// options
import BookTypeGroupListRoutes from "./routes/v1/options/BookTypeGroupListRoutes.js";
import BookTypeGroupRoutes from "./routes/v1/options/BookTypeGroupRoutes.js";
import BookTypeRoutes from "./routes/v1/options/BookTypeRoutes.js";
import EmployeesRoutes from "./routes/v1/options/EmployeesRoutes.js";
import RemoveReasonRoutes from "./routes/v1/options/RemoveReasonRoutes.js";

// readers
import ReaderRoutes from './routes/v1/reader/ReaderRouter.js';
import ReaderBookRoutes from './routes/v1/reader/ReaderBookRoutes.js';


import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
sequelize.sync({ alter: true }).then(() => {
  console.log("Se sincronizó la base de datos");
});

app.use("/api/v1/books", BookRoutes);
app.use("/api/v1/books/ranking", BookRoutes);
app.use("/api/v1/stats-books", StatsBookRoutes);

app.use("/api/v1/book-keys", BookKeyRoutes);
app.use("/api/v1/keys", KeyRouter);
app.use("/api/v1/signs", SignsRouter);

app.use("/api/v1/fees", FeeRouter);
app.use("/api/v1/last-generation", LastGenerationRouter);

app.use("/api/v1/localities", LocalityRouter);
app.use("/api/v1/marital-statuses", MaritalStatusRouter);
app.use("/api/v1/partner-categories", PartnerCategoryRouter);
app.use("/api/v1/partners", PartnerRouter);
app.use("/api/v1/reason-for-withdrawal", ReasonForWithDrawalRouter);
app.use("/api/v1/state-partners", statePartner);

app.use("/api/v1/loans", LoanRoutes);
app.use("/api/v1/readers", ReaderRoutes);
app.use("/api/v1/reader-books", ReaderBookRoutes);
app.use("/api/v1/book-reservations", BookReservationsRoutes);
app.use("/api/v1/reservations", ReservationsRoutes);
app.use("/api/v1/loan-books", LoanBookRoutes);
app.use("/api/v1/loan-types", LoanTypeRoutes);

app.use("/api/v1/authors", AuthorsRoutes);
app.use("/api/v1/book-authors", BookAuthor);

app.use("/api/v1/book-type-groups-list", BookTypeGroupListRoutes);
app.use("/api/v1/book-type-groups", BookTypeGroupRoutes);
app.use("/api/v1/book-types", BookTypeRoutes);
app.use("/api/v1/employees", EmployeesRoutes);
app.use("/api/v1/remove-reasons", RemoveReasonRoutes);

export default app;
