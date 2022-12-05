import express from "express";
import boardList from "../models/index.js";

const Board = boardList.models.board_detail;

// 데이터 베이스 import
// import bbsDB from "../models/.."

const router = express.Router();

router.get("/", (req, res) => {
  res.send("포럼입니다");
});

router.get("/board/:id", async (req, res) => {
  const id = req.params.id
  const seqNum = id.substring(1)
  try {
    const result = await Board.findOne({where:{seq:seqNum}})
    console.log(result)
    res.render("board", {result})
  } catch (err) {
    res.send(err)
  }  
});

router.get("/:loadFor", async (req, res) => {
  let loadFor = req.params.loadFor;
  // console.log(loadFor);
  let list = loadFor.substring(1, loadFor.length);
  // console.log(list);

  try {
    const boardResult = await Board.findAll({
      where: { sort_board: list },
      limit: 14,
    });
    return res.json(boardResult);
  } catch (err) {
    console.error(err);
    return res.send("좀 더 수련해");
  }
});

export default router;
