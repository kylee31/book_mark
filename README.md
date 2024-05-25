# 📚 Book_Mark

소셜 로그인, NoSQL(Firebase cloud store)에 카테고리 및 링크 저장
<br/><br/>

## 설치 및 실행

```
## npm
git clone https://github.com/kylee31/book_mark.git
npm install
npm run start

## yarn
git clone https://github.com/kylee31/book_mark.git
yarn install
yarn start
```

## 기술스택 및 구현 기능

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styledcomponents&logoColor=black"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=black"/> <img src="https://img.shields.io/badge/Redux Thunk-999999?style=flat-square&logoColor=black"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white"/>

- TypeScript 적용한 React 프로젝트 (firebase 배포).
- 초기 구현 시 json-server를 사용하여 REST API 사용.
- 이후 배포를 위해 cloud firestore로 리팩토링하여 데이터 관리.
- firebase OAuth로 소셜 로그인 구현.
  <br/><br/>

## 주요 기능

|                                                                                                                           |                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **로그인**                                                                                                                | **메인 페이지**                                                                                                          |
| <image src="https://github.com/kylee31/book_mark/assets/106156087/0374fb8a-2d61-472e-9856-002d5312ac11.png" width="600"/> | <image src="https://github.com/kylee31/book_mark/assets/106156087/e44e3aa6-ee79-4841-a08d-50ca6ed524d6.png" width="600"> |
| **카테고리 생성**                                                                                                         | **링크 페이지**                                                                                                          |
| <image src="https://github.com/kylee31/book_mark/assets/106156087/325acae0-9883-4ee9-b187-44de1e020a64.png" width="600">  | <image src="https://github.com/kylee31/book_mark/assets/106156087/1e4a8dbf-83c8-449e-a497-12bd536ce73e.png" width="600"> |

- 소셜 로그인(google), 테스팅 계정 로그인
- 카테고리명, 이미지, 색상 저장
- 생성한 카테고리 선택 후 바로 링크 및 메모 저장
- 저장된 링크 및 메모 확인 가능
  <br/><br/>

## 링크

<h3>https://book-mark-db594.web.app</h3>

```
🔑 테스트 계정 [Email] testing@email.com / [Password] testing
```

<br/>

## 트러블슈팅

<details>
<summary><b>Firebase DB와의 비동기 통신 관리(데이터)</b></summary>
[문제] <br/>
1. DB에서 비동기적으로 데이터를 가져오면 데이터 출력 시 재렌더링으로 인해 화면 깜빡임 현상 발생<br/>
2. 라이브러리 사용 유무에 따라 구현 상의 차이점 경험해보기 위해 2가지 방식으로 해결<br/>
[과정] <br/>
[방안1] 상태 관리 라이브러리 미사용 (커스텀 Hook과 localstorage로 관리)<br/>
- 초기 로딩 시 가져온 데이터 localstorage에 저장하여 사용했으나 아래와 같은 단점 존재<br/>
1. 실시간 업데이트하기 위해 Firebase에 변경사항 보내는 커스텀 Hook 추가 구현<br/>
2. 로직 추가 구현 비효율적, 용량 측면에서도 한계 존재<br/>
[방안2] 상태 관리 라이브러리 사용 (Redux, Redux-Thunk로 관리)<br/>
- Redux와 Redux-Thunk로 비동기 통신 방식 개선하여 실시간 업데이트 용이<br/>
[결과] <br/>
전역 상태 라이브러리 사용으로 비동기 통신 방식 개선, 실시간 업데이트 실행 <br/>
</details>
<br/>

## 현재 이슈, 코드 및 기능 개선사항

[이슈] firebase 데이터 로딩으로 인한 화면 깜빡임 (2023.11) <br/>
[코드 개선사항] 전역 상태 관리 라이브러리 적용 완료 (Redux, Redux-Thunk) <br/>
[기능 개선사항] .
<br/><br/>
