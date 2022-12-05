import express from "express";
import DB from "../models/index.js";
import moment from "moment";
import session from "express-session";

const Users = DB.models.user;
const IntCon = DB.models.concert_of_interest;
const IntArt = DB.models.artist_of_interest;
const IntGen = DB.models.genre_of_interest;
const dateFormat = "YYYY.MM.DD";

const router = express.Router();

const chkSession = (req, res, next) => {
  if (!req.session.user) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('로그인이 필요한 페이지입니다.')</script>");
    return res.write("<script>location.href='/main'</script>");
  } else {
    next();
  }
};

router.get("/", chkSession, (req, res) => {
  res.render("mypage");
});

router.get("/delete", (req, res) => {
  res.render("/includes/mypage_withdrawal");
});

router.post("/delete/check", async (req, res) => {
  const username = req?.body.username;
  const val = req?.body.val_password;
  try {
    let data = await Users.findAll({
      attributes: ["password"],
      where: { username: username },
    });
    data = JSON.parse(JSON.stringify(data))[0].password;
    if (data === "") {
      return res.send({ msg: "null" });
    }
    if (val !== data) {
      return res.send({ msg: "false" });
    } else {
      return res.send({ msg: "true" });
    }
  } catch (err) {
    console.error(err);
    return res.send("예기치 않은 문제가 생겼습니다. 다시 시도해주세요.");
  }
});

router.get("/delete/:username", async (req, res) => {
  const username = req.params.username;
  const date = moment().format(dateFormat);
  try {
    const delUser = await Users.update(
      {
        password: "",
        profile_image: null,
        birthdate: null,
        level: null,
        delete_date: date,
      },
      { where: { username: username } }
    );
    const delIntCon = await IntCon.destroy({ where: { username: username } });
    const delIntArt = await IntArt.destroy({ where: { username: username } });
    const delIntGen = await IntGen.destroy({ where: { username: username } });
    console.log(delUser);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('성공적으로 탈퇴되었습니다.')</script>");
    return res.write("<script>location.href='/users/logout'</script>");
  } catch (err) {
    console.error(err);
    return res.send("예기치 않은 문제가 생겼습니다. 다시 시도해주세요.");
  }
});
export default router;
