"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { useQuizStore } from "../stores/quizStore";
import { getCategories } from "../quizUtil";
import { Play, Trophy, Zap, BookOpen } from "lucide-react";

export function HomePage() {
  const { settings, updateSettings, startQuiz } = useQuizStore();
  const categories = getCategories();

  const handleQuestionCountChange = (value: string) => {
    updateSettings({ questionCount: parseInt(value) });
  };

  const handleDifficultyChange = (value: string) => {
    updateSettings({
      difficulty: value as "easy" | "medium" | "hard" | "mixed",
    });
  };

  const handleCategoryChange = (value: string) => {
    updateSettings({
      category:
        value === "all"
          ? undefined
          : (value as "cursor" | "edit" | "history" | "control" | "advanced"),
    });
  };

  const difficultyOptions = [
    { value: "mixed", label: "혼합", description: "모든 난이도" },
    { value: "easy", label: "초급", description: "기본 단축키" },
    { value: "medium", label: "중급", description: "일반적인 단축키" },
    { value: "hard", label: "고급", description: "고급 단축키" },
  ];

  return (
    <div className="min-h-screen bg-background/80 dark:bg-background/80">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* 헤더 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex justify-center items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  delay: 1,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Zap className="w-12 h-12 text-primary" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary">
                클로드 퀴즈
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              터미널 단축키를 재미있게 학습하세요! 🚀
            </motion.p>

            {/* 통계 카드들 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="bg-card/60 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    총 문제
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">40+</p>
              </div>

              <div className="bg-card/60 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 justify-center">
                  <Trophy className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    카테고리
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">5개</p>
              </div>

              <div className="bg-card/60 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-muted-foreground">
                    난이도
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">3단계</p>
              </div>
            </motion.div>
          </motion.div>

          {/* 퀴즈 설정 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">
                  퀴즈 설정
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  원하는 설정을 선택하고 퀴즈를 시작하세요
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* 문제 개수 선택 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">
                    문제 개수
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[10, 20, 30].map((count) => (
                      <motion.div
                        key={count}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={
                            settings.questionCount === count
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            handleQuestionCountChange(count.toString())
                          }
                          className="w-full h-12 text-base font-medium"
                        >
                          {count}문제
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 난이도 선택 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">
                    난이도
                  </label>
                  <Select
                    value={settings.difficulty}
                    onValueChange={handleDifficultyChange}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{option.label}</span>
                            <Badge variant="secondary" className="text-xs">
                              {option.description}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 카테고리 선택 */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">
                    카테고리 (선택사항)
                  </label>
                  <Select
                    value={settings.category || "all"}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">전체</span>
                          <Badge variant="secondary" className="text-xs">
                            모든 카테고리
                          </Badge>
                        </div>
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          <div className="flex items-center gap-2">
                            <span>{category.icon}</span>
                            <span className="font-medium">
                              {category.displayName}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 시작 버튼 */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button
                    onClick={startQuiz}
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    퀴즈 시작!
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 푸터 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground">
              터미널 마스터가 되어보세요! 💪
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
