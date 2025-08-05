import { TerminalShortcut, QuizOption, terminalShortcuts } from "./quizData";

// 퀴즈 통계를 위한 인터페이스
interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  categoryStats: Record<string, { correct: number; total: number }>;
}

// 힌트 사용 통계를 위한 인터페이스
interface QuizResult {
  shortcut: TerminalShortcut;
  isCorrect: boolean;
  hintUsed: boolean;
  timeSpent: number; // 초 단위
}

// 기본 유틸리티 함수들
export const getCategories = (): Array<{
  name: string;
  icon: string;
  displayName: string;
}> => {
  return [
    { name: "cursor", icon: "🚀", displayName: "커서 이동" },
    { name: "edit", icon: "✏️", displayName: "행 편집" },
    { name: "history", icon: "📚", displayName: "이력·보완" },
    { name: "control", icon: "🛠️", displayName: "터미널 제어 & 프로세스 조작" },
    { name: "advanced", icon: "💡", displayName: "응용 테크닉" },
  ];
};

export const getShortcutsByCategory = (
  category: TerminalShortcut["category"]
): TerminalShortcut[] => {
  return terminalShortcuts.filter((shortcut) => shortcut.category === category);
};

export const searchShortcuts = (keyword: string): TerminalShortcut[] => {
  const lowerKeyword = keyword.toLowerCase();
  return terminalShortcuts.filter(
    (shortcut) =>
      shortcut.key.toLowerCase().includes(lowerKeyword) ||
      shortcut.action.toLowerCase().includes(lowerKeyword) ||
      shortcut.description.toLowerCase().includes(lowerKeyword) ||
      (shortcut.tips && shortcut.tips.toLowerCase().includes(lowerKeyword)) ||
      shortcut.quizHint.toLowerCase().includes(lowerKeyword)
  );
};

// 퀴즈용 유틸리티 함수들
export const getRandomShortcut = (): TerminalShortcut => {
  const randomIndex = Math.floor(Math.random() * terminalShortcuts.length);
  return terminalShortcuts[randomIndex];
};

export const getRandomShortcutsByCategory = (
  category: TerminalShortcut["category"],
  count: number = 5
): TerminalShortcut[] => {
  const categoryShortcuts = getShortcutsByCategory(category);
  const shuffled = [...categoryShortcuts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, categoryShortcuts.length));
};

export const shuffleQuizOptions = (options: QuizOption[]): QuizOption[] => {
  return [...options].sort(() => 0.5 - Math.random());
};

// 퀴즈 난이도별 필터링 (어려운 단축키들을 별도로 선별)
export const getHardQuizShortcuts = (): TerminalShortcut[] => {
  // 헷갈리기 쉬운 어려운 단축키들만 선별
  const hardKeys = [
    "Ctrl + K",
    "Ctrl + U",
    "Alt + D",
    "Ctrl + W",
    "Ctrl + T",
    "Alt + T",
    "Ctrl + _",
    "Ctrl + O (Ctrl + R 후)",
    "Ctrl + G (Ctrl + R 후)",
    "Alt + .",
    "Ctrl + S",
    "Ctrl + Q",
    "Ctrl + X → Ctrl + E",
    "Ctrl + X → Ctrl + U",
  ];

  return terminalShortcuts.filter((shortcut) =>
    hardKeys.includes(shortcut.key)
  );
};

// 초급자용 쉬운 단축키들
export const getEasyQuizShortcuts = (): TerminalShortcut[] => {
  const easyKeys = [
    "Ctrl + A",
    "Ctrl + E",
    "Ctrl + B",
    "Ctrl + F",
    "Ctrl + L",
    "Ctrl + C",
    "Ctrl + P",
    "Ctrl + N",
    "Tab",
    "!!",
  ];

  return terminalShortcuts.filter((shortcut) =>
    easyKeys.includes(shortcut.key)
  );
};

// 퀴즈 결과 계산 함수 (힌트 사용 통계 포함)
export const calculateQuizStats = (
  results: QuizResult[]
): QuizStats & {
  hintsUsed: number;
  averageTime: number;
  hardestCategories: string[];
} => {
  const totalQuestions = results.length;
  const correctAnswers = results.filter((r) => r.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const accuracy =
    totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const hintsUsed = results.filter((r) => r.hintUsed).length;
  const averageTime =
    results.length > 0
      ? results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length
      : 0;

  const categoryStats: Record<string, { correct: number; total: number }> = {};

  results.forEach((result) => {
    const category = result.shortcut.category;
    if (!categoryStats[category]) {
      categoryStats[category] = { correct: 0, total: 0 };
    }
    categoryStats[category].total++;
    if (result.isCorrect) {
      categoryStats[category].correct++;
    }
  });

  // 가장 어려운 카테고리 찾기 (정답률이 낮은 순)
  const hardestCategories = Object.entries(categoryStats)
    .map(([category, stats]) => ({
      category,
      accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3)
    .map((item) => item.category);

  return {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    accuracy: Math.round(accuracy * 100) / 100,
    categoryStats,
    hintsUsed,
    averageTime: Math.round(averageTime * 100) / 100,
    hardestCategories,
  };
};

// 힌트 품질 평가 함수
export const getHintQuality = (
  shortcut: TerminalShortcut
): "easy" | "medium" | "hard" => {
  const hintLength = shortcut.quizHint.length;
  const hasMemoryTrick =
    shortcut.quizHint.includes("=") || shortcut.quizHint.includes("!");

  if (hintLength < 30 && hasMemoryTrick) return "easy";
  if (hintLength < 50) return "medium";
  return "hard";
};

// 개인화된 연습 추천 함수
export const getPersonalizedPractice = (
  results: QuizResult[]
): {
  weakCategories: string[];
  recommendedShortcuts: TerminalShortcut[];
  practiceLevel: "beginner" | "intermediate" | "advanced";
  recommendations: string[];
} => {
  const stats = calculateQuizStats(results);

  // 약한 카테고리 찾기
  const weakCategories = Object.entries(stats.categoryStats)
    .filter(
      ([, categoryStats]) =>
        categoryStats.total >= 3 &&
        categoryStats.correct / categoryStats.total < 0.7
    )
    .map(([category]) => category);

  // 추천 단축키 (틀린 것들 + 약한 카테고리)
  const incorrectShortcuts = results
    .filter((r) => !r.isCorrect)
    .map((r) => r.shortcut);

  const weakCategoryShortcuts = terminalShortcuts
    .filter((s) => weakCategories.includes(s.category))
    .slice(0, 5);

  const recommendedShortcuts = [
    ...incorrectShortcuts,
    ...weakCategoryShortcuts,
  ].slice(0, 10);

  // 실력 레벨 판정
  let practiceLevel: "beginner" | "intermediate" | "advanced" = "beginner";
  if (stats.accuracy >= 70 && stats.averageTime < 10) {
    practiceLevel = "intermediate";
  }
  if (
    stats.accuracy >= 85 &&
    stats.averageTime < 7 &&
    stats.hintsUsed / stats.totalQuestions < 0.3
  ) {
    practiceLevel = "advanced";
  }

  // 개인화된 추천사항
  const recommendations: string[] = [];

  if (stats.accuracy < 50) {
    recommendations.push("기본 단축키부터 차근차근 연습해보세요.");
    recommendations.push("힌트를 적극 활용하여 단축키의 의미를 이해하세요.");
  } else if (stats.accuracy < 70) {
    recommendations.push("좋은 진전이에요! 틀린 문제들을 다시 복습해보세요.");
    recommendations.push("카테고리별로 집중 연습을 해보세요.");
  } else if (stats.accuracy < 85) {
    recommendations.push("상당한 실력이에요! 어려운 단축키에 도전해보세요.");
    recommendations.push("힌트 없이 문제를 풀어보세요.");
  } else {
    recommendations.push(
      "훌륭한 실력입니다! 고급 단축키 조합을 마스터해보세요."
    );
    recommendations.push("다른 사람들에게 단축키를 가르쳐보세요.");
  }

  if (stats.averageTime > 15) {
    recommendations.push("속도를 높이기 위해 반복 연습을 해보세요.");
  }

  if (stats.hintsUsed / stats.totalQuestions > 0.7) {
    recommendations.push("힌트 의존도를 줄이고 기억력을 향상시켜보세요.");
  }

  return {
    weakCategories,
    recommendedShortcuts,
    practiceLevel,
    recommendations,
  };
};

// 퀴즈 세션 생성 함수
export const createQuizSession = (
  difficulty: "easy" | "medium" | "hard" | "mixed" = "mixed",
  category?: TerminalShortcut["category"],
  count: number = 10
): TerminalShortcut[] => {
  let availableShortcuts: TerminalShortcut[];

  // 카테고리 필터링
  if (category) {
    availableShortcuts = getShortcutsByCategory(category);
  } else {
    availableShortcuts = [...terminalShortcuts];
  }

  // 난이도별 필터링
  switch (difficulty) {
    case "easy":
      availableShortcuts = availableShortcuts.filter((s) =>
        getEasyQuizShortcuts().some((easy) => easy.key === s.key)
      );
      break;
    case "hard":
      availableShortcuts = availableShortcuts.filter((s) =>
        getHardQuizShortcuts().some((hard) => hard.key === s.key)
      );
      break;
    case "medium":
      const easyKeys = getEasyQuizShortcuts().map((s) => s.key);
      const hardKeys = getHardQuizShortcuts().map((s) => s.key);
      availableShortcuts = availableShortcuts.filter(
        (s) => !easyKeys.includes(s.key) && !hardKeys.includes(s.key)
      );
      break;
    case "mixed":
    default:
      // 모든 단축키 사용
      break;
  }

  // 랜덤하게 섞고 요청된 개수만큼 반환
  const shuffled = [...availableShortcuts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// 스트릭(연속 정답) 계산 함수
export const calculateStreak = (
  results: QuizResult[]
): {
  currentStreak: number;
  maxStreak: number;
  streakHistory: number[];
} => {
  let currentStreak = 0;
  let maxStreak = 0;
  const streakHistory: number[] = [];
  let tempStreak = 0;

  // 역순으로 확인하여 현재 스트릭 계산
  for (let i = results.length - 1; i >= 0; i--) {
    if (results[i].isCorrect) {
      currentStreak++;
    } else {
      break;
    }
  }

  // 전체 기록에서 최대 스트릭과 스트릭 히스토리 계산
  results.forEach((result) => {
    if (result.isCorrect) {
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      if (tempStreak > 0) {
        streakHistory.push(tempStreak);
      }
      tempStreak = 0;
    }
  });

  // 마지막 스트릭이 진행중이면 추가
  if (tempStreak > 0) {
    streakHistory.push(tempStreak);
  }

  return {
    currentStreak,
    maxStreak,
    streakHistory,
  };
};

// 학습 진도 추적 함수
export const trackLearningProgress = (
  results: QuizResult[]
): {
  masteredShortcuts: TerminalShortcut[];
  strugglingShortcuts: TerminalShortcut[];
  progressPercentage: number;
} => {
  const shortcutStats = new Map<
    string,
    { correct: number; total: number; shortcut: TerminalShortcut }
  >();

  results.forEach((result) => {
    const key = result.shortcut.key;
    if (!shortcutStats.has(key)) {
      shortcutStats.set(key, {
        correct: 0,
        total: 0,
        shortcut: result.shortcut,
      });
    }
    const stats = shortcutStats.get(key)!;
    stats.total++;
    if (result.isCorrect) {
      stats.correct++;
    }
  });

  const masteredShortcuts: TerminalShortcut[] = [];
  const strugglingShortcuts: TerminalShortcut[] = [];

  shortcutStats.forEach((stats) => {
    const accuracy = stats.correct / stats.total;
    if (stats.total >= 3) {
      if (accuracy >= 0.8) {
        masteredShortcuts.push(stats.shortcut);
      } else if (accuracy < 0.5) {
        strugglingShortcuts.push(stats.shortcut);
      }
    }
  });

  const progressPercentage =
    (masteredShortcuts.length / terminalShortcuts.length) * 100;

  return {
    masteredShortcuts,
    strugglingShortcuts,
    progressPercentage: Math.round(progressPercentage * 100) / 100,
  };
};

export type { QuizResult, QuizStats };
