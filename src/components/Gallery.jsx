import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ModalMedia from './ModalMedia';
import Quiz from './Quiz';
import { useProgress } from '../context/ProgressContext';
import QUIZ_DATA from '../data/quizData';

const categoryIcons = {
  event: '⚡',
  character: '👤', 
  ideology: '💭'
};

const categoryLabels = {
  event: 'Sự kiện',
  character: 'Nhân vật',
  ideology: 'Tư tưởng'
};

const categoryColors = {
  event: 'bg-red-500',
  character: 'bg-blue-500', 
  ideology: 'bg-purple-500'
};

export default function Gallery({ phase, phaseIndex }) {
  const [active, setActive] = useState(null);
  const [showQuizFor, setShowQuizFor] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const { unlockPiece } = useProgress();

  // Lưu trạng thái hoàn thành vào localStorage theo phase
  const STORAGE_KEY = `completedQuizzes-phase-${phaseIndex}`;
  const getInitialCompleted = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading completed quizzes:', e);
    }
    return new Set();
  };
  
  const [completedQuizzes, setCompletedQuizzes] = useState(getInitialCompleted);

  // Cập nhật lại completedQuizzes khi phaseIndex thay đổi
  useEffect(() => {
    const newCompleted = getInitialCompleted();
    setCompletedQuizzes(newCompleted);
    
    // Sync với context để PuzzleUnlock nhận biết
    newCompleted.forEach(milestoneId => {
      unlockPiece(milestoneId);
    });
  }, [phaseIndex]);

  // Hàm lưu completedQuizzes vào localStorage
  const saveCompletedQuizzes = (newCompleted) => {
    setCompletedQuizzes(newCompleted);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newCompleted)));
      
      // Đồng thời unlock từng milestone để PuzzleUnlock nhận biết
      newCompleted.forEach(milestoneId => {
        unlockPiece(milestoneId);
      });
    } catch (e) {
      console.error('Error saving completed quizzes:', e);
    }
  };

  // DEBUG: Hoàn thành tất cả MOOC ngay lập tức
  const debugCompleteAllMoocs = () => {
    const allMilestoneIds = milestones.map(m => m.id);
    const newCompleted = new Set(allMilestoneIds);
    saveCompletedQuizzes(newCompleted);
    unlockPiece(`phase-${phaseIndex + 1}`);
    toast.success('🐞 Đã hoàn thành tất cả MOOC của giai đoạn này (DEBUG)!', {
      duration: 2000,
    });
  };

  const openMilestone = (milestone) => setActive(milestone);
  const close = () => { 
    setActive(null); 
    setShowQuizFor(null);
    setCurrentQuizIndex(0);
    setAnsweredQuestions({});
  };

  // Kiểm tra xem đã hoàn thành tất cả MOOC chưa
  const checkAllMoocsCompleted = () => {
    const allMilestoneIds = milestones.map(m => m.id);
    const allCompleted = allMilestoneIds.every(id => completedQuizzes.has(id));
    
    if (allCompleted && milestones.length > 0) {
      // Mở mảnh ghép cho cả giai đoạn
      unlockPiece(`phase-${phaseIndex + 1}`);
      toast.success(`🎉 Chúc mừng! Bạn đã hoàn thành tất cả ${milestones.length} MOOC của giai đoạn "${phase.title}"! Mảnh ghép đã được mở khóa! 🧩`, {
        duration: 4000,
      });
    }
  };

  const milestones = phase.milestones || phase.events || []; // backward compatibility

  return (
    <div className="mt-8">
      {/* DEBUG BUTTONS */}
      {/* <div className="mb-4 flex gap-2">
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600"
          onClick={debugCompleteAllMoocs}
        >
          🐞 DEBUG: Hoàn thành tất cả MOOC
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600"
          onClick={() => {
            console.log('=== DEBUG INFO ===');
            console.log('Phase Index:', phaseIndex);
            console.log('Phase ID:', phase.id);
            console.log('Phase Title:', phase.title);
            console.log('Storage Key:', STORAGE_KEY);
            console.log('Completed Quizzes:', Array.from(completedQuizzes));
            console.log('Milestones:', milestones.map(m => m.id));
            toast(`ℹ️ Phase: ${phaseIndex} | ID: ${phase.id}\nHoàn thành: ${Array.from(completedQuizzes).join(', ') || 'Chưa có'}`, {
              duration: 3000,
              icon: 'ℹ️',
            });
          }}
        >
          ℹ️ Debug Info
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600"
          onClick={() => {
            if (confirm('Xóa tất cả tiến độ của giai đoạn này?')) {
              localStorage.removeItem(STORAGE_KEY);
              saveCompletedQuizzes(new Set());
              toast.success('🗑️ Đã xóa tiến độ!', {
                duration: 2000,
              });
            }
          }}
        >
          🗑️ Xóa tiến độ
        </button>
      </div> */}
      <div className="mb-8 p-6 bg-white/90 rounded-2xl border border-red-200 shadow-lg">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3">
          🏛️ {phase.title}
        </h3>
        <p className="text-base text-slate-600 mt-2 mb-4">{phase.description}</p>
        {completedQuizzes.size === milestones.length && milestones.length > 0 ? (
          <>
            <div className="text-sm font-medium mb-2">
              <span className="text-red-600">
                🧩 Tiến độ: {completedQuizzes.size}/{milestones.length} MOOC hoàn thành
              </span>
              <span className="ml-3 text-green-600 font-bold">✅ Mảnh ghép đã mở khóa!</span>
            </div>
            <div className="text-sm text-slate-600">
              📝 Hoàn thành <strong>TẤT CẢ {milestones.length} MOOC</strong> để mở khóa mảnh ghép của giai đoạn này
            </div>
          </>
        ) : (
          <div className="text-sm text-slate-600">
            📝 Hoàn thành <strong>TẤT CẢ {milestones.length} MOOC</strong> để mở khóa mảnh ghép của giai đoạn này
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {milestones.map((milestone, idx) => {
          const category = milestone.category || 'event';
          const isCompleted = completedQuizzes.has(milestone.id);
          const quizData = QUIZ_DATA[milestone.id] || [];
          const hasQuiz = quizData.length > 0;
          // Chỉ hiển thị trạng thái hoàn thành nếu milestone.id thực sự nằm trong completedQuizzes
          return (
            <div 
              key={milestone.id} 
              className={`bg-white/90 rounded-2xl p-6 cursor-pointer hover:bg-white transition-all duration-200 border border-slate-200 hover:border-red-300 hover:shadow-xl group transform hover:scale-105 ${isCompleted ? 'ring-2 ring-green-400 bg-green-50/50' : ''}`} 
              onClick={() => openMilestone(milestone)}
            >
              <div className="h-40 sm:h-48 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden mb-4 relative">
                {milestone.type === 'image' ? (
                  <>
                    <img 
                      src={milestone.src} 
                      alt={milestone.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }} 
                    />
                    <div className="hidden text-base text-slate-600 font-medium items-center justify-center">
                      {milestone.type.toUpperCase()}
                    </div>
                  </>
                ) : (
                  <div className="text-base text-slate-600 font-medium flex items-center justify-center">
                    <img 
                      src={milestone.src} 
                      alt={milestone.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }} 
                    />
                    
                  </div>
                )}
                
                {/* Category Badge */}
                <div className={`absolute top-3 left-3 px-3 py-2 rounded-full text-sm font-bold text-white ${categoryColors[category]} shadow-lg`}>
                  {categoryIcons[category]} {categoryLabels[category]}
                </div>

                {/* Completion Badge */}
                {isCompleted && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    ✓
                  </div>
                )}
              </div>
              
              <div className="text-base text-slate-800 font-bold mb-2 line-clamp-2">{milestone.title}</div>
              <div className="text-sm text-slate-600 mb-4 line-clamp-2">{milestone.caption}</div>
              
              <div className="flex gap-3">
                <button 
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                    !hasQuiz 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isCompleted
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                  }`}
                  disabled={!hasQuiz}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    if (hasQuiz) {
                      setShowQuizFor(idx);
                      setCurrentQuizIndex(0);
                    }
                  }}
                >
                  {!hasQuiz ? '🚫 Chưa có Quiz' : 
                   isCompleted ? '✅ Hoàn thành' :
                   `🧠 Quiz (${quizData.length} câu)`}
                </button>
                <button 
                  className="px-4 py-3 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition shadow-lg" 
                  onClick={(e) => { e.stopPropagation(); openMilestone(milestone); }}
                >
                  📖 Chi tiết
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {active && <ModalMedia item={active} onClose={close} />}

      {showQuizFor !== null && (() => {
        const milestone = milestones[showQuizFor];
        const quizData = QUIZ_DATA[milestone.id] || [];
        const currentQuiz = quizData[currentQuizIndex];
        
        console.log('=== DEBUG QUIZ ===');
        console.log('Milestone ID:', milestone.id);
        console.log('Quiz data:', quizData);
        console.log('Current quiz index:', currentQuizIndex);
        console.log('Current quiz:', currentQuiz);
        console.log('Available quiz keys:', Object.keys(QUIZ_DATA));
        
        if (!currentQuiz) {
          return (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={close}>
              <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">🚫 Chưa có Quiz</h3>
                  <p className="text-slate-600 mb-4">Quiz cho cột mốc này đang được cập nhật.</p>
                  <button 
                    className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition font-medium"
                    onClick={close}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={close}>
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl mb-[660px] " onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">🧠 Quiz: {milestone.title}</h3>
                <div className="text-sm text-slate-600 mt-2">
                  Câu {currentQuizIndex + 1} / {quizData.length}
                </div>
              </div>
              
              <div className="p-6">
                <Quiz
                  key={`${milestone.id}-${currentQuizIndex}`}
                  question={currentQuiz}
                  options={currentQuiz.options}
                  onCorrect={() => { 
                    console.log('Correct answer!');
                    // Lưu lại câu trả lời đúng
                    const key = `${milestone.id}-${currentQuizIndex}`;
                    setAnsweredQuestions(prev => ({
                      ...prev,
                      [key]: true
                    }));
                  }}
                  onWrong={() => { 
                    console.log('Wrong answer...');
                    // Không lưu câu trả lời sai
                  }}
                />
              </div>
              
              <div className="p-6 border-t border-slate-200 flex gap-3">
                <button 
                  className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition font-medium"
                  onClick={close}
                >
                  Đóng
                </button>
                {currentQuizIndex > 0 && (
                  <button 
                    className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition font-medium"
                    onClick={() => setCurrentQuizIndex(currentQuizIndex - 1)}
                  >
                    ← Câu trước
                  </button>
                )}
                {currentQuizIndex < quizData.length - 1 && (
                  <button 
                    className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition font-medium"
                    onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)}
                  >
                    Câu tiếp →
                  </button>
                )}
                {currentQuizIndex === quizData.length - 1 && (() => {
                  // Kiểm tra xem đã trả lời đúng tất cả câu hỏi chưa
                  const allAnswered = quizData.every((_, index) => {
                    const key = `${milestone.id}-${index}`;
                    return answeredQuestions[key] === true;
                  });
                  
                  return (
                    <button 
                      className={`px-4 py-3 rounded-xl transition font-medium ${
                        allAnswered 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!allAnswered}
                      onClick={() => {
                        if (!allAnswered) {
                          toast.error('⚠️ Bạn cần trả lời đúng TẤT CẢ câu hỏi để hoàn thành MOOC!', {
                            duration: 3000,
                          });
                          return;
                        }
                        
                        // Hoàn thành MOOC này
                        const newCompletedQuizzes = new Set(completedQuizzes);
                        newCompletedQuizzes.add(milestone.id);
                        saveCompletedQuizzes(newCompletedQuizzes);
                        
                        // Unlock milestone ngay khi hoàn thành quiz
                        unlockPiece(milestone.id);
                        close();
                        toast.success(`🎉 Hoàn thành MOOC "${milestone.title}"!`, {
                          duration: 3000,
                        });
                        
                        // Kiểm tra xem đã hoàn thành tất cả MOOC chưa
                        setTimeout(() => {
                          const allMilestoneIds = milestones.map(m => m.id);
                          const allCompleted = allMilestoneIds.every(id => newCompletedQuizzes.has(id));
                          
                          console.log('=== DEBUG COMPLETION ===');
                          console.log('Phase index:', phaseIndex);
                          console.log('Phase ID will be:', phase.id);
                          console.log('All milestones:', allMilestoneIds);
                          console.log('Completed quizzes:', Array.from(newCompletedQuizzes));
                          console.log('All completed?', allCompleted);
                          console.log('Milestones length:', milestones.length);
                          
                          if (allCompleted && milestones.length > 0) {
                            // Sử dụng phase.id thay vì phaseIndex
                            const phaseId = phase.id;
                            console.log('Unlocking piece with ID:', phaseId);
                            unlockPiece(phaseId);
                            toast.success(`🏆 XUẤT SẮC! Bạn đã hoàn thành tất cả ${milestones.length} MOOC của giai đoạn "${phase.title}"!\n🧩 Mảnh ghép "${phaseId}" đã được mở khóa!`, {
                              duration: 5000,
                            });
                          }
                        }, 500);
                      }}
                    >
                      {allAnswered ? '🏁 Hoàn thành MOOC' : `⚠️ Cần trả lời đúng ${quizData.length - Object.keys(answeredQuestions).filter(key => key.startsWith(milestone.id) && answeredQuestions[key]).length}/${quizData.length} câu`}
                    </button>
                  );
                })()}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
