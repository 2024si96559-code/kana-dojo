'use client';
import useCalligraphyStore from '@/features/Calligraphy/store/useCalligraphyStore';

const StrokeProgress = () => {
  const selectedCharacter = useCalligraphyStore(
    state => state.selectedCharacter
  );
  const currentStrokeIndex = useCalligraphyStore(
    state => state.currentStrokeIndex
  );
  const currentStage = useCalligraphyStore(state => state.currentStage);
  const strokeResults = useCalligraphyStore(state => state.strokeResults);

  const totalStrokes = selectedCharacter?.strokes?.length || 0;
  const progress =
    totalStrokes > 0 ? (currentStrokeIndex / totalStrokes) * 100 : 0;

  // Only show in stroke stage
  if (currentStage !== 'stroke') return null;

  return (
    <div className='w-full'>
      <div className='flex justify-between text-xs text-[var(--secondary-color)] mb-1'>
        <span>Stroke</span>
        <span className='text-[var(--main-color)]'>
          {currentStrokeIndex} / {totalStrokes}
        </span>
      </div>
      <div className='h-1.5 bg-[var(--background-color)] rounded-full overflow-hidden'>
        <div
          className='h-full bg-[var(--main-color)] rounded-full transition-all duration-300'
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress Graph - Green/Red dots */}
      {strokeResults && strokeResults.length > 0 && (
        <div className='mt-3 pt-2 border-t border-[var(--border-color)]'>
          <div className='text-[10px] text-[var(--secondary-color)] mb-1.5'>
            History
          </div>
          <div className='flex flex-wrap gap-1'>
            {strokeResults.map((result, idx) => (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                  result.isCorrect
                    ? 'bg-green-100 text-green-600 border border-green-400'
                    : 'bg-red-100 text-red-600 border border-red-400'
                }`}
                title={result.isCorrect ? 'Correct' : 'Missed'}
              >
                {result.isCorrect ? '✓' : '✕'}
              </div>
            ))}
          </div>
          <div className='flex gap-2 mt-1.5 text-[9px]'>
            <span className='text-green-600'>
              ✓ {strokeResults.filter(r => r.isCorrect).length}
            </span>
            <span className='text-red-600'>
              ✕ {strokeResults.filter(r => !r.isCorrect).length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrokeProgress;
