import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import helmet, { xssFilter } from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import session from "express-session";
import passport from "./passport";

const app = express();

interface CustomRequest extends Request {
  requestTime?: string;
}

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(ExpressMongoSanitize());
app.use(xssFilter());
app.use(hpp());
app.use(
  session({
    name: "session",
    secret: "dupa",

    // Cookie Options
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);
app.use(express.static(`${__dirname}/public`));

app.use(passport.initialize());
app.use(passport.session());

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => res.send("Hello FriendHub"));

app.use("/api/v1/user", userRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: `Cannot find ${req.originalUrl} on this server`,
  });

  const err: CustomError = new Error(
    `Cannot find ${req.originalUrl} on this server`
  );
  err.status = "failed";
  err.statusCode = 404;

  next(err);
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
