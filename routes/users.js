import express, { query } from "express";
import upload from "../modules/file_upload.js";
import DB from "../models/index.js";
import moment from "moment";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm:ss";
const Board = DB.models.board_detail;
const User = DB.models.user;
const IntGen = DB.models.genre_of_interest;

const router = express.Router();

router.get("/join", (req, res) => {
  res.render("users/join");
});
router.get("/join/register", (req, res) => {
  res.render("users/register");
});
router.get("/bltBrd", async (req, res) => {
  res.redirect("/users/bltBrd/page/1");
});
router.get("/bltBrd/page/:page", async (req, res) => {
  let pageNum = req.params.page; // 요청 페이지 넘버
  let offset = 0;
  const limit = 17;
  const pageCount = 5;

  // 공지사항을 SELECT
  const lists = await Board.findAll({
    where: { sort_board: "공지사항" },
    limit: 3,
  });

  // 공지사항이 없는 게시물이 몇개인지 SELECT (totalCount = 게시물의 숫자)
  const countSql =
    "SELECT * FROM board_detail WHERE sort_board NOT IN ('공지사항')";
  const totalCount = await Board.sequelize.query(countSql, {
    type: QueryTypes.SELECT,
  });

  const totalPage = Math.ceil(totalCount.length / limit); // 총 페이지 숫자
  const pageGroup = Math.ceil(Number(pageNum) / pageCount);

  if (pageNum > 1) {
    offset = limit * (pageNum - 1);
  }
  const sql = `SELECT * FROM board_detail ORDER BY sort_board = "공지사항" asc limit ${limit} offset ${offset}`;
  const boards = await Board.sequelize.query(sql, {
    type: QueryTypes.SELECT,
  });
  console.log(boards);
  const boardsList = boards.filter((category) => {
    return category.sort_board != "공지사항";
  });
  res.render("users/bltBrd", {
    lists,
    boardsList,
    body: "all",
    totalPage,
    pageGroup,
    pageNum,
  });
});

router.get("/bltBrd/Notice/page/:page", async (req, res) => {
  let pageNum = req.params.page;
  const limit = 17;
  let offset = 0;
  const pageCount = 5;

  if (pageNum > 1) {
    offset = limit * (pageNum - 1);
  }

  const lists = await Board.findAll({
    where: { sort_board: "공지사항" },
    limit: limit,
    offset: offset,
  });

  const totalPage = Math.ceil(lists.length / limit); // 총 페이지 숫자
  const pageGroup = Math.ceil(pageNum / pageCount);

  res.render("users/bltBrd", {
    lists,
    body: "Notice",
    pageNum,
    totalPage,
    pageGroup,
  });
});
router.get("/bltBrd/category/:category/page/:page", async (req, res) => {
  const category = req.params.category;
  let pageNum = req.params.page;
  const limit = 17;
  let offset = 0;
  const pageCount = 5;

  if (pageNum > 1) {
    offset = limit * (pageNum - 1);
  }

  const lists = await Board.findAll({
    where: { sort_board: "공지사항" },
    limit: 3,
  });
  const pages = await Board.findAll({
    where: { sort_board: category },
  });
  const boards = await Board.findAll({
    where: { sort_board: category },
    limit: limit,
    offset: offset,
  });
  const totalPage = Math.ceil(pages.length / limit); // 총 페이지 숫자
  const pageGroup = Math.ceil(pageNum / pageCount);
  console.log(pageGroup);
  res.render("users/bltBrd", {
    lists,
    boards,
    body: category,
    pageNum,
    totalPage,
    pageGroup,
  });
});

router.get("/bltBrd/detail", (req, res) => {
  res.render("users/detail");
});
router.get("/bltBrd/write", (req, res) => {
  res.render("users/write");
});
let nickname = 0;
router.post(
  "/bltBrd/write",
  upload.single("c_image_file"),
  async (req, res) => {
    if (req.session.user) {
      nickname = req.session.user.nickname;
    }
    const { b_title, sort_board, b_content } = req.body;
    const date = moment().format(dateFormat);
    const time = moment().format(timeFormat);
    const b_update_date = date + " " + time;
    const item = {
      b_title,
      sort_board,
      b_content,
      b_img: req?.file?.filename,
      b_nickname: nickname || "익명",
      b_update_date,
      b_Views: 0,
    };
    try {
      await Board.create(item);
      res.redirect("/users/bltBrd");
    } catch (err) {
      console.error(err);
      res.send("SQL 오류");
    }
  }
);

// 로그인 구현
router.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;
  // console.log({
  //   user_id,
  //   user_pw,
  // });
  const userInfo = await User.findByPk(user_id);
  // console.log(userInfo);
  if (userInfo) {
    const pw = userInfo.password;
    if (pw !== user_pw) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<script>alert('비밀번호가 틀렸습니다')</script>");
      return res.write("<script>location.href='/main'</script>");
    }
  } else {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('회원정보가 없습니다')</script>");
    return res.write("<script>location.href='/main'</script>");
  }
  req.session.user = userInfo;
  console.log(req.session.user);
  req.session.save(() => {
    res.redirect("/main");
  });
});

// 로그아웃 구현
router.get("/logout", (req, res) => {
  var session = req.session;
  try {
    if (session.user) {
      req.session.destroy();
    }
  } catch (err) {
    return console.error(err);
  }
  return res.redirect("/main");
});

// 회원가입 구현
router.post("/join/register", async (req, res) => {
  const joinInfo = req.body;
  joinInfo.level = 3;
  const userGenre = req.body.genre;

  // 유저-장르 테이블에 넣을 데이터이다
  const genreArray = userGenre.map((genre) => {
    const genreModel = {
      username: req.body.username,
      genre_code: genre,
    };
    return genreModel;
  });
  // console.log(joinInfo);
  try {
    const userUpload = await User.create(joinInfo);
    const genreUpload = await IntGen.bulkCreate(genreArray);
  } catch (err) {
    return console.error(err);
  }
  return res.redirect("/main");
});

router.get("/join/register/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const username = await User.findByPk(email);
    if (username) {
      return res.json({ status: "YES", message: "이미 사용중인 이메일입니다" });
    } else {
      return res.json({ status: null, message: "사용가능한 이메일입니다" });
    }
  } catch (err) {
    res.send("SQL 오류");
  }
});

export default router;
