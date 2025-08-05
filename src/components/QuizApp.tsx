'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useQuizStore } from '../stores/quizStore'
import { HomePage } from './HomePage'
import { QuizPage } from './QuizPage'
import { ResultPage } from './ResultPage'

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
}

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const, 
  duration: 0.5
}

export function QuizApp() {
  const currentPage = useQuizStore(state => state.currentPage)

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'quiz':
        return <QuizPage />
      case 'result':
        return <ResultPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}