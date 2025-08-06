import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "클로드 퀴즈 | 터미널 단축키 학습",
  description: "터미널 단축키를 재미있게 학습하세요! 40개 이상의 문제와 5개 카테고리로 구성된 인터랙티브 퀴즈 앱입니다.",
  keywords: ["터미널", "단축키", "퀴즈", "학습", "개발자", "CLI", "shortcuts", "terminal"],
  authors: [{ name: "Claude Quiz Team" }],
  creator: "Claude Quiz Team",
  publisher: "Claude Quiz Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://claude-shortcut-quiz.vercel.app'),
  openGraph: {
    title: "클로드 퀴즈 | 터미널 단축키 학습",
    description: "터미널 단축키를 재미있게 학습하세요! 40개 이상의 문제와 5개 카테고리로 구성된 인터랙티브 퀴즈 앱입니다.",
    url: 'https://claude-shortcut-quiz.vercel.app',
    siteName: '클로드 퀴즈',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '클로드 퀴즈 - 터미널 단축키 학습',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "클로드 퀴즈 | 터미널 단축키 학습",
    description: "터미널 단축키를 재미있게 학습하세요! 🚀",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
