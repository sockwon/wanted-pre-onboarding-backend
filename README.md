# wanted_pre_onBoarding
> 개발기간 : 2022.10.17 - 2022.10.19

> 참여자 : 본인

## 목차
- [기술스택](#기술스택)
- [과제분석](#과제분석)
- [ERD](#erd)
- [API](#api)
- [unit test 결과](#unit_test_결과)
- [사용](#사용)

---

### 기술스택
- nodeJs
- mysql
- typeORM
- Jest
- express
- postman
---
### 과제분석

**요구사항 분석** 
 1. 채용공고 등록
   - METHOD: post
   - entity: Notification, Company
   - 예외처리: 칼럼 값이 없거나 일부가 빠졌을 때
   - 주의사항: 없음
   - 데이터:
   ``` 
   {
  "회사_id":회사_id,
  "채용포지션":"백엔드 주니어 개발자",
  "채용보상금":1000000,
  "채용내용":"원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
  "사용기술":"Python"
    }
  ```
 2. 채용공고 수정
   - METHOD: patch
   - entity: Notification
   - 예외처리: 수정하고자 하는 공고물이 없음, 칼럼 값이 없거나 일부가 누락됨
   - 주의사항: 채용공고의 id 는 수정될 수 없다.
   - 데이터:
   ```
   {
  "채용포지션":"백엔드 주니어 개발자",
  "채용보상금":1000000,
  "채용내용":"원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
  "사용기술":"Django" # 변경됨
    }
   ```
 3. 채용공고 삭제
   - METHOD: delete
   - entity: Notification
   - 예외처리: 공고 없음, params 를 미입력
   - 주의사항: DB 에서 삭제되어야 함
 4. 채용공고 목록
   - METHOD: get
   - entity: Notification, Company
   - 예외처리: 없음
   - 주의사항: 데이터 전체를 가져오지 않는다. '채용내용' 등은 누락됨.
   - 데이터:
   ```
 [
	{
		"채용공고_id": 채용공고_id,
	  "회사명":"원티드랩",
	  "국가":"한국",
	  "지역":"서울",
	  "채용포지션":"백엔드 주니어 개발자",
	  "채용보상금":1500000,
	  "사용기술":"Python"
	},
	{
		"채용공고_id": 채용공고_id,
	  "회사명":"네이버",
	  "국가":"한국",
	  "지역":"판교",
	  "채용포지션":"Django 백엔드 개발자",
	  "채용보상금":1000000,
	  "사용기술":"Django"
	},
  ...
]
   ```
 5. 채용공고 검색
   - METHOD: get
   - entity: Notification, Company
   - 예외처리: 검색어가 없음
   - 주의사항: 선택 구현
   - 데이터:
 ```
 [
	{
		"채용공고_id": 채용공고_id,
	  "회사명":"네이버",
	  "국가":"한국",
	  "지역":"판교",
	  "채용포지션":"Django 백엔드 개발자",
	  "채용보상금":1000000,
	  "사용기술":"Django"
	},
	{
		"채용공고_id": 채용공고_id,
	  "회사명":"카카오",
	  "국가":"한국",
	  "지역":"판교",
	  "채용포지션":"Django 백엔드 개발자",
	  "채용보상금":500000,
	  "사용기술":"Python"
	}
  ...
]
 ```
 6. 상세 페이지
   - METHOD: get
   - entity: Notification, Company
   - 예외처리: 없는 공고, 잘못된 입력값
   - 주의사항: 채용내용이 추가적으로 담겨있다. 회사가 올린 다른 공고의 ID 를 포함한다.
   - 데이터:
  ```
  [
    {
        "채용공고_ID": 1,
        "회사명": "원티드_연구소",
        "채용포지션": "프론트_엔드",
        "채용보상금": 500000,
        "사용기술": "react,graphQL,git",
        "지역": "춘천",
        "국가": "한국",
        "채용내용": "내용 바꿈",
        "회사가올린다른채용공고_id": [
            1,
            11
        ]
    }
]
  ```
  7. 채용공고에 지원
   - METHOD: post
   - entity: Notification, Company, User, Registration
   - 예외처리: 이미 지원함, 없는 공고, 필요한 입력값 누락
   - 주의사항: 같은 공고에 한번만 지원함, unique 의 사용 필요(entity 에서 정의해야 한다.)
   - 데이터: 

    ```
    
    {
	    "채용공고_id": 채용공고_id,
      "사용자_id": 사용자_id
    }
    
    ```
    
--- 
 
### ERD

<img width="600" alt="스크린샷 2022-10-19 오후 7 14 59" src="https://user-images.githubusercontent.com/88824305/196672458-1e01404f-e35f-47cf-9df7-96f4cc45038c.jpg">

</br>

 - 모두 네 개의 테이블: user, company, notification, registration
 - typeORM 의 entity 를 활용해 테이블을 생성함
 - 테스트 코드를 위해 테스트 데이터베이스를 따로 만들도록 설정함

</br>

---
### API

[postman document](https://documenter.getpostman.com/view/22555415/2s847JtCjT)

---
### unit_test_결과 
<img width="600" alt="스크린샷 2022-10-19 오후 6 42 34" src="https://user-images.githubusercontent.com/88824305/196674186-98e647ef-76cf-4c1f-a584-58e757b49572.jpg">
</br>

<img width="600" alt="스크린샷 2022-10-19 오후 6 42 03" src="https://user-images.githubusercontent.com/88824305/196674219-4d164807-868d-407c-ab01-5e741df8df4a.jpg">
</br>

---

### 사용

- 서버 테스트 시작: npm test

</br>

- 서버 테스트 커버리지: npm run coverage

</br>

- 개발자 서버 시작: npm run dev

</br>

- 서버 시작: npm start
