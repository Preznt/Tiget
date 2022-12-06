import express from "express";
import upload from "../modules/file_upload.js";
import DB from "../models/index.js";
import moment from "moment";
import user from "../models/user.js";
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
  const lists = await Board.findAll({
    where: { sort_board: "공지사항" },
    limit: 3,
  });
  const boards = await Board.findAll();
  const boardsList = boards.filter((category) => {
    return category.sort_board != "공지사항";
  });
  res.render("users/bltBrd", { lists, boardsList, body: "all" });
});
router.get("/bltBrd/Notice", async (req, res) => {
  const lists = await Board.findAll({ where: { sort_board: "공지사항" } });
  res.render("users/bltBrd", { lists, body: "Notice" });
});
router.get("/bltBrd/category/:category", async (req, res) => {
  const category = req.params.category;
  console.log(category);
  const lists = await Board.findAll({
    where: { sort_board: "공지사항" },
    limit: 3,
  });
  const boards = await Board.findAll({ where: { sort_board: category } });
  res.render("users/bltBrd", { lists, boards, body: category });
});
router.get("/bltBrd/detail", (req, res) => {
  res.render("users/detail");
});
router.get("/bltBrd/write", (req, res) => {
  res.render("users/write");
});
router.post(
  "/bltBrd/write",
  upload.single("c_image_file"),
  async (req, res) => {
    const { b_title, sort_board, b_content } = req.body;
    const date = moment().format(dateFormat);
    const time = moment().format(timeFormat);
    const b_update_date = date + " " + time;
    const item = {
      b_title,
      sort_board,
      b_content,
      b_img: req?.file?.filename,
      b_nickname: "익명",
      b_update_date,
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
  console.log({
    user_id,
    user_pw,
  });
  const userInfo = await User.findByPk(user_id);
  console.log(userInfo);
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
  req.session.save(() => {
    res.redirect("/");
  });
});

router.get("/logout", (req, res) => {
  var session = req.session;
  try {
    if (session.user) {
      req.session.destroy((err) => {
        if (err) console.error(err);
      });
    }
  } catch (err) {
    return console.error(err);
  }
  return res.redirect("/main");
});

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
export default router;
