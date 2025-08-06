# 🚀 클로드 퀴즈 | Terminal Shortcuts Quiz

> *"클로드 코드에 있는 단축키를 어떻게 외울까?"* 라는 고민에서 시작된 프로젝트 ✨

**AI 트리오의 협업작** 🤖
- 📋 **기획**: Gemini (PRD 작성) 
- 🧠 **데이터**: Claude Desktop (퀴즈 40+ 문제)
- 💻 **개발**: Claude Code (기능 구현)

**첫 바이브 코딩 & 첫 업로드!** 🎉

## 📸 미리보기

```
   🖥️  터미널 마스터가 되어보세요!
  ┌─────────────────────────────────┐
  │  Ctrl + A = ?                   │
  │  ○ 줄 머리로 이동               │
  │  ○ 줄 끝으로 이동               │  
  │  ○ 전체 선택                    │
  │  ○ 히스토리 호출                │
  └─────────────────────────────────┘
      💡 힌트: A = Ahead (선두)!
```

## ✨ 주요 기능

### 🎯 스마트 퀴즈 시스템
- **40개 이상** 터미널 단축키 문제
- **5개 카테고리**: 커서이동🚀, 편집✏️, 히스토리📚, 제어🛠️, 고급💡
- **3단계 난이도**: 초급 → 중급 → 고급 (+ 혼합모드)
- **똑똑한 힌트**: 기억하기 쉬운 연상법 제공

### 🎨 사용자 경험
- **반응형 디자인**: 모바일 친화적
- **부드러운 애니메이션**: Framer Motion 활용
- **다크/라이트 테마**: 눈이 편한 인터페이스
- **실시간 피드백**: 정답/오답 즉시 확인

## 🛠️ 기술 스택

### Core
- ⚛️ **React 19.1.0** - 최신 React 기능
- ⚡ **Next.js 15.4.5** - App Router + Turbopack
- 📘 **TypeScript 5** - 타입 안전성

### Styling & Animation
- 🎨 **Tailwind CSS v4** - 유틸리티 기반 스타일링
- 🎪 **shadcn/ui** - 세련된 컴포넌트 라이브러리
- 🎬 **Framer Motion** - 매끄러운 애니메이션

### State & Logic
- 🐻 **Zustand** - 간단하고 강력한 상태 관리
- 🎲 **Fisher-Yates** - 문제 순서 섞기 알고리즘

## 🚀 빠른 시작

### 설치 & 실행
```bash
# 클론
git clone https://github.com/your-username/claude-shortcut-quiz.git
cd claude-shortcut-quiz

# 의존성 설치 
npm install
# 또는
pnpm install

# 개발 서버 시작 (Turbopack 적용!)
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열어서 퀴즈 시작! 🎉

### 스크립트
```bash
npm run dev      # 개발 서버 (Turbopack)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # 코드 품질 검사
```

## 📂 프로젝트 구조

```
src/
├── app/                # Next.js App Router
│   ├── globals.css    # 글로벌 스타일
│   ├── layout.tsx     # 루트 레이아웃
│   └── page.tsx       # 홈페이지
├── components/         # React 컴포넌트
│   ├── HomePage.tsx   # 퀴즈 설정 페이지
│   ├── QuizApp.tsx    # 메인 앱 래퍼
│   ├── QuizPage.tsx   # 퀴즈 진행 페이지
│   ├── ResultPage.tsx # 결과 페이지
│   └── ui/            # shadcn/ui 컴포넌트 (42개!)
├── stores/
│   └── quizStore.ts   # Zustand 상태 관리
├── hooks/
│   └── use-mobile.ts  # 모바일 감지 훅
├── lib/
│   └── utils.ts       # 유틸리티 함수
├── quizData.ts        # 📚 40+ 퀴즈 데이터
└── quizUtil.ts        # 퀴즈 로직
```

## 🎮 퀴즈 카테고리

| 아이콘 | 카테고리 | 설명 | 예시 |
|--------|----------|------|------|
| 🚀 | 커서 이동 | 커서를 자유자재로! | `Ctrl+A`, `Ctrl+E` |
| ✏️ | 행 편집 | 텍스트 편집의 달인 | `Ctrl+K`, `Ctrl+W` |
| 📚 | 이력·보완 | 과거를 호출하라! | `Ctrl+R`, `!!` |
| 🛠️ | 터미널 제어 | 터미널을 지배하라 | `Ctrl+C`, `Ctrl+L` |
| 💡 | 응용 테크닉 | 고수의 비기 | `Tab`, `fg/bg` |

## 🏆 게임 플레이

### 난이도 선택
- **🟢 초급**: 기본 단축키 (Ctrl+A, Ctrl+C 등)
- **🟡 중급**: 일반적인 단축키 (Alt+B, Ctrl+R 등)  
- **🔴 고급**: 고급 테크닉 (Ctrl+X+E, !!, fg/bg 등)
- **🌈 혼합**: 모든 난이도 랜덤

### 퀴즈 진행
1. **문제 선택**: 10문제, 20문제, 30문제 중 선택
2. **카테고리 필터링**: 원하는 분야만 골라서!
3. **힌트 활용**: 막히면 💡 힌트 버튼 클릭
4. **즉시 피드백**: 정답/오답을 바로 확인
5. **최종 점수**: 정답률과 걸린 시간 체크

## 🎯 핵심 특징

### 🧠 똑똑한 학습 시스템
- **연상법 힌트**: "A = Ahead(선두)", "K = Kill"
- **문제 섞기**: 매번 다른 순서로 출제
- **점수 추적**: 정답률, 시간, 힌트 사용 여부

### 🎨 세련된 UI/UX
- **반응형**: 모바일에서도 완벽
- **접근성**: WCAG 가이드라인 준수
- **애니메이션**: 자연스러운 페이지 전환
- **피드백**: 직관적인 색상과 아이콘

## 🚧 로드맵

### v1.1 (곧 출시)
- [ ] 🏆 사용자 순위 시스템
- [ ] 📊 학습 진도 추적
- [ ] 🔄 틀린 문제 복습 기능

### v1.2 (계획 중)
- [ ] ⏰ 타이머 챌린지 모드
- [ ] 🌍 다국어 지원 (영어, 일본어)
- [ ] 📱 PWA 지원

### v2.0 (미래)
- [ ] 👥 멀티플레이어 대전
- [ ] 🎓 사용자 정의 퀴즈 생성
- [ ] 📈 상세한 학습 분석

## 🤝 기여하기

버그 발견이나 새로운 단축키 제안은 언제든 환영입니다! 

1. 이슈 생성 또는 PR 제출
2. 새로운 터미널 단축키 추가
3. UI/UX 개선 아이디어 제안
4. 다른 언어 번역 도움

## 📝 라이선스

MIT License - 자유롭게 사용하고 개선해주세요! 🎉

---

<div align="center">

### 🎯 터미널 마스터가 되어보세요!

**[🚀 지금 시작하기](https://claude-shortcut-quiz.vercel.app)**

*Made with ❤️ by AI Trio (Gemini + Claude Desktop + Claude Code)*

</div>
