import express from "express";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import DB from "../models/index.js";
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

  const query = `SELECT concert_artist.concert_code, concert_info.concert_name, concert_info.concert_poster, concert_info.start_date, concert_info.end_date, concert_info.concert_ticketing, artist.artist_name 
  FROM concert_artist
  INNER JOIN artist 
  ON concert_artist.artist_code = artist.artist_code
  INNER JOIN concert_info 
  ON concert_info.concert_code = concert_artist.concert_code;`;

  // const conData = await ConArt.findAll({
  //   attributes: ["concert_code"],
  //   include: [
  //     { model: Artist, attributes: ["artist_name"] },
  //     {
  //       model: Concert,
  //       attributes: [
  //         "concert_name",
  //         "concert_poster",
  //         "start_date",
  //         "end_date",
  //       ],
  //     },
  //   ],
  // });

  const conData = await DB.sequelize.query(query, { type: QueryTypes.SELECT });
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
