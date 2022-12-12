import express from "express";
import boardList from "../models/index.js";
import moment from "moment";
import { Sequelize } from "sequelize";
import session from "express-session";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";

const date_format = moment().format("YY-MM-DD");
const time_format = moment().format("h:mm:ss");
const Board = boardList.models.board_detail;
const Reply = boardList.models.reply;
const USER = boardList.models.user;
const USER_REPLY = boardList.models.user_reply;
// 데이터 베이스 import
// import bbsDB from "../models/.."

const router = express.Router();

router.get("/", (req, res) => {
  res.send("포럼입니다");
});

let userID;
router.get("/board/:id", async (req, res) => {
  // console.log(req.session.user);
  const id = req.params.id;
  userID = req.session.user;
  let replies;

  let replyContent = [];
  const updateSql = `update board_detail set b_Views = b_Views +1 where seq = ${id}`;
  await Board.sequelize.query(updateSql, { type: QueryTypes.UPDATE });
  try {
    replies = await Reply.findAll({
      where: { board_code: id },
      include: "f_user",
    });
  } catch (err) {
    res.send(err);
  }
  // console.log(replies[0].f_user.profile_image);

  for (let i = 0; i < replies.length; i++) {
    replyContent.push({
      profile_image: replies[i].f_user.profile_image,
      r_seq: replies[i].r_seq,
      board_code: replies[i].board_code,
      username: replies[i].username,
      nickname: replies[i].nickname,
      r_update_date: replies[i].r_update_date,
      r_modified_date: replies[i].r_modified_date,
      r_remove_date: replies[i].r_remove_date,
    });
  }

  console.log(replyContent);

  try {
    const result = await Board.findOne({ where: { seq: id } });
    // console.log(result);
    res.render("board", { result, users: replyContent });
  } catch (err) {
    res.send(err);
  }
});

router.post("/board/:boardSeq", async (req, res) => {
  const { boardSeq, replyContent } = req.body;
  userID = req.session.user;
  // console.log(userID);
  // console.log(req.body);
  // console.log(boardSeq, replyContent);
  console.log(userID);

  // console.log(reply);

  if (userID == undefined) {
    // res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    // return res.write("<script>location.href='/main'</script>");
    res.status(401).send("로그인이 필요합니다");
  }
  const reply = {
    board_code: boardSeq,
    nickname: userID.nickname,
    r_content: replyContent,
    username: userID.username,
    b_img: "",
    r_update_date: date_format + time_format,
    r_modified_date: "",
    r_remove_date: "",
  };

  try {
    const result = await Reply.create(reply);
  } catch (err) {
    console.log(err);
  }

  try {
    const result = await Reply.findAll({
      where: { board_code: boardSeq },
    });
    res.json(result);
  } catch (err) {
    res.send(err);
  }
  // console.log(result);
});

router.get("/:loadFor", async (req, res) => {
  let loadFor = req.params.loadFor;
  // 전체게시판일시에 따로 불러오기
  if (loadFor === "전체보기") {
    try {
      const boardResult = await Board.findAll({
        limit: 14,
        include: "f_reply",
      });
      let replies = [];
      for (let i = 0; i < boardResult.length; i++) {
        replies.push(boardResult[i].f_reply.length);
      }

      boardResult.concat(replies);

      // console.log(boardResult);

      return res.json(boardResult);
    } catch (err) {
      console.error(err);
      return res.send("좀 더 수련해");
    }
  } else {
    try {
      const boardResult = await Board.findAll({
        where: { sort_board: loadFor },
        limit: 14,
        include: "f_reply",
      });
      let replies = [];
      for (let i = 0; i < boardResult.length; i++) {
        replies.push(boardResult[i].f_reply.length);
      }

      boardResult.concat(replies);

      // console.log(boardResult);

      return res.json(boardResult);
    } catch (err) {
      console.error(err);
      return res.send("좀 더 수련해");
    }
  }
});

export default router;
