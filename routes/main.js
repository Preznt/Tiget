import express from "express";
import DB from "../models/index.js";
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

  const conData = await Concert.findAll({
    attributes: [
      "concert_code",
      "concert_name",
      "concert_poster",
      "start_date",
      "end_date",
      "concert_ticketing",
    ],
  });
  const genreData = await Genre.findAll();

  return res.render("main", {
    body: "ranking",
    holiData,
    locData,
    genreData,
    boards: "",
    conData,
    calendar: "schedule",
  });
});

export default router;
