/* 공연예술통합전산망 상세조회 */

import express from "express";
/* npm install --save request */
import request from "request";
/* npm install -save fast-xml-parser */
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
const parser = new XMLParser();

const router = express.Router();

const url = "http://www.kopis.or.kr/openApi/restful/pblprfr";
const serviceKey = "서비스키";

let queryParams = `/${encodeURIComponent("PF132236")}`;
queryParams += `?${encodeURIComponent("service")}=${serviceKey}`;
const option = {
  url: url + queryParams,
  method: "GET",
};

/*
- OPEN API 서비스 이용 시, KOPIS에 의거하여 개발된 프로그램 또는 서비스라는 점을 반드시 명시하여야 합니다.
* 예시) 출처: (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)
※ 출처가 명시되지 않을 경우, 서비스가 중단될 수 있음을 사전 알려드립니다.

공연예술통합전산망이 제공하는 API를 활용하여 서비스를 개발할 경우, 반드시 아래 사항을 함께 명시합니다.
· 집계기간 : 최종집계 YYYY.MM.DD
· 집계대상 : 모든 공연 데이터 전송기관
· 아래 집계 데이터는 공연예술통합전산망 연계기관의 티켓판매시스템에서 발권된 분량을 기준으로 제공함으로 해당 공연의 전체 관객 수와 차이가 있을 수 있습니다
· Api 인증키는 신청 직후 기재된 이메일 주소로 발급됩니다.
  인증키 사용 유효기간은 발급일로부터 1년으로 자동 설정되어 있으며, 3개월 이상 미사용시 사용 승인이 취소됩니다.
  유효기간 만료 또는 승인 취소 관련 안내는 kopis@gokams.or.kr 메일로 발송되며, 유효기간 연장 희망시 해당 메일로 신청해 주시기 바랍니다.
*/

request(option, async (error, response, body) => {
  //console.log('Status', response.statusCode);
  //console.log('Headers', JSON.stringify(response.headers));
  //console.log("Reponse received", body);
  let data = await parser.parse(body);
  data = await data.dbs.db;
  console.log(data);
});

export default router;
