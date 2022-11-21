/*  open api 에서 가져온 데이터를 tbl_holiday 테이블로 업데이트 */

import request from "request";
/* npm install --save request */
import scheduler from "node-schedule";
/* npm install --save node-schedule */
import DB from "../models/index.js";
const Holi = DB.models.tbl_holiday;

import express from "express";

const router = express.Router();

// router.get("/", function (req, res) {
const url =
  "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo";

const servicekey =
  "9sO%2BZVBC9mjTRJen1l4kyCib4qEKBjsmKRIWkI2U%2FCdv16CRM60dzGlagqOTQIwK0W1kpY4tG4Silvvhlf7H%2Fg%3D%3D";

let currentYear = new Date().getFullYear();

let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + servicekey;
queryParams +=
  "&" +
  encodeURIComponent("solYear") +
  "=" +
  encodeURIComponent(`${currentYear}`);
//queryParams +=
//  "&" + encodeURIComponent("solMonth") + "=" + encodeURIComponent("12");
queryParams +=
  "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100");
queryParams +=
  "&" + encodeURIComponent("_type") + "=" + encodeURIComponent("json");

const option = {
  url: url + queryParams,
  method: "GET",
};

// cron 표현식, 초 분 시 일 월 년
const schedule = scheduler.scheduleJob("0 0 0 * * *", () => {
  request(option, function (error, response, body) {
    // console.log("Status", response.statusCode);
    // console.log("Headers", JSON.stringify(response.headers));
    // console.log("Reponse received", body);
    if (error) {
      console.error(error);
    }

    let data = JSON.parse(body);

    for (let i in data["response"]["body"]["items"]["item"]) {
      let dateName = data["response"]["body"]["items"]["item"][i]["dateName"];
      let isHoliday = data["response"]["body"]["items"]["item"][i]["isHoliday"];
      let locdate = data["response"]["body"]["items"]["item"][i]["locdate"];
      let seq = data["response"]["body"]["items"]["item"][i]["seq"];
      let dataArr = {
        h_dateName: dateName,
        h_isHoliday: isHoliday,
        h_locdate: locdate,
        h_seq: seq,
      };
      console.log(dataArr);
      Holi.create(dataArr);
    }
  });
});

export default router;
