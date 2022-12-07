import express from "express";
import boardList from "../models/index.js";
import moment from "moment";

const date_format = moment().format("YY-MM-DD");
const time_format = moment().format("h:mm:ss");
const Board = boardList.models.board_detail;
const Reply = boardList.models.reply;

// 데이터 베이스 import
// import bbsDB from "../models/.."

const router = express.Router();

router.get("/", (req, res) => {
  res.send("포럼입니다");
});

router.get("/board/:id", async (req, res) => {
  const id = req.params.id;

  let replies;
  try {
    replies = await Reply.findAll({ where: { board_code: id } });
  } catch (err) {
    res.send(err);
  }
  try {
    const result = await Board.findOne({ where: { seq: id } });
    console.log(result);
    res.render("board", { result, replies });
  } catch (err) {
    res.send(err);
  }
});

router.post("/board/:boardSeq", async (req, res) => {
  const { boardSeq, replyContent } = req.body;
  // console.log(req.body);
  // console.log(boardSeq, replyContent);

  const reply = {
    board_code: boardSeq,
    r_nickname: "",
    r_content: replyContent,
    b_img: "",
    r_update_date: date_format + time_format,
    r_modified_date: "",
    r_remove_date: "",
  };
  console.log(boardSeq);
  try {
    await Reply.create(reply);
    // console.log(replyresult);
  } catch (err) {
    console.error(err);
  }

  try {
    const result = await Reply.findAll({ where: { board_code: boardSeq } });
    // console.log(result);
    res.json(result);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:loadFor", async (req, res) => {
  let loadFor = req.params.loadFor;
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
});

export default router;
