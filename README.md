This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 📱 PWA (Progressive Web App) 설치 가이드
이 앱은 스마트폰이나 PC에서 앱처럼 설치하여 사용할 수 있습니다.

1. **배포된 URL** (HTTPS 연결)로 이동합니다.
2. **iPhone (Safari)**: 하단의 '공유' 아이콘을 누른 후 '홈 화면에 추가'를 클릭하세요.
3. **Android (Chrome)**: 주소창 옆의 '설정(점 3개)' 아이콘을 누른 후 '홈 화면에 추가' 또는 '앱 설치'를 클릭하세요.
4. **PC (Chrome/Edge)**: 주소창 우측의 '앱 설치' 아이콘을 클릭하세요.

---

## 🚀 Vercel로 배포하기
가장 추천하는 배포 방식입니다.

1. **GitHub에 소스 코드 업로드**: 이 프로젝트를 본인의 GitHub 저장소에 push합니다.
2. **Vercel 연동**: [Vercel](https://vercel.com/new)에서 'Import' 클릭 후 해당 저장소를 선택합니다.
3. **환경 변수 설정**: 만약 외부 API 키가 있다면 설정 메뉴에서 추가해 주세요.
4. **배포 완료**: Vercel이 자동으로 빌드하고 HTTPS URL을 생성해 줍니다. 이후부터는 코드를 push할 때마다 자동으로 업데이트됩니다.
