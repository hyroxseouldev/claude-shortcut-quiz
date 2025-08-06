"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  useQuizStore,
  useCurrentQuestion,
  useQuizProgress,
} from "../stores/quizStore";
import {
  Lightbulb,
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Keyboard,
  Sparkles,
} from "lucide-react";

export function QuizPage() {
  const {
    hintUsed,
    feedback,
    answerQuestion,
    useHint: triggerHint,
    nextQuestion,
    resetQuiz,
  } = useQuizStore();

  const currentQuestion = useCurrentQuestion();
  const progress = useQuizProgress();
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // 피드백 후 자동으로 다음 문제로 넘어가기
  useEffect(() => {
    if (feedback.type !== null) {
      const timer = setTimeout(() => {
        nextQuestion();
        setSelectedAnswer(null);
        setShowHint(false);
      }, 1500); // 1.5초 후 자동 전환

      return () => clearTimeout(timer);
    }
  }, [feedback.type, nextQuestion]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-red-950">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">
              문제를 불러오는 중 오류가 발생했습니다.
            </p>
            <Button onClick={resetQuiz} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAnswerClick = (optionIndex: number) => {
    if (feedback.type !== null) return; // 이미 답변한 경우 클릭 방지

    setSelectedAnswer(optionIndex);
    answerQuestion(optionIndex);
  };

  const handleHintClick = () => {
    if (!hintUsed) {
      triggerHint();
      setShowHint(true);
    }
  };

  // 카테고리 아이콘 매핑
  const categoryIcons: Record<string, string> = {
    cursor: "🚀",
    edit: "✏️",
    history: "📚",
    control: "🛠️",
    advanced: "💡",
  };

  return (
    <div className="min-h-screen bg-background/80 dark:bg-background/80">
      <div className="container mx-auto px-4 py-6">
        {/* 상단 바 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Button
            variant="ghost"
            onClick={resetQuiz}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로
          </Button>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              {categoryIcons[currentQuestion.category]}{" "}
              {currentQuestion.category}
            </Badge>
            <div className="text-sm text-muted-foreground">
              <Clock className="w-4 h-4 inline mr-1" />
              {progress.current} / {progress.total}
            </div>
          </div>
        </motion.div>

        {/* 진행률 바 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              진행률
            </span>
            <span className="text-sm text-muted-foreground/80">
              {Math.round(progress.percentage)}%
            </span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
        </motion.div>

        {/* 문제 카드 */}
        <motion.div
          key={currentQuestion.key}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-card/90 backdrop-blur-sm border-border shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Keyboard className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl md:text-2xl text-foreground">
                  다음 단축키의 기능은?
                </CardTitle>
              </div>

              {/* 단축키 표시 */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-muted rounded-lg p-6 mb-4 border border-border"
              >
                <code className="text-2xl md:text-3xl font-mono font-bold text-primary">
                  {currentQuestion.key}
                </code>
              </motion.div>

              {/* 카테고리 설명
              <CardDescription className="text-base text-muted-foreground">
                {currentQuestion.description && (
                  <span className="text-sm italic">
                    {currentQuestion.description}
                  </span>
                )}
              </CardDescription> */}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 힌트 섹션 */}
              <div className="flex justify-center">
                <AnimatePresence>
                  {!showHint ? (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        variant={hintUsed ? "secondary" : "outline"}
                        onClick={handleHintClick}
                        disabled={hintUsed}
                        className="bg-accent/20 border-accent/40 hover:bg-accent/30"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        {hintUsed ? "힌트 사용됨" : "힌트 보기"}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <Alert className="max-w-md bg-accent/20 border-accent/40">
                        <Sparkles className="h-4 w-4 text-accent-foreground" />
                        <AlertDescription className="text-accent-foreground font-medium">
                          💡 {currentQuestion.quizHint}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 선택지들 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.quizOptions.map((option, index: number) => {
                  let buttonVariant:
                    | "default"
                    | "outline"
                    | "destructive"
                    | "secondary" = "outline";
                  let buttonClass =
                    "h-auto p-4 text-left justify-start border-2 transition-all duration-200";
                  let iconElement = null;

                  // 피드백 상태에 따른 스타일링
                  if (feedback.type !== null) {
                    if (option.isCorrect) {
                      buttonVariant = "default";
                      buttonClass +=
                        " bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200";
                      iconElement = (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      );
                    } else if (selectedAnswer === index) {
                      buttonVariant = "destructive";
                      buttonClass +=
                        " bg-destructive/20 border-destructive text-destructive-foreground";
                      iconElement = (
                        <XCircle className="w-5 h-5 text-destructive" />
                      );
                    } else {
                      buttonClass += " opacity-60";
                    }
                  } else {
                    buttonClass +=
                      " hover:border-primary/50 hover:bg-primary/5";
                  }

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={feedback.type === null ? { scale: 1.02 } : {}}
                      whileTap={feedback.type === null ? { scale: 0.98 } : {}}
                    >
                      <Button
                        variant={buttonVariant}
                        onClick={() => handleAnswerClick(index)}
                        disabled={feedback.type !== null}
                        className={buttonClass}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-base font-medium text-left">
                            {option.text}
                          </span>
                          {iconElement}
                        </div>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>

              {/* 피드백 메시지 */}
              <AnimatePresence>
                {feedback.type !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center pt-4"
                  >
                    {feedback.type === "correct" ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-lg font-semibold">
                          정답입니다! 🎉
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-destructive">
                        <XCircle className="w-6 h-6" />
                        <span className="text-lg font-semibold">
                          아쉽네요! 다음엔 맞춰보세요 💪
                        </span>
                      </div>
                    )}

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm text-muted-foreground mt-2"
                    >
                      잠시 후 다음 문제로 넘어갑니다...
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
