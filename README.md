# 📚 Book_Mark

카테고리를 생성하여 링크 저장 및 메모가 가능한 웹 서비스 (2022.07-2022.08, 2023.03-2023.04)
<br><br>

## 구현 및 배포기술

- React로 구현한 프로젝트이며 기본적인 기능 개발 이후 서비스 향상을 위한 리팩토링 실시.
  <br>(React, HTML, CSS(styled-components))
- cloud firestore로 데이터 관리.
- firebase로 배포.

## 디렉토리 구조 (src/)

1. component
   <br> Header.jsx, Button.jsx, Profile.jsx, CategoryItem.jsx, CategoryList.jsx, CreateLink.jsx, LinkList.jsx

2. pages
   <br> Login.jsx, MainPage.jsx, MyCate.jsx, AddCate.jsx, WrongPage.jsx

3. util
   <br> isLogin.js, Layout.jsx, PrivateRoute.jsx

## 프로젝트 실행 (상세설명)

- Login 화면 실행 (google 로그인) <br> 
  <image src="https://user-images.githubusercontent.com/106156087/232788703-dbbcdc3c-1453-405f-8ee7-4f0f70c263d1.png" width="600">

- Main page (카테고리 생성 button, 로그아웃 button) <br>
  - 카테고리에 들어갈 필요없이 선택 후 바로 링크 및 메모 저장 가능<br>
  <image src="https://user-images.githubusercontent.com/106156087/232789090-1c19ee12-e5ce-499e-8eda-fb68ede17d4d.png" width="600">
  <br> ✅ 카테고리 생성 후 링크 저장 예시 <br>
  <image src="https://user-images.githubusercontent.com/106156087/232790858-81cd5018-e9e3-43ef-bfc1-e655c56086cd.png" width="600">
  
- 카테고리 생성 page (카테고리명, 이미지, 색상 저장) <br>
  <image src="https://user-images.githubusercontent.com/106156087/232790347-65e20003-d415-427a-8615-60a6003f14ae.png" width="600">

- 생성된 카테고리 페이지 (저장된 링크 및 메모 확인 가능) <br>
  <image src="https://user-images.githubusercontent.com/106156087/232790610-77a5c189-a9d9-4443-a78e-44f38af1aade.png" width="600">

## 호스팅 링크

[Book Mark](https://book-mark-db594.web.app/)
<br><br>

## 프로젝트 개발환경

VScode (version 1.77.2)<br>
React (version 18.2.0)<br>
styled-components (version 5.3.5)
