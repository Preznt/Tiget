import express from "express";
import DB from "../models/index.js";
import moment from "moment";
const Users = DB.models.user;
const IntCon = DB.models.concert_of_interest;
const IntArt = DB.models.artist_of_interest;
const IntGen = DB.models.genre_of_interest;
const dateFormat = "YYYY.MM.DD";

const router = express.Router();
router.get("/", (req, res) => {
  res.render("mypage");
});

router.post("/check/:username", async (req, res) => {
  const username = req.params?.username;
  const val = req.body.val_password;
  try {
    let data = await Users.findAll({
      attributes: ["password"],
      where: { username: username },
    });
    data = JSON.parse(JSON.stringify(data))[0].password;

    if (val !== data) {
      console.log("비밀번호 일치하지 않음");
      return res.send("비밀번호가 일치하지 않습니다.");
    } else {
      console.log("비밀번호 일치");
      return res.redirect(`/mypage/delete/${username}`);
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
    return res.send("그동안 Tiget을 이용해주셔서 감사합니다.");
  } catch (err) {
    console.error(err);
    return res.send("예기치 않은 문제가 생겼습니다. 다시 시도해주세요.");
  }
});
export default router;
