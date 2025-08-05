// 퀴즈 옵션 인터페이스
interface QuizOption {
  text: string;
  isCorrect: boolean;
}

// 터미널 단축키 인터페이스 정의 (퀴즈 기능 추가)
interface TerminalShortcut {
  key: string;
  action: string;
  description: string;
  tips?: string;
  category: "cursor" | "edit" | "history" | "control" | "advanced";
  categoryIcon: string;
  quizOptions: QuizOption[];
  quizHint: string; // 퀴즈용 힌트 추가
}

// 터미널 단축키 데이터 (퀴즈 옵션 포함)
const terminalShortcuts: TerminalShortcut[] = [
  // 1. 커서 이동 🚀
  {
    key: "Ctrl + A",
    action: "줄 머리로 이동",
    description: "커서를 현재 줄의 맨 앞으로 이동",
    tips: '"A = Ahead (선두)"라고 기억하면 편리합니다.',
    category: "cursor",
    categoryIcon: "🚀",
    quizHint: "영어 알파벳의 첫 번째 글자! 선두(Ahead)를 생각해보세요.",
    quizOptions: [
      { text: "줄 머리로 이동", isCorrect: true },
      { text: "줄 끝으로 이동", isCorrect: false },
      { text: "전체 텍스트 선택", isCorrect: false },
      { text: "이전 히스토리 호출", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + E",
    action: "줄 끝으로 이동",
    description: "커서를 현재 줄의 맨 끝으로 이동",
    tips: '"E=End"',
    category: "cursor",
    categoryIcon: "🚀",
    quizHint: "E는 End! 끝으로 간다고 생각하면 쉬워요.",
    quizOptions: [
      { text: "줄 끝으로 이동", isCorrect: true },
      { text: "줄 머리로 이동", isCorrect: false },
      { text: "현재 줄 편집기로 열기", isCorrect: false },
      { text: "다음 단어로 이동", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + B",
    action: "1 문자 왼쪽으로 이동",
    description: "← 키와 동등. 홈 포지션에서 손을 떼지 않고 조작",
    category: "cursor",
    categoryIcon: "🚀",
    quizHint: "B는 Back! 뒤로(왼쪽으로) 한 글자씩 이동합니다.",
    quizOptions: [
      { text: "1 문자 왼쪽으로 이동", isCorrect: true },
      { text: "1 문자 오른쪽으로 이동", isCorrect: false },
      { text: "1 단어 왼쪽으로 이동", isCorrect: false },
      { text: "줄 시작으로 이동", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + F",
    action: "1 문자 오른쪽으로 이동",
    description: "→ 키와 동등",
    category: "cursor",
    categoryIcon: "🚀",
    quizHint: "F는 Forward! 앞으로(오른쪽으로) 한 글자씩 전진!",
    quizOptions: [
      { text: "1 문자 오른쪽으로 이동", isCorrect: true },
      { text: "1 문자 왼쪽으로 이동", isCorrect: false },
      { text: "파일 검색 열기", isCorrect: false },
      { text: "1 단어 오른쪽으로 이동", isCorrect: false },
    ],
  },
  {
    key: "Alt + B",
    action: "1 단어 왼쪽으로 이동",
    description: '"B = Back" Option + B',
    category: "cursor",
    categoryIcon: "🚀",
    quizHint: "Alt를 누르면 단어 단위로! B는 Back이니까 왼쪽으로.",
    quizOptions: [
      { text: "1 단어 왼쪽으로 이동", isCorrect: true },
      { text: "1 단어 오른쪽으로 이동", isCorrect: false },
      { text: "1 문자 왼쪽으로 이동", isCorrect: false },
      { text: "이전 북마크로 이동", isCorrect: false },
    ],
  },
  {
    key: "Alt + F",
    action: "1 단어 오른쪽으로 이동",
    description: '"F=Forward"',
    category: "cursor",
    categoryIcon: "🚀",
    quizHint: "Alt + F는 Forward! 단어 단위로 앞으로 점프합니다.",
    quizOptions: [
      { text: "1 단어 오른쪽으로 이동", isCorrect: true },
      { text: "1 단어 왼쪽으로 이동", isCorrect: false },
      { text: "파일 메뉴 열기", isCorrect: false },
      { text: "전체 화면 모드 토글", isCorrect: false },
    ],
  },

  // 2. 행 편집 ✏️
  {
    key: "Ctrl + K",
    action: "커서 위치에서 줄 끝까지 삭제",
    description: "나중에 Ctrl + Y로 붙여넣기 가능",
    category: "edit",
    categoryIcon: "✏️",
    quizHint: 'K는 Kill! 커서에서 오른쪽 끝까지 모든 걸 "죽여버려요".',
    quizOptions: [
      { text: "커서 위치에서 줄 끝까지 삭제", isCorrect: true },
      { text: "현재 줄 전체 삭제", isCorrect: false },
      { text: "줄 머리에서 커서까지 삭제", isCorrect: false },
      { text: "다음 단어까지 삭제", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + U",
    action: "줄 머리에서 커서 위치까지 삭제",
    description: '"U = Up (위)"라고 기억하면 좋습니다',
    category: "edit",
    categoryIcon: "✏️",
    quizHint: "U는 Up! 위쪽(줄 시작)부터 현재 커서까지 지워요.",
    quizOptions: [
      { text: "줄 머리에서 커서 위치까지 삭제", isCorrect: true },
      { text: "커서 위치에서 줄 끝까지 삭제", isCorrect: false },
      { text: "현재 줄을 위로 이동", isCorrect: false },
      { text: "대문자로 변환", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + W",
    action: "바로 이전 단어 삭제",
    description: "잘못된 입력을 신속하게 수정",
    category: "edit",
    categoryIcon: "✏️",
    quizHint: "W는 Word! 바로 앞의 단어 하나를 삭제합니다.",
    quizOptions: [
      { text: "바로 이전 단어 삭제", isCorrect: true },
      { text: "다음 단어 삭제", isCorrect: false },
      { text: "현재 창 닫기", isCorrect: false },
      { text: "현재 단어 전체 선택", isCorrect: false },
    ],
  },
  {
    key: "Alt + D",
    action: "커서 위치에서 다음 단어 끝까지 삭제",
    description: "전방 단어를 단번에 지우고 싶을 때",
    category: "edit",
    categoryIcon: "✏️",
    quizHint: "D는 Delete! Alt와 함께 쓰면 앞쪽(forward) 단어를 삭제해요.",
    quizOptions: [
      { text: "커서 위치에서 다음 단어 끝까지 삭제", isCorrect: true },
      { text: "바로 이전 단어 삭제", isCorrect: false },
      { text: "현재 디렉토리 표시", isCorrect: false },
      { text: "중복 라인 삭제", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + D",
    action: "커서 아래의 문자를 삭제 / 쉘 종료",
    description:
      "① 커서 아래의 문자를 삭제 ② 입력행이 비어 있으면 쉘 종료. Vim의 x와 가까운 감각",
    category: "edit",
    categoryIcon: "✏️",
    quizHint:
      "Delete 키처럼! 커서 바로 아래 글자를 지우거나, 빈 줄에서는 쉘을 나가요.",
    quizOptions: [
      { text: "커서 아래의 문자를 삭제 / 쉘 종료", isCorrect: true },
      { text: "현재 줄 복제", isCorrect: false },
      { text: "다음 단어 삭제", isCorrect: false },
      { text: "디스크 사용량 표시", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + Y",
    action: "바로 전에 삭제한 텍스트 붙여넣기",
    description: '"Y=Yank"(꺼내기)',
    category: "edit",
    categoryIcon: "✏️",
    quizHint: 'Y는 Yank! 방금 "잡아당겨서(삭제한)" 텍스트를 다시 붙여넣어요.',
    quizOptions: [
      { text: "바로 전에 삭제한 텍스트 붙여넣기", isCorrect: true },
      { text: "클립보드 내용 붙여넣기", isCorrect: false },
      { text: "작업 확인 (Yes)", isCorrect: false },
      { text: "다시 실행 (Redo)", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + T",
    action: "커서 전후의 문자를 바꿉니다",
    description: "typo 수정에 편리",
    category: "edit",
    categoryIcon: "✏️",
    quizHint:
      "T는 Transpose! 커서 앞뒤 두 글자의 위치를 바꿔요. 오타 수정에 유용!",
    quizOptions: [
      { text: "커서 전후의 문자를 바꿉니다", isCorrect: true },
      { text: "새 탭 열기", isCorrect: false },
      { text: "현재 줄을 다음 줄과 바꾸기", isCorrect: false },
      { text: "터미널 타이틀 변경", isCorrect: false },
    ],
  },
  {
    key: "Alt + T",
    action: "커서 전후의 단어 바꾸기",
    description: "단어 단위로 정렬",
    category: "edit",
    categoryIcon: "✏️",
    quizHint: "Alt + T는 단어 단위로 Transpose! 앞뒤 단어의 순서를 바꿔요.",
    quizOptions: [
      { text: "커서 전후의 단어 바꾸기", isCorrect: true },
      { text: "커서 전후의 문자 바꾸기", isCorrect: false },
      { text: "터미널 테마 변경", isCorrect: false },
      { text: "현재 시간 표시", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + _",
    action: "마지막 변경 사항 취소(Undo)",
    description: "Zsh에서는 그대로 사용할 수 있습니다",
    category: "edit",
    categoryIcon: "✏️",
    quizHint: '언더스코어(_)는 "되돌리기"를 의미! 마지막 실수를 취소해요.',
    quizOptions: [
      { text: "마지막 변경 사항 취소(Undo)", isCorrect: true },
      { text: "다시 실행(Redo)", isCorrect: false },
      { text: "밑줄 입력", isCorrect: false },
      { text: "최소화", isCorrect: false },
    ],
  },

  // 3. 이력·보완 📚
  {
    key: "Ctrl + P",
    action: "이전 히스토리 호출",
    description: '↑ 키와 동등("P = Previous")',
    category: "history",
    categoryIcon: "📚",
    quizHint: "P는 Previous! 이전(과거)의 명령어로 돌아가요.",
    quizOptions: [
      { text: "이전 히스토리 호출", isCorrect: true },
      { text: "다음 히스토리 호출", isCorrect: false },
      { text: "인쇄 대화상자 열기", isCorrect: false },
      { text: "프로세스 목록 표시", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + N",
    action: "다음 히스토리 호출",
    description: '↓ 키와 동등("N = Next")',
    category: "history",
    categoryIcon: "📚",
    quizHint: "N은 Next! 다음(미래) 명령어로 앞으로 가요.",
    quizOptions: [
      { text: "다음 히스토리 호출", isCorrect: true },
      { text: "이전 히스토리 호출", isCorrect: false },
      { text: "새 문서 생성", isCorrect: false },
      { text: "네트워크 상태 표시", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + R",
    action: "역방향 증분 검색",
    description: "입력하는 동안 과거 명령을 즉시 검색",
    category: "history",
    categoryIcon: "📚",
    quizHint: "R은 Reverse! 히스토리를 거꾸로 검색하면서 찾아요.",
    quizOptions: [
      { text: "역방향 증분 검색", isCorrect: true },
      { text: "다시 로드", isCorrect: false },
      { text: "히스토리 전체 표시", isCorrect: false },
      { text: "명령어 반복 실행", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + O (Ctrl + R 후)",
    action: "검색 후 명령 실행 및 재검색 계속",
    description: "연속으로 히스토리를 실행할 때 유용",
    category: "history",
    categoryIcon: "📚",
    quizHint: "O는 One more! 검색 결과를 실행하고 계속 검색할 수 있어요.",
    quizOptions: [
      { text: "검색 후 명령 실행 및 재검색 계속", isCorrect: true },
      { text: "파일 열기 대화상자", isCorrect: false },
      { text: "검색 결과 정렬", isCorrect: false },
      { text: "출력 리디렉션", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + G (Ctrl + R 후)",
    action: "검색 취소",
    description: "Escape와 같은 이미지",
    category: "history",
    categoryIcon: "📚",
    quizHint: "G는 Give up! 검색을 포기하고 원래대로 돌아가요.",
    quizOptions: [
      { text: "검색 취소", isCorrect: true },
      { text: "검색 결과로 이동", isCorrect: false },
      { text: "Git 상태 표시", isCorrect: false },
      { text: "그룹 권한 변경", isCorrect: false },
    ],
  },
  {
    key: "Alt + .",
    action: "마지막 명령의 마지막 인수 확장",
    description: "연속해서 누르면 더 과거로 거슬러 올라간다",
    category: "history",
    categoryIcon: "📚",
    quizHint: '점(.)은 "마지막"을 의미! 이전 명령의 마지막 부분을 가져와요.',
    quizOptions: [
      { text: "마지막 명령의 마지막 인수 확장", isCorrect: true },
      { text: "현재 디렉토리 표시", isCorrect: false },
      { text: "숨김 파일 토글", isCorrect: false },
      { text: "마지막 명령 전체 확장", isCorrect: false },
    ],
  },
  {
    key: "!!",
    action: "이전 명령을 다시 실행",
    description: "인증 누설시의 sudo !! 클래식",
    category: "history",
    categoryIcon: "📚",
    quizHint: '느낌표 두 개(!!)는 "바로 전 명령을 그대로!" 라는 뜻이에요.',
    quizOptions: [
      { text: "이전 명령을 다시 실행", isCorrect: true },
      { text: "현재 명령을 두 번 실행", isCorrect: false },
      { text: "강제 종료 신호", isCorrect: false },
      { text: "백그라운드 작업 표시", isCorrect: false },
    ],
  },
  {
    key: "!<번호>",
    action: "지정된 번호의 기록 실행",
    description: "history 명령과 함께 사용",
    category: "history",
    categoryIcon: "📚",
    quizHint: "느낌표(!) + 번호 = 히스토리 번호에 해당하는 명령을 실행!",
    quizOptions: [
      { text: "지정된 번호의 기록 실행", isCorrect: true },
      { text: "지정된 번호의 기록 삭제", isCorrect: false },
      { text: "지정된 프로세스 종료", isCorrect: false },
      { text: "지정된 라인으로 이동", isCorrect: false },
    ],
  },

  // 4. 터미널 제어 & 프로세스 조작 🛠️
  {
    key: "Ctrl + L",
    action: "화면 지우기",
    description: "clear와 동등. Prompt를 맨 위로 이동하여 시야 확보",
    category: "control",
    categoryIcon: "🛠️",
    quizHint: "L은 cLear! 화면을 깨끗하게 정리해요.",
    quizOptions: [
      { text: "화면 지우기", isCorrect: true },
      { text: "로그 파일 열기", isCorrect: false },
      { text: "라인 번호 토글", isCorrect: false },
      { text: "화면 잠금", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + C",
    action: "실행중인 프로세스 강제 종료 (SIGINT)",
    description: "오실행을 즉시 정지",
    category: "control",
    categoryIcon: "🛠️",
    quizHint: "C는 Cancel! 실행중인 프로그램을 강제로 취소/종료해요.",
    quizOptions: [
      { text: "실행중인 프로세스 강제 종료 (SIGINT)", isCorrect: true },
      { text: "클립보드로 복사", isCorrect: false },
      { text: "프로세스 일시 중지", isCorrect: false },
      { text: "색상 설정 열기", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + Z",
    action: "실행 중인 프로세스 일시 중지(SIGTSTP)",
    description: "fg / bg로 복귀 가능",
    category: "control",
    categoryIcon: "🛠️",
    quizHint:
      'Z는 "잠깐!"의 의미! 프로세스를 잠시 멈춰두고 나중에 다시 시작할 수 있어요.',
    quizOptions: [
      { text: "실행 중인 프로세스 일시 중지(SIGTSTP)", isCorrect: true },
      { text: "마지막 작업 취소", isCorrect: false },
      { text: "프로세스 강제 종료", isCorrect: false },
      { text: "압축 파일 생성", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + S",
    action: "출력 일시 정지 (XOFF)",
    description: "로그가 너무 흐르면",
    category: "control",
    categoryIcon: "🛠️",
    quizHint: "S는 Stop! 화면 출력을 일시적으로 멈춰요. (Ctrl+Q로 다시 시작)",
    quizOptions: [
      { text: "출력 일시 정지 (XOFF)", isCorrect: true },
      { text: "파일 저장", isCorrect: false },
      { text: "화면 분할", isCorrect: false },
      { text: "시스템 상태 표시", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + Q",
    action: "출력 재개(XON)",
    description: "Ctrl + S 해제",
    category: "control",
    categoryIcon: "🛠️",
    quizHint: 'Q는 "계속"의 의미! Ctrl+S로 멈춘 출력을 다시 시작해요.',
    quizOptions: [
      { text: "출력 재개(XON)", isCorrect: true },
      { text: "프로그램 종료", isCorrect: false },
      { text: "쿼리 실행", isCorrect: false },
      { text: "출력 일시 정지", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + D (입력행 공백시)",
    action: "쉘 종료 / EOF 송신",
    description: "exit 대체",
    category: "control",
    categoryIcon: "🛠️",
    quizHint: 'D는 Done! 빈 줄에서 누르면 "작업 완료"라며 쉘을 종료해요.',
    quizOptions: [
      { text: "쉘 종료 / EOF 송신", isCorrect: true },
      { text: "커서 아래 문자 삭제", isCorrect: false },
      { text: "디버그 모드 활성화", isCorrect: false },
      { text: "날짜 표시", isCorrect: false },
    ],
  },

  // 5. 응용 테크닉 💡
  {
    key: "Tab",
    action: "보완",
    description:
      "두 번 누르면 후보 목록 표시. bind 'set show-all-if-ambiguous on' (Zsh 표준)",
    category: "advanced",
    categoryIcon: "💡",
    quizHint:
      'Tab키는 "완성해줘!"의 의미! 명령어나 파일명을 자동으로 완성해요.',
    quizOptions: [
      { text: "자동 완성 / 보완", isCorrect: true },
      { text: "탭 문자 입력", isCorrect: false },
      { text: "새 탭 열기", isCorrect: false },
      { text: "들여쓰기 정렬", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + X → Ctrl + E",
    action: "현재 입력으로 $EDITOR 열기",
    description: "복잡한 명령을 편집기에서 편집 가능",
    category: "advanced",
    categoryIcon: "💡",
    quizHint:
      'X → E는 "확장해서 편집"! 긴 명령어를 편집기에서 수정할 수 있어요.',
    quizOptions: [
      { text: "현재 입력으로 $EDITOR 열기", isCorrect: true },
      { text: "모든 텍스트 선택 후 편집기 열기", isCorrect: false },
      { text: "확장 모드 활성화", isCorrect: false },
      { text: "외부 명령 실행", isCorrect: false },
    ],
  },
  {
    key: "Ctrl + X → Ctrl + U",
    action: "소문자 ⇔ 대문자 토글",
    description: "변수 이름 수정 등에 편리",
    category: "advanced",
    categoryIcon: "💡",
    quizHint: 'X → U는 "대문자로 바꿔줘"! Upper/lower case를 토글해요.',
    quizOptions: [
      { text: "소문자 ⇔ 대문자 토글", isCorrect: true },
      { text: "사용자 이름 표시", isCorrect: false },
      { text: "유니코드 입력 모드", isCorrect: false },
      { text: "마지막 변경사항 취소", isCorrect: false },
    ],
  },
  {
    key: "fg / bg",
    action: "중지된 작업을 Foreground / Background로",
    description: "jobs와 함께 관리",
    category: "advanced",
    categoryIcon: "💡",
    quizHint:
      "fg는 foreground, bg는 background! 멈춘 프로그램을 앞/뒤에서 다시 실행해요.",
    quizOptions: [
      { text: "중지된 작업을 Foreground / Background로", isCorrect: true },
      { text: "파일 그룹 / 백업 생성", isCorrect: false },
      { text: "포그라운드 / 백그라운드 색상 변경", isCorrect: false },
      { text: "빠른 검색 / 북마크 이동", isCorrect: false },
    ],
  },
];

export type { TerminalShortcut, QuizOption };
export { terminalShortcuts };
