import express from "express";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import DB from "../models/index.js";
const Concert = DB.models.concert_info;
const Artist = DB.models.artist;
const ArtGen = DB.models.artist_genre;
const ConArt = DB.models.concert_artist_model;
const GenCon = DB.models.genre_concert_model;
const Genre = DB.models.genre;

const router = express.Router();

/**
 * cf)
 * sequelize.query 를 통해 rawQuery 를 반복 사용할 경우
 * request가 2번 발생하는 현상... parameter 값이 정상데이터 -> undefined
 *
 * sequelize 고유메서드를 사용할 경우
 * 데이터가 배열, 객체 리터럴 반복적으로 중첩
 * 따라서 객체 안 컬럼명: [요소1, 요소2 ...] 로 변환
 */
const conRemoveNested = (data, group, subgroup, column) => {
  // data의 깊은 복사 필요
  // 초기 데이터는 배열
  let lists = JSON.parse(JSON.stringify(data))[0];
  let array = [];
  // 객체 선택 후 여기서부터 다시 배열이므로 map()
  lists[group].map((obj) => {
    // 다시 객체 선택
    array.push(obj[subgroup][column]);
  });

  delete lists[group];
  lists[column] = array;

  return lists;
};

// sequelize.query 를 사용했을 때...
// 콘서트와 아티스트의 장르를 배열로 통합하는 함수
const artRemoveNested = (array, column, group) => {
  let result = [];
  let lastgroupValue = "";

  array.map((ele) => {
    const groupValue = ele[group];
    let data = [];
    if (groupValue !== lastgroupValue) {
      data = array.filter((data) => {
        if (data[group] === groupValue) return data;
      });

      let arr = [];
      if (data.length > 1) {
        for (let i of data) {
          if (!arr.includes(i[column])) {
            arr = arr.concat(i[column]);
          }
        }
        data[0][column] = arr;
      }
      data = data[0];
      lastgroupValue = groupValue;
      result.push(data);
    }
  });
  return result;
};

router.get("/:conCode", async (req, res) => {
  try {
    const code = req.params.conCode;

    // 조회수 증가
    const updateViews = await Concert.increment(["concert_views"], {
      by: 1,
      where: { concert_code: code },
    });

    // 콘서트 데이터
    let conResult = await Concert.findAll({
      where: { concert_code: code },
      attributes: [
        "concert_type",
        "concert_views",
        "concert_poster",
        "concert_name",
        "concert_loc",
        "concert_ticketing",
        "concert_place",
        "start_date",
        "end_date",
      ],
      include: [
        {
          model: GenCon,
          include: [{ model: Genre, attributes: ["genre_name"] }],
        },
      ],
    });
    const conInfo = conRemoveNested(
      conResult,
      "genre_concerts",
      "genre",
      "genre_name"
    );

    // 너무 징그러운데...
    // let artQuery = await Concert.findAll({
    //   where: { concert_code: code },
    //   include: [
    //     {
    //       model: ConArt,
    //       include: [
    //         {
    //           model: Artist,
    //           attributes: [
    //             "artist_name",
    //             "artist_type",
    //             "artist_img",
    //             "artist_debut",
    //           ],
    //           include: [
    //             {
    //               model: ArtGen,
    //               include: [{ model: Genre, attributes: ["genre_name"] }],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });
    // [0]["concert_artists"][0]["artist"]["artist_genres"]["genre"]["genre_name"]

    // 아티스트 데이터
    const artQuery = `
    SELECT Art.artist_code, Art.artist_name, Art.artist_type,
    Art.artist_img, Art.artist_debut,
    Gen.genre_name
    FROM concert_info Con
      INNER JOIN concert_artist ConArt
        ON Con.concert_code = ConArt.concert_code
      INNER JOIN artist Art
        ON ConArt.artist_code = Art.artist_code
      INNER JOIN artist_genre ArtGen
        ON Art.artist_code = ArtGen.artist_code
      INNER JOIN genre Gen
        ON ArtGen.genre_code = Gen.genre_code
    WHERE Con.concert_code = ${code}
    `;

    let artResult = await DB.sequelize.query(artQuery, {
      type: QueryTypes.SELECT,
    });

    // 아티스트 장르를 배열로 변환 후 통합
    const artInfo = artRemoveNested(artResult, "genre_name", "artist_code");

    return res.render("detail", { conInfo, artInfo });
  } catch (err) {
    console.error(err);
    return res.send("서버가 죽엇슴다--;;");
  }
});

export default router;
