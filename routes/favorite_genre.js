import express from "express";
import DB from "../models/index.js";

const Users = DB.models.user;
const genre = DB.models.genre;
const IntGen = DB.models.genre_of_interest;
const router = express.Router();

router.get("/", (req, res) => {
  // const userResult = Users.findAll({
  //   include: [
  //     {
  //       model: IntGen,
  //       attributes: ["username", "genre_code"],
  //     },
  //   ],
  //   // where: { username: "bjw1403@gmail.com" },
  // });

  // res.send(userResult);
  res.render("mypage");
});

router.post("/", (req, res) => {
  const InfoGenre = req.body.pop;
  IntGen.create(InfoGenre);
  res.json(InfoGenre);
});
export default router;
