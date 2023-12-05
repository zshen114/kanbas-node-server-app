import express from 'express'
import session from "express-session";
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import "dotenv/config";
import UserRoutes from "./users/routes.js";
import AssignmentsRoutes from "./assignments/routes.js";
import mongoose from "mongoose";

const DB_CONNECTION = process.env.DB_CONNECTION || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(DB_CONNECTION);
const app = express()
app.use(cors({credentials: true,
        origin: process.env.FRONTEND_URL ?
            new RegExp(`.*${process.env.FRONTEND_URL}.*`) : "http://localhost:3000",
    }
));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.FRONTEND_URL) {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}

app.use(
    session(sessionOptions)
);


app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentsRoutes(app);
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000);