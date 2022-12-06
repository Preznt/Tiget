import express from "express";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import DB from "../models/index.js";
const Holiday = DB.models.holiday;
const Concert = DB.models.concert_info;
const Artist = DB.models.artist;
const ConArt = DB.models.concert_artist_model;

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
  const genreData = [
    { id: "pop", name: "Pop" },
    { id: "rock", name: "Rock" },
    { id: "electronic", name: "Electronic" },
    { id: "hiphop", name: "Hip-Hop" },
    { id: "rnb", name: "R&B" },
    { id: "jazz", name: "Jazz" },
    { id: "classic", name: "Classic" },
  ];

  const query = `SELECT concert_code, concert_name, start_date, end_date FROM concert_info`;

  // const query = `SELECT artist.artist_name, concert_artist.concert_code, concert_info.concert_name, concert_info.start_date, concert_info.end_date
  // FROM concert_artist
  // LEFT JOIN artist
  // ON concert_artist.artist_code = artist.artist_code
  // LEFT JOIN concert_info
  // ON concert_info.concert_code = concert_artist.concert_code;`;
  const conData = await DB.sequelize.query(query, { type: QueryTypes.SELECT });

  return res.render("main", {
    body: "ranking",
    holiData,
    locData,
    genreData,
    boards: "",
    conData,
  });
});

export default router;
