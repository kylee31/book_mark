# 📚 Book_Mark
카테고리를 생성하여 링크 저장 및 메모가 가능한 웹 사이트 (2022.07-2022.08, 2023.03-2023.04)
<br/><br/>
## 구현 및 배포기술
- TypeScript 적용한 React 프로젝트 (firebase 배포).
- 초기 구현 시 json-server를 사용하여 REST API 사용.
- 이후 배포를 위해 cloud firestore로 리팩토링하여 데이터 관리.
- firebase OAuth로 소셜 로그인 구현.
<br/><br/>
## 디렉토리 구조
[src/component, src/pages, src/util]
<br/><br/>
## 실행 (상세 설명)
❗ 소셜 로그인 후에만 사용 가능하므로, 테스트 계정을 통해 체험 가능. <br/>
**(email: testing@email.com / password: testing)** <br/>
- **Login Page** <br/>
  - 소셜 로그인(google), 테스팅 계정 로그인 <br/>
    <image src="https://github.com/kylee31/book_mark/assets/106156087/0374fb8a-2d61-472e-9856-002d5312ac11.png" width="600"/>
- **Main Page** <br/>
  - 생성한 카테고리 선택 후 바로 링크 및 메모 저장 가능<br/>
    <image src="https://github.com/kylee31/book_mark/assets/106156087/e44e3aa6-ee79-4841-a08d-50ca6ed524d6.png" width="600">
    <br/>▼ 카테고리 생성 후 링크 저장 예시 <br>
    <image src="https://github.com/kylee31/book_mark/assets/106156087/d1333a09-cdef-4fcf-9f7b-f1ec006dc54a.png" width="600">
- **카테고리 생성 Page** <br/>
  - 카테고리명, 이미지, 색상 저장 <br/>
    <image src="https://github.com/kylee31/book_mark/assets/106156087/325acae0-9883-4ee9-b187-44de1e020a64.png" width="600">
- **생성한 카테고리 Page** <br/>
  - 저장된 링크 및 메모 확인 가능 <br/>
    <image src="https://github.com/kylee31/book_mark/assets/106156087/1e4a8dbf-83c8-449e-a497-12bd536ce73e.png" width="600">
<br/><br/>
## 링크
<h3>https://book-mark-db594.web.app</h3>
<br/>

## 현재 이슈, 코드 및 기능 개선사항
[이슈] firebase 데이터 로딩으로 인한 화면 깜빡임 (2023.11) <br/>
[코드 개선사항] 전역 상태 관리 라이브러리 적용 예정 <br/>
[기능 개선사항] .
<br/><br/>
## 프로젝트 개발환경
VScode (version 1.77.2), React (version 18.2.0), Node.js (version 16.15.1)

