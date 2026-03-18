import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Math Radar | 수학 행사 및 공모전 알리미",
  description: "매일 업데이트되는 국내외 수학 행사, 공모전, 캠프 정보를 한눈에 확인하세요.",
  applicationName: "Math Radar",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Math Radar",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: "/logo.png",
  },
};

export const viewport = {
  themeColor: "#0a192f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <nav className="nav glass">
          <div className="flex-center">
            <Image 
              src="/logo.png" 
              alt="Math Radar Logo" 
              width={40} 
              height={40} 
              className="logo-icon"
            />
            <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              Math <span className="text-gradient">Radar</span>
            </span>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link">홈</a>
            <a href="/library" className="nav-link">내 서재</a>
          </div>
          <button className="btn btn-primary">로그인</button>
        </nav>
        <main className="container">
          {children}
        </main>
        <footer style={{ marginTop: '80px', padding: '40px 0', borderTop: '1px solid var(--glass-border)', textAlign: 'center', opacity: 0.6 }}>
          <p>© 2026 Math Radar. 수학교사를 위한 최고의 파트너.</p>
        </footer>
      </body>
    </html>
  );
}
