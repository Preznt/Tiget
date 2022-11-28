/* 공공데이터 한국문화정보원_공연전시정보조회서비스 */
/* 2 지역별공연/전시목록조회 */

import express from "express";
import request from "request";
/* npm install -save fast-xml-parser */
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
const parser = new XMLParser();

const router = express.Router();

const url =
  "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/area";
const serviceKey = "서비스키";

let queryParams = `?${encodeURIComponent("serviceKey")}=${serviceKey}`;
// queryParams += `&${encodeURIComponent("ComMsgHeader")}=${encodeURIComponent("")}`;
// queryParams += `&${encodeURIComponent("MsgBody")}=${encodeURIComponent("")}`;
queryParams += `&${encodeURIComponent("sido")}=${encodeURIComponent("광주")}`;
queryParams += `&${encodeURIComponent("gugun")}=${encodeURIComponent("동구")}`;
queryParams += `&${encodeURIComponent("from")}=${encodeURIComponent(
  "20220101"
)}`;
queryParams += `&${encodeURIComponent("to")}=${encodeURIComponent("20221231")}`;
queryParams += `&${encodeURIComponent("place")}=${encodeURIComponent(
  "국립아시아문화전당"
)}`;
// queryParams += `&${encodeURIComponent("gpsxfrom")}=${encodeURIComponent("129.1013129")}`;
// queryParams += `&${encodeURIComponent("gpsyfrom")}=${encodeURIComponent("35.1416412")}`;
// queryParams += `&${encodeURIComponent("gpsxto")}=${encodeURIComponent("129.1013129")}`;
// queryParams += `&${encodeURIComponent("gpsyto")}=${encodeURIComponent("35.1416412")}`;
queryParams += `&${encodeURIComponent("cPage")}=${encodeURIComponent("1")}`;
queryParams += `&${encodeURIComponent("rows")}=${encodeURIComponent("100")}`;
// queryParams += `&${encodeURIComponent("keyword")}=${encodeURIComponent("")}`;
queryParams += `&${encodeURIComponent("sortStdr")}=${encodeURIComponent("1")}`;
// sortStdr 정렬기준 1:등록일, 2:공연명, 3:지역

const option = {
  url: url + queryParams,
  method: "GET",
};

request.get(option, async (error, response, body) => {
  //console.log('Status', response.statusCode);
  //console.log('Headers', JSON.stringify(response.headers));
  //console.log("Reponse received", body);
  let data = await parser.parse(body);
  data = data["response"]["msgBody"]["perforList"];
  console.log(data);
});

export default router;
