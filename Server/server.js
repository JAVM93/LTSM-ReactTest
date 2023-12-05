import apicache from "apicache";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import reportRoutes from "./routes/report.js";
// import { register } from "./controllers/auth.js";
import { createReport } from "./controllers/report.js";
import { verifyToken } from "./middleware/auth.js";


/*SWAGGER*/
import swaggerUi from 'swagger-ui-express'; 
//const swaggerDocument = require('./swagger.json');
import swaggerDocument from './swagger.json' assert { type: "json" };

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const cache = apicache.middleware;

app.use(express.json());
app.use(helmet());
app.use(cache("2 minutes"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES WITH FILES */
// app.post("/auth/register", register);
app.post("/report", verifyToken, createReport);

/* ROUTES add verifyToken*/
app.use("/auth", authRoutes);  
app.use("/users", userRoutes);
app.use("/report", reportRoutes);

// get("/users/getUsers", getUsers);
// get("/users/find", getUsers)
// get("/users/users/:id", getUserById); 
// post("/users/save", saveUser);
// patch("/users/update/:id", updateUser);
// delete("/users/delete/:id", deleteUser);
// get("/users/getUserlist", getUserlist);



/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

  /*SWAGGER*/
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));