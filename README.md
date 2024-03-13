# cryptoLab-frontend-test

---

## 📌 프로젝트 실행 방법

```shell
cd movie-app
npm i
npm run dev
```

- http://localhost:3000 접속 ▶️ 이미 3000 포트가 사용중일 경우 콘솔 안내 메세지에 따라서 접속

## 🛠️ 사용 기술

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />

## 📁 폴더 구조

```shell
app
├── _components # 공통 컴포넌트
│   ├── Modal.tsx
│   ├── RatingStars.tsx
│   └── SvgIcon.tsx
├── globals.css
├── layout.tsx
├── movie-detail
│   └── [id]
│       ├── _components # movie-detail 페이지 컴포넌트
│       │   ├── FavoriteButton.tsx
│       │   ├── MoreLikeThis.tsx
│       │   └── MovieDetail.tsx
│       └── page.tsx
└── movie-list
    ├── _components # movie-list 페이지 컴포넌트
    │   ├── MenuBar.tsx
    │   ├── MovieCard.tsx
    │   ├── PageBar.tsx
    │   └── SelectBox.tsx
    └── page.tsx
```

### ✅ 커밋 컨벤션

| 커밋 유형 | 설명                        |
| --------- | --------------------------- |
| feat      | 새로운 기능 구현, 특징 추가 |
| fix       | 버그해결, 수정              |
| refactor  | 리팩토링                    |
| rename    | 파일명, 디렉토리명 변경     |
| remove    | 파일, 디렉토리 삭제         |
| docs      | 문서 관련 작업              |
| chore     | 자잘한 수정에 대한 커밋     |
