# 📚 Book_Mark

카테고리를 생성하여 링크 저장 및 메모가 가능한 웹 서비스 (2022.07-2022.08, 2023.03-2023.04)
<br><br>

## 구현 및 배포기술

- React로 구현한 프로젝트이며 기본적인 기능 개발 이후 서비스 향상을 위한 리팩토링 실시.
  <br>(React, JavaScript, HTML, CSS(styled-components))
- cloud firestore로 데이터 관리.
- firebase OAuth로 소셜 로그인 구현
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
  <image src="https://github.com/kylee31/book_mark/assets/106156087/9c856ccf-e5c0-402d-b178-a51b2c80a643.png" width="600">

- Main page (카테고리 생성 button, 로그아웃 button) <br>

  - 카테고리에 들어갈 필요없이 선택 후 바로 링크 및 메모 저장 가능<br>
    <image src="https://github.com/kylee31/book_mark/assets/106156087/e44e3aa6-ee79-4841-a08d-50ca6ed524d6.png" width="600">

    <br> ✅ 카테고리 생성 후 링크 저장 예시 <br>
    <image src="https://github.com/kylee31/book_mark/assets/106156087/d1333a09-cdef-4fcf-9f7b-f1ec006dc54a.png" width="600">

- 카테고리 생성 page (카테고리명, 이미지, 색상 저장) <br>
  <image src="https://github.com/kylee31/book_mark/assets/106156087/325acae0-9883-4ee9-b187-44de1e020a64.png" width="600">

- 생성된 카테고리 페이지 (저장된 링크 및 메모 확인 가능) <br>
  <image src="https://github.com/kylee31/book_mark/assets/106156087/1e4a8dbf-83c8-449e-a497-12bd536ce73e.png" width="600">

## 웹 사이트 링크

📚Book Mark

<h3>https://book-mark-db594.web.app/<h3>
<br>

## 실행 영상 (youtube)

[![book mark](https://img.youtube.com/vi/o1Wu9vysC_0/0.jpg)](https://youtu.be/o1Wu9vysC_0)
<br><br>

## 프로젝트 개발환경

VScode (version 1.77.2)<br>
React (version 18.2.0)<br>
