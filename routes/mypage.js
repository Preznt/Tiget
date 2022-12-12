import express from "express";
import DB from "../models/index.js";
import Sequelize from "sequelize";
import sequelize from "sequelize";
// 비교 연산자 사용
import { Op } from "sequelize";
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

router.get("/", chkSession, async (req, res) => {
  return res.redirect("/profile");
});

router.get("/delete", chkSession, (req, res) => {
  const user = req.session.user.username;
  return res.render("mypage", { body: "withdrawal", user });
});

router.post("/delete/check", chkSession, async (req, res) => {
  const user = req.session.user.username;
  console.log(user);
  const val = req?.body.val_password;
  try {
    let data = await Users.findAll({
      attributes: ["password"],
      where: { username: user },
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

router.get("/delete/:username", chkSession, async (req, res) => {
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
    res.write("<script>location.href='/users/logout'</script>");
    return res.end();
  } catch (err) {
    console.error(err);
    return res.send("예기치 않은 문제가 생겼습니다. 다시 시도해주세요.");
  }
});
router.get("/pwChange", chkSession, async (req, res) => {
  const user = req.session.user.username;
  try {
    const result = await Users.findByPk(user);
    res.render("mypage", {
      body: "change_password",
      user: result,
      username: user,
    });
  } catch (err) {
    res.json(err);
    console.error(err);
  }
});

router.get("/pwChange/:nowPw", async (req, res) => {
  const pw = req.params.nowPw;
  const user = req.session.user.username;
  try {
    const userPw = await Users.findAll({
      where: {
        username: user,
        password: pw,
      },
    });
    console.log(userPw);
    if (userPw == "") {
      res.json({ status: null });
      return false;
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/pwChange", chkSession, async (req, res) => {
  const user = req.session.user.username;
  const { nowPw, newPw } = req.body;
  console.log(user);
  try {
    const pwChk = await Users.findOne({ where: { password: nowPw } });
    if (pwChk == null) {
      res.redirect("/mypage/pwChange");
      return false;
    }
  } catch (err) {
    console.error(err);
    res.json(err);
  }
  try {
    await Users.update(
      { password: newPw },
      {
        where: { username: user },
      }
    );
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('비밀번호가 변경되었습니다')</script>");
    res.write("<script>location.href='/mypage'</script>");
  } catch (err) {
    console.error(err);
  }
});

router.get("/bookmark", chkSession, async (req, res) => {
  try {
    const user = req.session.user.username;
    const nickname = req.session.user.nickname;
    const today = moment().format(findDateFormat);
    /**
     * cf)
     * table join 시(include) 일치하지 않는 값은 null로 표시됨
     * 따라서 null를 제외하도록 조건으로 직접 지정
     */
    // 선호 장르에 맞는 공연 추천
    // ** 이미 찜한 공연은 보여주지 않으려면 어떤 조건을 추가해야 하는지?
    const recommendConList = await Concert.findAll({
      raw: true,
      where: { start_date: { [Op.gte]: today } },
      subQuery: false,
      order: [Sequelize.fn("RAND")],
      include: {
        model: GenCon,
        as: "fk_concert",
        where: { concert_code: { [Op.not]: null } },
        include: {
          model: Genre,
          attributes: ["genre_name"],
          where: { genre_name: { [Op.not]: null } },
          include: {
            model: InterGen,
            where: { username: user },
          },
        },
      },
      limit: 6,
    });

    // 선호 장르에 맞는 아티스트 추천
    // 중복되는 아티스트는 포함시키지 말 것
    const recommendArtList = await Artist.findAll({
      raw: true,
      order: [Sequelize.fn("RAND")],
      subQuery: false,
      include: {
        model: ArtGen,
        where: { artist_code: { [Op.not]: null } },
        include: {
          model: Genre,
          attributes: ["genre_name"],
          where: { genre_name: { [Op.not]: null } },
          include: {
            model: InterGen,
            where: { username: user },
          },
        },
      },
      limit: 4,
    });

    // 선호 장르 > 선호 아티스트(또는 아티스트 찜) > 추천 공연으로 넘어가야 할 것 같다

    // // 선호 아티스트 목록
    // const artList = await Artist.findAll({
    //   attributes: ["artist_code", "artist_name"],
    //   include: { model: IntArt, where: { username: user } },
    // });

    // // 선호 아티스트에 따른 공연 목록
    // const artConList = await Concert.findAll({
    //   attributes: ["concert_code", "concert_name"],
    //   include: {
    //     model: Artist,
    //     include: {
    //       model: ArtCon,
    //       where: { username: user },
    //     },
    //   },
    // });

    return res.render("mypage", {
      body: "bookmark",
      recommendConList,
      recommendArtList,
      nickname,
    });
  } catch (err) {
    console.error(err);
    return res.send("USER RECOMMEND DATA SQL SELECT ERROR");
  }
});

// 북마크 콘서트 목록 fetch
router.get("/bookmarklist", async (req, res) => {
  try {
    let conList;

    try {
      const user = req.session.user.username;
      const today = moment().format(findDateFormat);
      const dday = sequelize.fn("datediff", today, sequelize.col("start_date"));
      conList = await Concert.findAll({
        raw: true,
        order: [
          ["start_date", "ASC"],
          ["concert_name", "ASC"],
        ],
        attributes: [
          "concert_code",
          "concert_name",
          "concert_poster",
          "start_date",
          "end_date",
          "concert_place",
          "concert_ticketing",
          [dday, "dday"],
        ],
        include: { model: InterCon, where: { username: user } },
      });
    } catch (err) {
      conList = null;
    }

    return res.send({ conList });
  } catch (err) {
    console.error(err);
    return res.send("BOOKMARK LIST DATA SELECT ERROR");
  }
});

router.get("/favoriteGenre", (req, res) => {
  res.redirect("/favoriteGenre");
});
export default router;
