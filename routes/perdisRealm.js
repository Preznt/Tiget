/* 공공데이터 한국문화정보원_공연전시정보조회서비스 */
/* 3 분야별공연/전시목록조회 */

import express from "express";
import request from "request";
/* npm install -save fast-xml-parser */
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
const parser = new XMLParser();

const router = express.Router();

const url =
  "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/realm";
const serviceKey = "서비스키";

/*
realmCode 분류코드
A000 연극 / B000 음악(콘서트, 뮤지컬 등) / C000 무용 / D000 미술 / E000 건축
G000 영상 / H000 문학 / I000 문화정책 / J000 축제문화공간 / L000 기타
*/
const realmCode = {
  연극: "A000",
  음악: "B000",
  무용: "C000",
  미술: "D000",
  건축: "E000",
  영상: "G000",
  문학: "H000",
  문화정책: "I000",
  축제문화공간: "J000",
  기타: "L000",
};

let queryParams = `?${encodeURIComponent("serviceKey")}=${serviceKey}`;
// queryParams += `&${encodeURIComponent("ComMsgHeader")}=${encodeURIComponent("")}`;
// queryParams += `&${encodeURIComponent("MsgBody")}=${encodeURIComponent("")}`;
queryParams += `&${encodeURIComponent("realmCode")}=${encodeURIComponent(
  realmCode.기타
)}`;
queryParams += `&${encodeURIComponent("cPage")}=${encodeURIComponent("1")}`;
queryParams += `&${encodeURIComponent("rows")}=${encodeURIComponent("100")}`;
queryParams += `&${encodeURIComponent("from")}=${encodeURIComponent(
  "20220101"
)}`;
queryParams += `&${encodeURIComponent("to")}=${encodeURIComponent("20221231")}`;
queryParams += `&${encodeURIComponent("sido")}=${encodeURIComponent("서울")}`;
// queryParams += `&${encodeURIComponent("gugun")}=${encodeURIComponent("동구")}`;
// queryParams += `&${encodeURIComponent("place")}=${encodeURIComponent("국립아시아문화전당")}`;
// queryParams += `&${encodeURIComponent("gpsxfrom")}=${encodeURIComponent("129.1013129")}`;
// queryParams += `&${encodeURIComponent("gpsyfrom")}=${encodeURIComponent("35.1416412")}`;
// queryParams += `&${encodeURIComponent("gpsxto")}=${encodeURIComponent("129.1013129")}`;
// queryParams += `&${encodeURIComponent("gpsyto")}=${encodeURIComponent("35.1416412")}`;
// queryParams += `&${encodeURIComponent("keyword")}=${encodeURIComponent("")}`;
queryParams += `&${encodeURIComponent("sortStdr")}=${encodeURIComponent("1")}`;
// sortStdr 정렬기준 1:등록일, 2:공연명, 3:지역

const option = {
  url: url + queryParams,
  method: "GET",
};

request(option, async (error, response, body) => {
  //console.log('Status', response.statusCode);
  //console.log('Headers', JSON.stringify(response.headers));
  //console.log("Reponse received", body);
  let data = await parser.parse(body);
  data = data["response"]["msgBody"]["perforList"];
  console.log(data);
});

export default router;
