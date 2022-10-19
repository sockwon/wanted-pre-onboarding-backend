const request = require("supertest");
const { createApp } = require("../app");
const { database } = require("../models/database");
const companyDao = require("../models/companyDao");
const notificationDao = require("../models/notificationDao");

describe("채용공고 테스트입니다", () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await database.initialize();
    const exampleCompany = {
      companyName: "아이오트러스트",
    };
    const exampleNoti1 = {
      companyId: 1,
      position: "백엔드",
      reward: 2000000,
      stack: "node,git,docker",
      region: "서울",
      nation: "한국",
      description: "AWS 계정 지원.",
    };
    const exampleNoti2 = {
      companyId: 1,
      position: "프론트엔드",
      reward: 100,
      stack: "react,vue",
      region: "부산",
      nation: "한국",
      description: "기숙사 지원.",
    };
    await companyDao.companyPost(exampleCompany.companyName);
    await notificationDao.notificationPost(exampleNoti1);
    await notificationDao.notificationPost(exampleNoti2);
  });
  afterAll(async () => {
    await database.query(`SET foreign_key_checks = 0`);
    await database.query(`TRUNCATE company`);
    await database.query(`TRUNCATE notification`);
    await database.query(`SET foreign_key_checks = 1`);
    await database.destroy();
  });

  test("채용공고 등록 테스트: 성공", async () => {
    await request(app)
      .post("/notification/create")
      .send({
        companyId: 1,
        position: "백엔드",
        reward: 1000000,
        stack: "java,git,spring",
        region: "화천",
        nation: "한국",
        description: "물 맑고 경치좋은 화천에서 느긋하게 일하세요.",
      })
      .expect(201)
      .expect({ message: "success" });
  });

  test("채용공고 등록 테스트: 실패, key_error: companyId 칼럼 값이 빠졌음", async () => {
    await request(app)
      .post("/notification/create")
      .send({
        position: "백엔드",
        reward: 1000000,
        stack: "java,git,spring",
        region: "화천",
        nation: "한국",
        description: "물 맑고 경치좋은 화천에서 느긋하게 일하세요.",
      })
      .expect(400)
      .expect({ message: "invalid_key" });
  });

  test("채용공고 수정 테스트: 성공", async () => {
    await request(app)
      .patch("/notification/1")
      .send({ reward: 500, description: "내용 바꿈" })
      .expect(201)
      .expect({ message: "success" });
  });

  test("채용공고 수정 테스트: 실패, 실제로는 없는 공고물", async () => {
    await request(app)
      .patch("/notification/100")
      .send({ reward: 500, description: "내용 바꿈" })
      .expect(400)
      .expect({ message: "this_id_does_not_exist" });
  });

  test("채용공고 목록 가져오기: 성공", async () => {
    await request(app)
      .get("/notification/list")
      .expect(200)
      .expect([
        {
          채용공고_ID: 1,
          채용포지션: "백엔드",
          채용보상금: 500,
          사용기술: "node,git,docker",
          지역: "서울",
          국가: "한국",
          채용내용: "내용 바꿈",
        },
        {
          채용공고_ID: 2,
          채용포지션: "프론트엔드",
          채용보상금: 100,
          사용기술: "react,vue",
          지역: "부산",
          국가: "한국",
          채용내용: "기숙사 지원.",
        },
        {
          채용공고_ID: 3,
          채용포지션: "백엔드",
          채용보상금: 1000000,
          사용기술: "java,git,spring",
          지역: "화천",
          국가: "한국",
          채용내용: "물 맑고 경치좋은 화천에서 느긋하게 일하세요.",
        },
      ]);
  });

  test("채용공고 검색: 성공", async () => {
    await request(app)
      .get("/notification/search")
      .send({
        search: "서울",
      })
      .expect(200)
      .expect([
        {
          채용공고_ID: 1,
          회사명: "아이오트러스트",
          채용포지션: "백엔드",
          채용보상금: 500,
          사용기술: "node,git,docker",
          지역: "서울",
          국가: "한국",
          채용내용: "내용 바꿈",
        },
      ]);
  });

  test("채용공고 검색: 실패, key_error: 검색어가 없음", async () => {
    await request(app)
      .get("/notification/search")
      .send({
        search: "",
      })
      .expect(400)
      .expect({ message: "invalid_key" });
  });

  test("채용공고 상세페이지 가져오기: 성공", async () => {
    await request(app)
      .get("/notification/page/1")
      .expect(200)
      .expect([
        {
          채용공고_ID: 1,
          회사명: "아이오트러스트",
          채용포지션: "백엔드",
          채용보상금: 500,
          사용기술: "node,git,docker",
          지역: "서울",
          국가: "한국",
          채용내용: "내용 바꿈",
          회사가올린다른채용공고_id: [1, 2, 3],
        },
      ]);
  });

  test("채용공고 상세페이지 가져오기: 실패, 없는 채용공고", async () => {
    await request(app)
      .get("/notification/page/999")
      .expect(400)
      .expect({ message: "this_id_does_not_exist" });
  });

  test("채용공고 상세페이지 가져오기: 실패, 엉뚱한 입력값", async () => {
    await request(app)
      .get("/notification/page/abcd")
      .expect(400)
      .expect({ message: "this_id_does_not_exist" });
  });

  test("채용공고 상세페이지 가져오기: 실패, id 입력값 없음", async () => {
    await request(app).get("/notification/page").expect(404);
  });
});
