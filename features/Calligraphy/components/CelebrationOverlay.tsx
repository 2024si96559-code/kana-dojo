'use client';
import { useEffect, useCallback } from 'react';
import useCalligraphyStore from '@/features/Calligraphy/store/useCalligraphyStore';
import { hiraganaData } from '@/features/Calligraphy/data/hiraganaStrokes';
import { katakanaData } from '@/features/Calligraphy/data/katakanaStrokes';

const CelebrationOverlay = () => {
  const showCelebration = useCalligraphyStore(state => state.showCelebration);
  const setShowCelebration = useCalligraphyStore(
    state => state.setShowCelebration
  );
  const currentStage = useCalligraphyStore(state => state.currentStage);
  const setCurrentStage = useCalligraphyStore(state => state.setCurrentStage);
  const selectedCharacter = useCalligraphyStore(
    state => state.selectedCharacter
  );
  const setSelectedCharacter = useCalligraphyStore(
    state => state.setSelectedCharacter
  );
  const selectedKanaType = useCalligraphyStore(state => state.selectedKanaType);
  const resetStrokes = useCalligraphyStore(state => state.resetStrokes);
  const clearStrokeResults = useCalligraphyStore(
    state => state.clearStrokeResults
  );

  const characterData =
    selectedKanaType === 'hiragana' ? hiraganaData : katakanaData;

  const getNextCharacter = useCallback(() => {
    if (!selectedCharacter) return characterData[0];
    const idx = characterData.findIndex(
      c => c.character === selectedCharacter.character
    );
    return idx < characterData.length - 1
      ? characterData[idx + 1]
      : characterData[0];
  }, [selectedCharacter, characterData]);

  // Confetti
  useEffect(() => {
    if (!showCelebration) return;
    const colors = ['#F59E0B', '#22c55e', '#3B82F6', '#EF4444', '#8B5CF6'];
    const container = document.createElement('div');
    container.className =
      'fixed inset-0 pointer-events-none z-[60] overflow-hidden';
    document.body.appendChild(container);

    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position:absolute;width:8px;height:8px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        left:${Math.random() * 100}%;top:-10px;border-radius:2px;
        transform:rotate(${Math.random() * 360}deg);
        animation:confetti-fall ${2 + Math.random() * 2}s ease-out forwards;
        animation-delay:${Math.random() * 0.5}s;
      `;
      container.appendChild(confetti);
    }

    const style = document.createElement('style');
    style.textContent = `@keyframes confetti-fall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`;
    document.head.appendChild(style);

    return () => {
      container.remove();
      style.remove();
    };
  }, [showCelebration]);

  if (!showCelebration) return null;

  const isStrokePracticeComplete = currentStage === 'stroke';
  const isSelfPracticeComplete = currentStage === 'full';

  const handleNext = () => {
    if (isStrokePracticeComplete) {
      // Move to self-practice
      setCurrentStage('full');
      resetStrokes();
      clearStrokeResults();
      setShowCelebration(false);
    } else if (isSelfPracticeComplete) {
      // Next character
      const nextChar = getNextCharacter();
      setSelectedCharacter(nextChar);
      setCurrentStage('stroke');
      resetStrokes();
      clearStrokeResults();
      setShowCelebration(false);
    }
  };

  const handleChooseOwn = () => {
    setShowCelebration(false);
  };

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-[var(--card-color)] rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl'>
        <div className='w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center'>
          <svg
            className='w-8 h-8 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={3}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>

        <h2 className='text-xl font-bold text-[var(--main-color)] mb-2'>
          {isSelfPracticeComplete ? 'Amazing!' : 'Great Work!'}
        </h2>

        <p className='text-[var(--secondary-color)] mb-1'>
          {isStrokePracticeComplete ? (
            'All strokes completed!'
          ) : (
            <>
              <span className='text-4xl font-japanese text-[var(--main-color)] block my-2'>
                {selectedCharacter?.character}
              </span>
              Character mastered!
            </>
          )}
        </p>

        <p className='text-[var(--main-color)] text-sm mb-4'>
          よくできました！{' '}
          <span className='text-[var(--secondary-color)] text-xs'>
            (Well done!)
          </span>
        </p>

        <div className='space-y-2'>
          <button
            onClick={handleNext}
            className='w-full py-3 bg-[var(--main-color)] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2'
          >
            {isStrokePracticeComplete
              ? 'Practice Without Guide →'
              : `Next: ${getNextCharacter()?.character} →`}
          </button>

          {isSelfPracticeComplete && (
            <button
              onClick={handleChooseOwn}
              className='w-full py-2 bg-[var(--background-color)] text-[var(--secondary-color)] rounded-xl hover:text-[var(--main-color)] transition-colors'
            >
              Choose Different Character
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CelebrationOverlay;
