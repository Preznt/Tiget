/* 공공데이터 한국문화정보원_공연전시정보조회서비스 */
/* 4 공연/전시상세정보조회 */

import express from "express";
import request from "request";
/* npm install -save fast-xml-parser */
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
const parser = new XMLParser();

const router = express.Router();

const url = `http://www.culture.go.kr/openapi/rest/publicperformancedisplays/d/`;
const serviceKey = "서비스키";
const seq = "225851";

let queryParams = `?${encodeURIComponent("serviceKey")}=${serviceKey}`;
// queryParams += `&${encodeURIComponent("ComMsgHeader")}=${encodeURIComponent("")}`;
// queryParams += `&${encodeURIComponent("MsgBody")}=${encodeURIComponent("")}`;
queryParams += `&${encodeURIComponent("seq")}=${encodeURIComponent(seq)}`;

const option = {
  url: url + queryParams,
  method: "GET",
};

request(option, async (error, response, body) => {
  //console.log('Status', response.statusCode);
  //console.log('Headers', JSON.stringify(response.headers));
  //console.log("Reponse received", body);
  let data = await parser.parse(body);
  data = data["response"]["msgBody"]["perforInfo"];
  console.log(data);
});

export default router;
