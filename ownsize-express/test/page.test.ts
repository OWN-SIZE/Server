import req from "supertest";
import app from "../src/index";
import "@types/mocha";

describe("GET /myPage/check", () => {
  it("마이페이지 조회", (done) => {
    req(app)
      .get("/myPage") // api 요청
      .set("Content-Type", "application/json")
      .set("Authorization", process.env.JWT_TEST_TOKEN) // header 설정
      .expect(200) // 예측 상태 코드
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
});
