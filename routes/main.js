import express from "express";
import DB from "../models/index.js";
// 비교 연산자 사용
import { Op } from "sequelize";
const User = DB.models.user;
const InterCon = DB.models.concert_of_interest;
const Concert = DB.models.concert_info;
const Holiday = DB.models.holiday;
const Genre = DB.models.genre;

const router = express.Router();

router.get("/", async (req, res, next) => {
  const holiData = await Holiday.findAll();
  const locData = [
    { eng: "seoul", kor: "서울" },
    { eng: "busan", kor: "부산" },
    { eng: "incheon", kor: "인천" },
    { eng: "daegu", kor: "대구" },
    { eng: "daejeon", kor: "대전" },
    { eng: "gwangju", kor: "광주" },
    { eng: "ulsan", kor: "울산" },
    { eng: "sejong", kor: "세종" },
    { eng: "gyeonggi", kor: "경기" },
    { eng: "gangwon", kor: "강원" },
    { eng: "chungbuk", kor: "충북" },
    { eng: "chungnam", kor: "충남" },
    { eng: "jeonbuk", kor: "전북" },
    { eng: "jeonnam", kor: "전남" },
    { eng: "gyeongbuk", kor: "경북" },
    { eng: "gyeongnam", kor: "경남" },
    { eng: "jeju", kor: "제주" },
  ];

  // calendar 스케줄 표시
  const conData = await Concert.findAll({
    attributes: ["concert_code", "concert_name", "start_date", "end_date"],
  });

  const genreData = await Genre.findAll();

  const concerts = await Concert.findAll({
    where: { concert_type: "국내" },
    order: [["concert_views", "DESC"]],
  });

  const recommends = await Concert.findAll({
    where: { concert_type: "국내" },
    order: [["concert_views", "ASC"]],
  });

  return res.render("main", {
    body: "ranking",
    holiData,
    locData,
    genreData,
    boards: "",
    conData,
    concerts,
    recommends,
  });
});

// 찜 목록 fetch 메서드
router.get("/favorites", async (req, res) => {
  try {
    let interConList;
    try {
      const user = req?.session?.user?.username;
      interConList = await Concert.findAll({
        raw: true,
        attributes: ["concert_code", "concert_name", "start_date", "end_date"],
        include: { model: InterCon, where: { username: user } },
      });
    } catch (err) {
      interConList = null;
    }
    return res.send({ interConList });
  } catch (err) {
    console.error(err);
    return res.send("USER INTEREST DATA SQL SELECT ERROR");
  }
});

// calendar modal fetch 메서드
router.post("/info", async (req, res) => {
  try {
    const code = req.body.code;
    const conInfo = await Concert.findAll({
      where: { concert_code: code },
      attributes: [
        "concert_name",
        "concert_poster",
        "start_date",
        "end_date",
        "concert_place",
        "concert_ticketing",
      ],
    });
    let interCon;

    try {
      const user = req?.session?.user?.username;
      const findInterCon = await InterCon.findAll({
        where: { [Op.and]: [{ username: user }, { concert_code: code }] },
      });
      if (findInterCon == false) {
        interCon = false;
      } else {
        interCon = true;
      }
    } catch (err) {
      interCon = null;
    }
    return res.send({ conInfo, interCon });
  } catch (err) {
    console.error(err);
    return res.send("MODAL DATA SQL SELECT ERROR");
  }
});

// bookmark fetch 메서드
router.post("/bookmark", async (req, res) => {
  try {
    const code = req.body.thisCode;
    const value = req.body.value;
    const user = req?.session?.user?.username;

    if (user === undefined) {
      return res.send("failed");
    }
    if (value === true) {
      const addInterCon = await InterCon.create({
        username: user,
        concert_code: code,
      });
      return res.send("insert");
    }
    if (value === false) {
      const delInterCon = await InterCon.destroy({
        where: { [Op.and]: [{ username: user }, { concert_code: code }] },
      });
      return res.send("delete");
    }
  } catch (err) {
    console.error(err);
    return res.send("BOOKMARK DATA SQL SELECT ERROR");
  }
});

export default router;
