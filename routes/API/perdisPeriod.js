/* 공공데이터 한국문화정보원_공연전시정보조회서비스 */
/* 1 기간별공연/전시목록조회 */

import express from "express";
import request from "request";
import Period from "../models/tbl_perdisPeriod.js";
/* npm install -save fast-xml-parser */
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
const parser = new XMLParser();

const router = express.Router();

const url =
  "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/period";
const serviceKey = "서비스키";

/**
 * cf)
 * Open API 의 요청 필수 항목명
 * 1. 서비스키
 * 2. 페이지 번호(데이터가 많을 때 사용됨)
 * 3. 페이지당 row 수
 * 4. 그 외 필수적으로 필요한 항목
 *
 * 이외 항목들은 처음부터 요청하지 말고 나중에 차례로 추가해볼 것
 * 요청 값이 그대로 되돌아올 경우, 응답 데이터가 없다는 의미
 */

let queryParams = `?${encodeURIComponent("serviceKey")}=${serviceKey}`;
// queryParams += `&${encodeURIComponent("ComMsgHeader")}=${encodeURIComponent("")}`;
// queryParams += `&${encodeURIComponent("MsgBody")}=${encodeURIComponent("")}`;
queryParams += `&${encodeURIComponent("from")}=${encodeURIComponent(
  "20220101"
)}`;
queryParams += `&${encodeURIComponent("to")}=${encodeURIComponent("20221231")}`;
queryParams += `&${encodeURIComponent("cPage")}=${encodeURIComponent("1")}`;
queryParams += `&${encodeURIComponent("rows")}=${encodeURIComponent("100")}`;
queryParams += `&${encodeURIComponent("place")}=${encodeURIComponent(
  "국립아시아문화전당"
)}`;
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
