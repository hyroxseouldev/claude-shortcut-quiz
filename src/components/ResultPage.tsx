'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { useQuizStore } from '../stores/quizStore'
import { calculateQuizStats, getCategories, trackLearningProgress } from '../quizUtil'
import { 
  Trophy, 
  Medal, 
  Target, 
  Clock, 
  Lightbulb, 
  Home, 
  RotateCcw, 
  TrendingUp,
  Star
} from 'lucide-react'

export function ResultPage() {
  const { results, resetQuiz, startQuiz } = useQuizStore()
  const categories = getCategories()

  // 통계 계산
  const stats = useMemo(() => calculateQuizStats(results), [results])
  const learningProgress = useMemo(() => trackLearningProgress(results), [results])

  // 점수에 따른 등급과 메시지
  const getGradeInfo = (accuracy: number) => {
    if (accuracy >= 90) return {
      grade: 'S',
      title: '완벽해요! 🏆',
      message: '터미널 마스터입니다! 정말 대단해요!',
      color: 'from-yellow-400 to-orange-500',
      emoji: '🌟'
    }
    if (accuracy >= 80) return {
      grade: 'A',
      title: '훌륭해요! 🎉',
      message: '상당한 실력이에요! 조금만 더 힘내세요!',
      color: 'from-green-400 to-blue-500',
      emoji: '🎯'
    }
    if (accuracy >= 70) return {
      grade: 'B',
      title: '좋아요! 👍',
      message: '좋은 진전이에요! 계속 연습해보세요!',
      color: 'from-blue-400 to-purple-500',
      emoji: '💪'
    }
    if (accuracy >= 60) return {
      grade: 'C',
      title: '괜찮아요! 📚',
      message: '기본기를 더 다져보세요!',
      color: 'from-purple-400 to-pink-500',
      emoji: '📖'
    }
    return {
      grade: 'D',
      title: '화이팅! 🌱',
      message: '처음이니까 괜찮아요! 다시 도전해보세요!',
      color: 'from-pink-400 to-red-500',
      emoji: '🚀'
    }
  }

  const gradeInfo = getGradeInfo(stats.accuracy)

  // 카테고리 통계 변환
  const categoryStatsArray = Object.entries(stats.categoryStats).map(([categoryName, categoryStats]) => {
    const category = categories.find(c => c.name === categoryName)
    return {
      name: categoryName,
      displayName: category?.displayName || categoryName,
      icon: category?.icon || '📝',
      correct: categoryStats.correct,
      total: categoryStats.total,
      accuracy: categoryStats.total > 0 ? (categoryStats.correct / categoryStats.total) * 100 : 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* 메인 결과 카드 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="text-center mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader className="pb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-4"
                >
                  <div className={`bg-gradient-to-r ${gradeInfo.color} text-white text-6xl font-bold rounded-full w-24 h-24 flex items-center justify-center shadow-lg`}>
                    {gradeInfo.grade}
                  </div>
                </motion.div>
                
                <CardTitle className="text-3xl mb-2 text-gray-900 dark:text-white">
                  {gradeInfo.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                  {gradeInfo.message} {gradeInfo.emoji}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* 점수 표시 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6">
                    <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {stats.correctAnswers}/{stats.totalQuestions}
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">정답 수</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6">
                    <Target className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {stats.accuracy.toFixed(1)}%
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">정답률</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6">
                    <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {stats.averageTime.toFixed(1)}초
                    </p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">평균 시간</p>
                  </div>
                </motion.div>

                {/* 추가 통계 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        힌트 사용: {stats.hintsUsed}회
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        전체 문제의 {((stats.hintsUsed / stats.totalQuestions) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        학습 진도: {learningProgress.progressPercentage.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        마스터한 단축키: {learningProgress.masteredShortcuts.length}개
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 카테고리별 결과 */}
          {categoryStatsArray.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mb-8"
            >
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Medal className="w-6 h-6 text-orange-600" />
                    카테고리별 성과
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryStatsArray.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {category.displayName}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {category.correct}/{category.total} 정답
                            </p>
                          </div>
                        </div>
                        <Progress 
                          value={category.accuracy} 
                          className="h-2 mb-2"
                        />
                        <div className="flex justify-between items-center">
                          <Badge 
                            variant={category.accuracy >= 80 ? "default" : category.accuracy >= 60 ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {category.accuracy.toFixed(0)}%
                          </Badge>
                          {category.accuracy >= 80 && (
                            <Star className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* 액션 버튼들 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={startQuiz}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                다시 도전하기
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={resetQuiz}
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Home className="w-5 h-5 mr-2" />
                홈으로 돌아가기
              </Button>
            </motion.div>
          </motion.div>

          {/* 격려 메시지 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stats.accuracy >= 80 
                ? "계속해서 더 많은 단축키를 마스터해보세요! 🌟" 
                : "포기하지 마세요! 연습하면 반드시 늘어요! 💫"
              }
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}