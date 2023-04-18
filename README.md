# 📚 Book_Mark

카테고리를 생성하여 링크 저장 및 메모가 가능한 웹 서비스 (2022.07~2022.08, 2023.03~2023.04)
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

- Login 화면 실행
- google 로그인 후 Main page
  <br> 카테고리에 들어갈 필요없이 선택 후 바로 저장 가능
- 카테고리 생성 button, 로그아웃 button
- 카테고리 생성 페이지~ (카테고리명, 이미지, 색상 저장)
- 카테고리 페이지 (저장된 링크 및 메모 확인 가능)
  <br><br>

## 호스팅 링크

[Book Mark](https://book-mark-db594.web.app/)
<br><br>

## 프로젝트 개발환경

VScode (version 1.77.2)<br>
React (version 18.2.0)<br>
styled-components (version 5.3.5)
