import express from "express";
import boardList from "../models/index.js";
import moment from "moment";
<<<<<<< HEAD
import { Sequelize } from "sequelize";
import reply from "../models/reply.js";
=======
>>>>>>> main

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
<<<<<<< HEAD
  // console.log(loadFor);
  let list = loadFor.substring(1, loadFor.length);
  // console.log(list);
  
  try {
    const boardResult = await Board.findAll({
      where: { sort_board: list },
      row:true,
=======
  try {
    const boardResult = await Board.findAll({
      where: { sort_board: loadFor },
>>>>>>> main
      limit: 14,
      include: "f_reply",
    });
<<<<<<< HEAD
    const seqs = boardResult.map((row) => row.seq);
    // console.log(seqs);
    
    const replyCount = await Reply.count({distinct:true, where:{board_code:seqs},group:['board_code']})
    // console.log(replyCount)
    
    // const st = replyCount[0]
    // st.board_code = st.seq
    // const nd = replyCount[1]
    // nd.board_code = nd.seq
    // const rd = replyCount[2]
    // rd.board_code = rd.seq
    // const fth = replyCount[3]
    // fth.board_code = fth.seq
    // const fith = replyCount[4]
    // fith.board_code = fith.seq
    // const sth = replyCount[5]
    // sth.board_code = sth.seq
    // const seth = replyCount[6]
    // seth.board_code = seth.seq
    // const eth = replyCount[7]
    // eth.board_code = eth.seq
    // const nth = replyCount[8]
    // nth.board_code = nth.seq
    // const t = replyCount[9]
    // t.board_code = t.seq
    // const ele = replyCount[10]
    // ele.board_code = ele.seq
    // const twe = replyCount[11]
    // twe.board_code = twe.seq
    // const tth = replyCount[12]
    // tth.board_code = tth.seq
    // boardResult.push(st,nd,rd,fth,fith,sth,seth,eth,nth,t,ele,twe,tth)
    boardResult.push(replyCount)
    console.log(boardResult)
    
    // Object.assign(boardResult[12], boardResult[0])
   
=======
    let replies = [];
    for (let i = 0; i < boardResult.length; i++) {
      replies.push(boardResult[i].f_reply.length);
    }

    boardResult.concat(replies);

    // console.log(boardResult);

>>>>>>> main
    return res.json(boardResult);
  } catch (err) {
    console.error(err);
    return res.send("좀 더 수련해");
  }
});

export default router;
