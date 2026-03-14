"use client"

import React, { useState, useEffect, useCallback } from 'react'
import confetti from 'canvas-confetti'
import Link from 'next/link'
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCcw,
  Home,
  ArrowRight,
  PlayCircle,
  Lock,
  ShieldCheck,
  Target,
  BookOpen
} from 'lucide-react'
import { saveQuizAction } from '@/app/actions/save-quiz'

// Enhanced types for V0.0.6
export interface QuestionType {
  id: string | number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category?: string;
  reference?: string;
}

export interface MockExamType {
  id: string;
  title: string;
  description: string;
  questions: QuestionType[];
}

interface QuizComponentProps {
  mockExam: MockExamType;
  userId?: string;
  isReviewMode?: boolean;
  userAnswers?: number[];
  score?: number;
}

export default function QuizComponent({
  mockExam,
  userId,
  isReviewMode = false,
  userAnswers: initialUserAnswers,
  score: initialScore
}: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(initialUserAnswers || []);
  const [quizFinished, setQuizFinished] = useState(isReviewMode);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Timer state (30 minutes = 1800 seconds)
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  const score = isReviewMode ? (initialScore ?? 0) : userAnswers.reduce((total: number, answer, index) => {
    return answer === mockExam.questions[index].correctAnswer ? total + 1 : total
  }, 0)

  const passed = score >= 15 // 15 out of 20 to pass (75%)

  useEffect(() => {
    if (quizFinished || isReviewMode || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, quizFinished, isReviewMode]);

  // Handle auto-submit if timer runs out
  useEffect(() => {
    if (timeLeft <= 0 && !quizFinished && !isReviewMode) {
      setQuizFinished(true);
    }
  }, [timeLeft, quizFinished, isReviewMode]);

  // Save the result when the quiz finishes (only if not in review mode)
  useEffect(() => {
    if (quizFinished && !isReviewMode && userId) {
      const finalScore = userAnswers.reduce((total: number, answer, index) => {
        return answer === mockExam.questions[index].correctAnswer ? total + 1 : total
      }, 0)
      const isPassed = finalScore >= 15

      setIsSaving(true);
      saveQuizAction({
        score: finalScore,
        total: mockExam.questions.length,
        passed: isPassed,
        answers: userAnswers.map(a => a ?? -1),
        mockExamId: mockExam.id
      })
      .then(res => {
        if (!res.success) setSaveError(res.error || 'Failed to save');
      })
      .catch(() => setSaveError('Failed to save result'))
      .finally(() => setIsSaving(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizFinished, isReviewMode, userId]);

  // Confetti effect when the user passes
  const fireConfetti = useCallback(() => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF0000', '#FFFFFF', '#FF4444', '#CC0000'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF0000', '#FFFFFF', '#FF4444', '#CC0000'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  useEffect(() => {
    if (quizFinished && !isReviewMode && passed) {
      fireConfetti();
    }
  }, [quizFinished, isReviewMode, passed, fireConfetti]);

  const handleSelectAnswer = (index: number) => {
    if (!isAnswerSubmitted && !isReviewMode) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isReviewMode) return;

    setIsAnswerSubmitted(true);

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
    setSaveError(null);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = mockExam.questions[currentQuestionIndex];


  if (quizFinished) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 tracking-tight text-balance">
              {isReviewMode ? 'Result Review' : `${mockExam.title} Completed!`}
            </h2>

            <div className={`p-8 sm:p-10 rounded-full border-8 ${passed ? 'border-green-500 text-green-600 bg-green-50' : 'border-red-500 text-red-600 bg-red-50'} shadow-inner mb-6 relative group transition-transform hover:scale-105`}>
               <div className="text-5xl sm:text-6xl font-extrabold">{score} <span className="text-3xl text-gray-400">/ {mockExam.questions.length}</span></div>
               {passed && (
                 <div className="absolute -top-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                   <CheckCircle className="w-6 h-6" />
                 </div>
               )}
            </div>

            <p className="text-xl sm:text-2xl font-medium text-gray-700 max-w-lg text-center mb-10">
              {passed ? "Congratulations! You passed the mock test." : "You didn't pass this time. Review your answers below and keep studying!"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-lg">
              {!isReviewMode && (
                <button
                  onClick={handleRestartQuiz}
                  className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <RefreshCcw className="w-5 h-5" />
                  <span>Retake Exam</span>
                </button>
              )}
              <Link
                href={userId ? "/dashboard" : "/"}
                className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 font-bold rounded-xl transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <Home className="w-5 h-5" />
                <span>{userId ? 'Go to Dashboard' : 'Go Home'}</span>
              </Link>
            </div>

            {saveError && (
               <p className="text-red-600 mt-6 font-medium flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
                 <AlertCircle className="w-5 h-5" /> {saveError}
               </p>
            )}
          </div>

          {/* Guest CTA Section */}
          {!userId && !isReviewMode && (
            <div className="bg-gray-50 border-t border-gray-100 p-8 sm:p-12">
              <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 shadow-xl text-left relative overflow-hidden group">
                  {/* Decorative background element */}
                  <div className="absolute -right-10 -bottom-10 text-white/10 rotate-12 transition-transform group-hover:scale-110 pointer-events-none">
                    <ShieldCheck className="w-48 h-48" />
                  </div>

                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider mb-4">
                      <Target className="w-3 h-3" />
                      Save your progress
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Want to keep these results?</h3>
                    <p className="text-blue-100 mb-6 max-w-md">
                      Sign in now to save your score, track your improvement over time, and identify which chapters you need to study more.
                    </p>
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Create Free Account
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="flex-1 text-left w-full">
                  <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-red-600" />
                    Continue Practicing
                  </h4>
                  <div className="grid gap-4">
                    {mockExam.id === '1' ? (
                      <Link
                        href="/quiz?id=2"
                        className="p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all group flex items-center justify-between"
                      >
                        <div className="pr-4">
                          <h5 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Official Mock Exam #2</h5>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">Another free 20-question practice test.</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-red-600 shrink-0 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <Link
                        href="/quiz?id=1"
                        className="p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all group flex items-center justify-between"
                      >
                        <div className="pr-4">
                          <h5 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Official Mock Exam #1</h5>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">Review the original mock exam.</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-red-600 shrink-0 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}

                    <div className="p-5 rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Lock className="w-4 h-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">3 More Mocks Locked</p>
                          <p className="text-xs text-gray-400">Sign in to unlock all simulations</p>
                        </div>
                      </div>
                      <Link href="/login" className="text-xs font-bold text-blue-600 hover:underline">Sign in &rarr;</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Review Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl flex items-center gap-2 font-black px-4 mb-8 text-gray-900">
            <CheckCircle className="w-7 h-7 text-green-600" />
            Detailed Review Breakdown
          </h3>
          <div className="space-y-6">
            {mockExam.questions.map((question, idx) => {
              const userAnswerIndex = userAnswers[idx];
              const isCorrect = userAnswerIndex === question.correctAnswer;

              return (
                <div key={question.id || idx} className="p-6 md:p-10 bg-white rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <XCircle className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block">Question {idx + 1}</span>
                        {question.category && (
                          <span className="text-[10px] font-black px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full uppercase tracking-tighter">
                            {question.category}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{question.text}</h4>
                    </div>
                  </div>

                  <div className="ml-0 sm:ml-14 space-y-4">
                    {/* User's Choice */}
                    {!isCorrect && userAnswerIndex !== null && userAnswerIndex !== undefined && userAnswerIndex !== -1 && (
                      <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3">
                         <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                         <div>
                           <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Your Answer</p>
                           <p className="text-red-900 font-bold">{question.options[userAnswerIndex]}</p>
                         </div>
                      </div>
                    )}

                    {/* Correct Choice */}
                    <div className={`p-4 rounded-2xl border flex items-start gap-3 ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100'}`}>
                       <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"/>
                       <div>
                         <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Correct Answer</p>
                         <p className="text-green-900 font-bold">{question.options[question.correctAnswer]}</p>
                       </div>
                    </div>

                    {/* Explanation */}
                     <div className="mt-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 text-gray-700 space-y-4">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Study Explanation</p>
                          <p className="leading-relaxed text-lg text-gray-800">{question.explanation}</p>
                        </div>

                        {question.reference && (
                          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-bold text-red-600 uppercase tracking-tight">
                                {question.reference}
                              </span>
                            </div>
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
    <div className="w-full max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-100 w-full overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)) / mockExam.questions.length) * 100}%` }}
            />
          </div>

          {/* Header */}
          <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black text-red-600 uppercase tracking-widest">Mock Examination</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{mockExam.id} of 5</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{mockExam.title}</h2>
            </div>
            <div className={`flex items-center space-x-2 text-base font-black px-4 py-2 rounded-xl shadow-inner border transition-colors
               ${timeLeft < 300 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-gray-50 text-gray-700 border-gray-100'}
            `}>
              <Clock className="w-5 h-5" />
              <span className="tabular-nums tracking-tighter">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question section */}
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 bg-red-50 text-red-600 rounded-full text-[11px] font-black uppercase tracking-wider">
                Question {currentQuestionIndex + 1}
              </span>
              {currentQuestion.category && (
                <span className="px-2.5 py-0.5 bg-gray-100 text-gray-500 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  {currentQuestion.category}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 leading-snug tracking-tight">
              {currentQuestion.text}
            </h3>

            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = currentQuestion.correctAnswer === index;

                let optionStyles = "border-2 border-gray-100 hover:border-red-200 hover:bg-red-50/30 bg-white cursor-pointer text-gray-700 shadow-sm";

                if (isSelected && !isAnswerSubmitted) {
                  optionStyles = "border-2 border-red-600 bg-red-50 text-red-900 shadow-md";
                } else if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyles = "border-2 border-green-500 bg-green-50 text-green-900 cursor-default";
                  } else if (isSelected && !isCorrect) {
                    optionStyles = "border-2 border-red-500 bg-red-50 text-red-900 cursor-default opacity-90";
                  } else {
                    optionStyles = "border-2 border-gray-50 bg-gray-50/50 text-gray-400 cursor-default opacity-40";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-4 rounded-xl flex items-center justify-between transition-all duration-300 group ${optionStyles}`}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                         ${isSelected && !isAnswerSubmitted ? 'border-red-600 bg-red-600 shadow-lg scale-110' :
                           isAnswerSubmitted && isCorrect ? 'border-green-500 bg-green-500' :
                           isAnswerSubmitted && isSelected && !isCorrect ? 'border-red-500 bg-red-500' :
                           'border-gray-200 group-hover:border-red-300 group-hover:scale-105'}`}>
                         {(isSelected || (isAnswerSubmitted && isCorrect)) && (
                           <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                         )}
                       </div>
                       <span className="text-sm sm:text-base font-normal pr-4">{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <div className="bg-green-500 p-1.5 rounded-full text-white shadow-md">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <div className="bg-red-500 p-1.5 rounded-full text-white shadow-md">
                        <XCircle className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Feedback & Actions section */}
          <div className="px-5 py-5 sm:px-8 sm:py-6 bg-gray-50 border-t border-gray-100 min-h-[120px] flex items-center">
            {isAnswerSubmitted ? (
              <div className="w-full flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`flex-1 p-4 rounded-xl flex gap-3 items-start shadow-sm border
                   ${selectedAnswer === currentQuestion.correctAnswer
                     ? 'bg-green-100/50 text-green-800 border-green-200'
                     : 'bg-red-100/50 text-red-800 border-red-200'}`}>
                  <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-600' : 'text-red-600'}`} />
                  <div>
                    <h4 className={`font-black text-sm mb-1 uppercase tracking-tight ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
                      {selectedAnswer === currentQuestion.correctAnswer ? 'Excellent!' : 'Not Quite'}
                    </h4>
                    <p className="text-sm font-normal leading-relaxed opacity-90">{currentQuestion.explanation}</p>
                  </div>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap text-sm uppercase tracking-wider"
                >
                  {currentQuestionIndex < mockExam.questions.length - 1 ? 'Next →' : 'Finish Quiz'}
                </button>
              </div>
            ) : (
              <div className="w-full flex justify-end">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`w-full sm:w-auto px-10 py-3 font-bold rounded-xl transition-all duration-300 shadow-md text-sm uppercase tracking-wider
                    ${selectedAnswer === null
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-xl hover:-translate-y-1 active:translate-y-0'
                    }`}
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
          {isSaving && (
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600/30 overflow-hidden">
              <div className="h-full bg-red-600 w-1/3 animate-progress"></div>
            </div>
          )}
        </div>

        {isSaving && (
          <div className="mt-4 flex justify-center items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce"></div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Securely saving your progress</p>
          </div>
        )}
    </div>
  )
}
