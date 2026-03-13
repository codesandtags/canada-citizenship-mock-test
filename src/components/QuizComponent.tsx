"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, CheckCircle, XCircle, AlertCircle, RefreshCcw, Home } from 'lucide-react'
import { MockExamType } from '@/lib/mocks'
import { saveQuizAction } from '@/app/actions/save-quiz'

interface QuizComponentProps {
  mockExam: MockExamType;
}

export default function QuizComponent({ mockExam }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Timer state (30 minutes = 1800 seconds)
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    if (quizFinished || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, quizFinished]);

  // Handle auto-submit if timer runs out
  useEffect(() => {
    if (timeLeft <= 0 && !quizFinished) {
      setQuizFinished(true);
    }
  }, [timeLeft, quizFinished]);

  // Save the result when the quiz finishes
  useEffect(() => {
    if (quizFinished) {
      // Calculate final score since userAnswers might not have been fully evaluated in render yet
      const finalScore = userAnswers.reduce((total: number, answer, index) => {
        return answer === mockExam.questions[index].correctAnswer ? total + 1 : total
      }, 0)
      const isPassed = finalScore >= 15

      saveQuizAction({
        score: finalScore,
        total: mockExam.questions.length,
        passed: isPassed,
        answers: userAnswers.map(a => a ?? -1),
        mockExamId: mockExam.id
      }).catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizFinished]);

  const handleSelectAnswer = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setIsAnswerSubmitted(true);

    // Track user's answer
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setQuizFinished(false);
    setTimeLeft(30 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = mockExam.questions[currentQuestionIndex];

  const score = userAnswers.reduce((total: number, answer, index) => {
    return answer === mockExam.questions[index].correctAnswer ? total + 1 : total
  }, 0)

  const passed = score >= 15 // 15 out of 20 to pass (75%)

  if (quizFinished) {
    return (
      <div className="w-full">
        <div className="max-w-3xl mx-auto p-8 sm:p-12 bg-white rounded-3xl shadow-xl border border-gray-100 mt-8 mb-8 text-center flex flex-col items-center">
          <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tight text-balance">
            {mockExam.title} Completed!
          </h2>
          <div className={`p-8 sm:p-10 rounded-full border-8 ${passed ? 'border-green-500 text-green-600 bg-green-50' : 'border-red-500 text-red-600 bg-red-50'} shadow-inner mb-6`}>
             <div className="text-5xl sm:text-6xl font-extrabold">{score} <span className="text-3xl text-gray-400">/ {mockExam.questions.length}</span></div>
          </div>

          <p className="text-xl sm:text-2xl font-medium text-gray-700 max-w-lg text-center mb-8">
            {passed ? "Congratulations! You passed the mock test." : "You didn't pass this time. Review your answers below and keep studying!"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-lg">
            <button
              onClick={handleRestartQuiz}
              className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <RefreshCcw className="w-5 h-5" />
              <span>Retake Mock Exam</span>
            </button>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 font-bold rounded-xl transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-xl flex items-center gap-2 font-bold px-4 mb-6 text-gray-800">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Detailed Review Breakdown
          </h3>
          <div className="space-y-6">
            {mockExam.questions.map((question, idx) => {
              const userAnswerIndex = userAnswers[idx];
              const isCorrect = userAnswerIndex === question.correctAnswer;

              return (
                <div key={question.id} className="p-6 md:p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="mt-1 flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Question {idx + 1}</span>
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">{question.text}</h4>
                    </div>
                  </div>

                  <div className="ml-9 space-y-4">
                    {/* User's Incorrect Output (Only show if they got it wrong) */}
                    {!isCorrect && userAnswerIndex !== null && userAnswerIndex !== undefined && (
                      <div className="p-3 md:p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                         <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                         <div>
                           <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Your Answer</p>
                           <p className="text-red-900 font-medium">{question.options[userAnswerIndex]}</p>
                         </div>
                      </div>
                    )}

                    {/* Correct Output */}
                    <div className="p-3 md:p-4 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3">
                       <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"/>
                       <div>
                         <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Correct Answer</p>
                         <p className="text-green-900 font-medium">{question.options[question.correctAnswer]}</p>
                       </div>
                    </div>

                    {/* Explanation and Reference */}
                     <div className="mt-4 p-4 md:p-5 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 space-y-3">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Explanation</p>
                          <p className="leading-relaxed">{question.explanation}</p>
                        </div>

                        {question.reference && (
                          <div className="pt-3 border-t border-gray-200">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Source Reference</p>
                            <a href="#" className="text-sm text-red-600 hover:text-red-700 hover:underline font-medium inline-flex items-center gap-1">
                              {question.reference}
                            </a>
                          </div>
                        )}
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
        <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{mockExam.title}</h2>
              <p className="text-gray-500 font-medium mt-1">Question {currentQuestionIndex + 1} of {mockExam.questions.length}</p>
            </div>
        <div className={`flex items-center space-x-2 text-xl font-bold px-5 py-3 rounded-xl shadow-sm border
           ${timeLeft < 300 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-gray-50 text-gray-700 border-gray-200'}
        `}>
          <Clock className="w-6 h-6" />
          <span className="tabular-nums">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question section */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 leading-snug">{currentQuestion.text}</h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = currentQuestion.correctAnswer === index;

            let optionStyles = "border-2 border-gray-200 hover:border-red-300 hover:bg-red-50/50 bg-white cursor-pointer text-gray-700";

            if (isSelected && !isAnswerSubmitted) {
              optionStyles = "border-red-600 bg-red-50 text-red-900 ring-2 ring-red-600/20";
            } else if (isAnswerSubmitted) {
              if (isCorrect) {
                optionStyles = "border-green-500 bg-green-50 text-green-900 cursor-default shadow-sm ring-2 ring-green-500/20";
              } else if (isSelected && !isCorrect) {
                optionStyles = "border-red-500 bg-red-50 text-red-900 cursor-default opacity-80";
              } else {
                optionStyles = "border-gray-200 bg-gray-50 text-gray-400 cursor-default opacity-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswerSubmitted}
                className={`w-full text-left p-5 rounded-xl flex items-center justify-between transition-all duration-200 group ${optionStyles}`}
              >
                <div className="flex items-center space-x-4 flex-1">
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0
                     ${isSelected && !isAnswerSubmitted ? 'border-red-600 bg-red-600' :
                       isAnswerSubmitted && isCorrect ? 'border-green-500 bg-green-500' :
                       isAnswerSubmitted && isSelected && !isCorrect ? 'border-red-500 bg-red-500' :
                       'border-gray-300 group-hover:border-red-400'}`}>
                     {(isSelected || (isAnswerSubmitted && isCorrect)) && <div className="w-2 h-2 rounded-full bg-white" />}
                   </div>
                   <span className="text-base sm:text-lg font-medium pr-4">{option}</span>
                </div>

                {isAnswerSubmitted && isCorrect && <CheckCircle className="w-7 h-7 text-green-500 flex-shrink-0" />}
                {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-7 h-7 text-red-500 flex-shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Feedback & Actions section */}
      <div className="border-t border-gray-100 pt-8 min-h-[140px]">
        {isAnswerSubmitted ? (
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className={`flex-1 p-5 rounded-xl flex gap-4 items-start shadow-sm
               ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50/80 text-green-800 border border-green-200' : 'bg-red-50/80 text-red-800 border border-red-200'}`}>
              <AlertCircle className={`w-7 h-7 flex-shrink-0 mt-0.5 ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-600' : 'text-red-600'}`} />
              <div>
                <h4 className={`font-bold text-lg mb-1 ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                </h4>
                <p className="text-base leading-relaxed opacity-90">{currentQuestion.explanation}</p>
              </div>
            </div>
            <button
              onClick={handleNextQuestion}
              className="w-full md:w-auto px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap"
            >
              {currentQuestionIndex < mockExam.questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`w-full md:w-auto px-8 py-4 font-bold rounded-xl transition-all duration-300 shadow-sm
                ${selectedAnswer === null
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-md transform hover:-translate-y-0.5'
                }`}
            >
              Submit Answer
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
