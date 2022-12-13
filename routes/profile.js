import express from "express";
import modelDB from "../models/index.js";
import upload from "../modules/file_upload.js";
import fs from "fs";
import path from "path";
const router = express.Router();
const userDB = modelDB.models.user;
const genre_of_Interest = modelDB.models.genre_of_interest;
const BoardDB = modelDB.models.board_detail;
const ReplyDB = modelDB.models.reply;

router.get("/", async (req, res) => {
  try {
    let emailID = req.session.user;
    const nickname = emailID.nickname;
    emailID = emailID.username;

    const userInfo = await userDB.findOne({ where: { username: emailID } });
    const userGenre = await genre_of_Interest.findAll({
      raw: true,
      where: { username: emailID },
      include: "GG_genre",
    });
    console.dir(userGenre);

    const Result = await BoardDB.findAll({ where: { b_nickname: nickname } });
    const Reply = await ReplyDB.findAll({ where: { nickname: nickname } });
    // console.log(Result);
    res.render("mypage", {
      body: "users",
      users: userInfo,
      userGenre,
      Result,
      Reply,
    });
  } catch (err) {
    console.error(err);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    return res.write("<script>location.href='/main'</script>");
  }
});

router.post("/", upload.single("b_upfile"), async (req, res) => {
  const profile = req.file.filename;
  let emailID = req.session.user;
  const nickname = emailID.nickname;
  emailID = req.body.username;

  emailID = emailID.slice(9, emailID.length);

  const upLoadDirect = path.join("public/uploads/");
  let user;
  try {
    user = await userDB.findOne({ where: { username: emailID } });
  } catch (err) {
    console.error(err);
  }

  // console.log(upLoadDirect + user.profile_image);
  try {
    fs.existsSync(upLoadDirect + user.profile_image);
    fs.unlinkSync(upLoadDirect + user.profile_image);
  } catch (err) {
    console.log(err);
  }

  try {
    await userDB.update(
      { profile_image: profile },
      { where: { username: emailID } }
    );
  } catch (err) {
    console.error(err);
  }
  console.log(user.username);
  try {
    user = await userDB.findOne({ where: { username: user.username } });

    const userGenre = await genre_of_Interest.findAll({
      raw: true,
      where: { username: emailID },
      include: "GG_genre",
    });
    const Result = await BoardDB.findAll({ where: { b_nickname: nickname } });
    const Reply = await ReplyDB.findAll({ where: { nickname: nickname } });

    return res.render("mypage", {
      body: "users",
      user,
      userGenre,
      Reply,
      Result,
    });
  } catch (err) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('회원정보가 없습니다')</script>");
    return res.write("<script>location.href='/main'</script>");
  }
});

router.post("/:userId", async (req, res) => {
  const userId = req.body;
  console.log(userId);
  try {
    console.log(Result);
    return res.json(Result);
  } catch (err) {
    res.render(err);
  }
});

export default router;
