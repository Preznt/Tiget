/**
 * express generator ES6+ template
 * @author : callor@callor.com
 * @since : 2020-12-10
 * @update : 2022-11-01
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */

// essential modules
import express from "express";
import createError from "http-errors";
import path from "path";

// 3rd party lib modules
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import { atlasURL } from "../config/mongoDB.js";
import expressSession from "express-session";

// sample router modules
import EntranceRouter from "../routes/entrance.js";
import calendarRouter from "../routes/calendar.js";
import detailRouter from "../routes/detail.js";
import usersRouter from "../routes/users.js";
// import spcdeInfo from "../routes/spcdeInfo.js";
// import perdisPeriod from "../routes/perdisPeriod.js";
// import perdisArea from "../routes/perdisArea.js";
// import perdisRealm from "../routes/perdisRealm.js";
// import perdisSeq from "../routes/perdisSeq.js";
// import prfrList from "../routes/prfrList.js";
// import prfrDetail from "../routes/prfrDetail.js";

// create express framework
const app = express();

const dbConn = mongoose.connection;
// mongoose 를 통해 mongoDB 정상 접속 시 최초 한번 실행
dbConn.once("open", () => {
  console.log("MongoDB Connected");
});
// db 연결 후 문제 발생 시 호출
dbConn.on("error", (err) => {
  if (err) {
    console.err(err);
  }
});
await mongoose.connect(atlasURL);

const sessionOption = {
  key: "tiget", // session ID(key)
  secret: "12345", // session 암호화 할때 사용할 비번
  resave: false, // 매번 session 새로 작성할 것인가, 성능상 문제로 false 권장
  saveUninitialized: false, // 모든 session 을 저장할 것인가, 성능상 문제로 false 권장
  httpOnly: false,
  originalMaxAge: 1000 * 600, // 1000밀리초 * 60 = 1분
};
app.use(expressSession(sessionOption));

// Disable the fingerprinting of this web technology.
app.disable("x-powered-by");

// view engine setup
app.set("views", path.join("views"));
app.set("view engine", "pug");

// middleWare enable
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("public")));

app.use("/", (req, res, next) => {
  // app.locals : ejs, pug 등 view Template 에서 서버의
  // global 데이터에 접근하는 통로
  if (req.session.user) {
    // 로그인이 되면 global 변수에
    // session 에 담긴 user 정보를 추가
    app.locals.user = req.session?.user;
  } else {
    // 로그아웃이 되었거나, 어떤이유로 session 에 로그인 정보가 없으면
    // globa; 데이터에서 user 데이터 제거
    delete app.locals.user;
  }

  console.log("유저정보", req.session.user);
  // control을 다음(여기는 router)으로 전달
  // next() 를 생략하면 다음의 router 작동되지 않는다
  next();
});

// router link enable
app.use("/", EntranceRouter);
app.use("/main", calendarRouter);
app.use("/detail", detailRouter);
app.use("/users", usersRouter);
// app.use("/holiday", spcdeInfo);
// app.use("/period", perdisPeriod);
// app.use("/area", perdisArea);
// app.use("/realm", perdisRealm);
// app.use("/seq", perdisSeq);
// app.use("/prfrlist", prfrList);
// app.use("/prfrdetail", prfrDetail);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
