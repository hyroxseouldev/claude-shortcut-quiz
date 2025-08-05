import { create } from 'zustand'
import { QuizResult } from '../quizUtil'
import { TerminalShortcut } from '../quizData'
import { createQuizSession } from '../quizUtil'

// 페이지 타입 정의
export type PageType = 'home' | 'quiz' | 'result'

// 피드백 상태 타입
export type FeedbackState = {
  type: 'correct' | 'incorrect' | null
  correctAnswerIndex?: number
  selectedAnswerIndex?: number
}

// 퀴즈 설정 인터페이스
interface QuizSettings {
  questionCount: number
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  category?: TerminalShortcut['category']
}

// 선택지가 섞인 터미널 단축키 인터페이스
interface ShuffledTerminalShortcut extends Omit<TerminalShortcut, 'quizOptions'> {
  quizOptions: TerminalShortcut['quizOptions']
  correctAnswerIndex: number // 섞인 후의 정답 인덱스
}

// 퀴즈 상태 인터페이스
interface QuizStore {
  // 현재 페이지
  currentPage: PageType
  
  // 퀴즈 설정
  settings: QuizSettings
  
  // 퀴즈 진행 상태
  currentSession: ShuffledTerminalShortcut[]
  currentQuestionIndex: number
  questionStartTime: number
  hintUsed: boolean
  results: QuizResult[]
  
  // UI 상태
  feedback: FeedbackState
  isLoading: boolean
  
  // 액션들
  setPage: (page: PageType) => void
  updateSettings: (settings: Partial<QuizSettings>) => void
  shuffleQuizOptions: (question: TerminalShortcut) => ShuffledTerminalShortcut
  startQuiz: () => void
  answerQuestion: (selectedOptionIndex: number) => void
  useHint: () => void
  nextQuestion: () => void
  finishQuiz: () => void
  resetQuiz: () => void
  clearFeedback: () => void
}

// 초기 상태
const initialState = {
  currentPage: 'home' as PageType,
  settings: {
    questionCount: 10,
    difficulty: 'mixed' as const,
    category: undefined,
  },
  currentSession: [],
  currentQuestionIndex: 0,
  questionStartTime: 0,
  hintUsed: false,
  results: [],
  feedback: { type: null } as FeedbackState,
  isLoading: false,
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  ...initialState,

  // 페이지 변경
  setPage: (page) => set({ currentPage: page }),

  // 퀴즈 설정 업데이트
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  // 선택지를 섞고 정답 인덱스를 추적하는 함수
  shuffleQuizOptions: (question: TerminalShortcut): ShuffledTerminalShortcut => {
    const originalOptions = [...question.quizOptions]
    
    // Fisher-Yates 셔플 알고리즘 사용
    const shuffledOptions = [...originalOptions]
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]]
    }
    
    // 섞인 후 정답의 새로운 인덱스 찾기
    const newCorrectIndex = shuffledOptions.findIndex(option => option.isCorrect)
    
    return {
      ...question,
      quizOptions: shuffledOptions,
      correctAnswerIndex: newCorrectIndex
    }
  },

  // 퀴즈 시작
  startQuiz: () => {
    const { settings, shuffleQuizOptions } = get()
    const originalSession = createQuizSession(
      settings.difficulty,
      settings.category,
      settings.questionCount
    )
    
    // 각 문제의 선택지를 섞기
    const shuffledSession = originalSession.map(question => shuffleQuizOptions(question))
    
    set({
      currentPage: 'quiz',
      currentSession: shuffledSession,
      currentQuestionIndex: 0,
      questionStartTime: Date.now(),
      hintUsed: false,
      results: [],
      feedback: { type: null },
      isLoading: false,
    })
  },

  // 문제 답안 제출
  answerQuestion: (selectedOptionIndex) => {
    const state = get()
    const currentQuestion = state.currentSession[state.currentQuestionIndex]
    const selectedOption = currentQuestion.quizOptions[selectedOptionIndex]
    const correctAnswerIndex = currentQuestion.correctAnswerIndex // 이미 계산된 정답 인덱스 사용
    const timeSpent = (Date.now() - state.questionStartTime) / 1000

    // 결과 생성 (원본 shortcut 객체 사용)
    const result: QuizResult = {
      shortcut: {
        key: currentQuestion.key,
        action: currentQuestion.action,
        description: currentQuestion.description,
        tips: currentQuestion.tips,
        category: currentQuestion.category,
        categoryIcon: currentQuestion.categoryIcon,
        quizOptions: currentQuestion.quizOptions,
        quizHint: currentQuestion.quizHint,
      },
      isCorrect: selectedOption.isCorrect,
      hintUsed: state.hintUsed,
      timeSpent,
    }

    // 피드백 상태 설정
    const feedback: FeedbackState = {
      type: selectedOption.isCorrect ? 'correct' : 'incorrect',
      correctAnswerIndex,
      selectedAnswerIndex: selectedOptionIndex,
    }

    set((state) => ({
      results: [...state.results, result],
      feedback,
    }))
  },

  // 힌트 사용
  useHint: () => set({ hintUsed: true }),

  // 다음 문제로 이동
  nextQuestion: () => {
    const state = get()
    const nextIndex = state.currentQuestionIndex + 1
    
    if (nextIndex >= state.currentSession.length) {
      // 퀴즈 완료
      set({
        currentPage: 'result',
        feedback: { type: null },
      })
    } else {
      // 다음 문제로
      set({
        currentQuestionIndex: nextIndex,
        questionStartTime: Date.now(),
        hintUsed: false,
        feedback: { type: null },
      })
    }
  },

  // 퀴즈 완료
  finishQuiz: () => {
    set({
      currentPage: 'result',
      feedback: { type: null },
    })
  },

  // 퀴즈 초기화 (홈으로 돌아가기)
  resetQuiz: () => set({
    ...initialState,
    settings: get().settings, // 설정은 유지
  }),

  // 피드백 상태 초기화
  clearFeedback: () => set({ feedback: { type: null } }),
}))

// 현재 질문 가져오기 (선택자)
export const useCurrentQuestion = () => {
  const { currentSession, currentQuestionIndex } = useQuizStore()
  return currentSession[currentQuestionIndex] || null
}

// 진행률 계산 (선택자)
export const useQuizProgress = () => {
  const { currentQuestionIndex, currentSession } = useQuizStore()
  return {
    current: currentQuestionIndex + 1,
    total: currentSession.length,
    percentage: currentSession.length > 0 ? 
      ((currentQuestionIndex + 1) / currentSession.length) * 100 : 0
  }
}