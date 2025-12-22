'use client';
import useCalligraphyStore from '@/features/Calligraphy/store/useCalligraphyStore';

interface StatsPanelProps {
  layout?: 'horizontal' | 'vertical';
  compact?: boolean;
}

const StatsPanel = ({
  layout = 'vertical',
  compact = false
}: StatsPanelProps) => {
  const correctStrokes = useCalligraphyStore(state => state.correctStrokes);
  const missedStrokes = useCalligraphyStore(state => state.missedStrokes);
  const completedCharacters = useCalligraphyStore(
    state => state.completedCharacters
  );
  const selectedKanaType = useCalligraphyStore(state => state.selectedKanaType);

  const completedHiragana =
    selectedKanaType === 'hiragana' ? completedCharacters : [];

  const completedKatakana =
    selectedKanaType === 'katakana' ? completedCharacters : [];

  const totalCharacters = 46;
  const completedCount =
    selectedKanaType === 'hiragana'
      ? completedHiragana.length
      : completedKatakana.length;

  const accuracy =
    correctStrokes + missedStrokes > 0
      ? Math.round((correctStrokes / (correctStrokes + missedStrokes)) * 100)
      : 0;

  if (layout === 'horizontal') {
    return (
      <div className='flex items-center gap-4 sm:gap-6 text-xs sm:text-sm'>
        <div className='flex items-center gap-1.5'>
          <div className='w-2 h-2 rounded-full bg-green-400'></div>
          <span className='text-gray-500'>Correct:</span>
          <span className='text-green-600 font-semibold'>{correctStrokes}</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <div className='w-2 h-2 rounded-full bg-red-400'></div>
          <span className='text-gray-500'>Missed:</span>
          <span className='text-red-600 font-semibold'>{missedStrokes}</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <div className='w-2 h-2 rounded-full bg-[#F59E0B]'></div>
          <span className='text-gray-500'>Progress:</span>
          <span className='text-[#D97706] font-semibold'>
            {completedCount}/{totalCharacters}
          </span>
        </div>
        <div className='flex items-center gap-1.5'>
          <span className='text-gray-500'>Accuracy:</span>
          <span
            className={`font-semibold ${
              accuracy >= 80 ? 'text-green-600' : 'text-[#D97706]'
            }`}
          >
            {accuracy}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'}>
      {/* Correct strokes */}
      <div
        className={`rounded-xl bg-green-50 border border-green-200 ${
          compact ? 'p-2.5 flex justify-between items-center' : 'p-3'
        }`}
      >
        <div className='flex items-center gap-2'>
          <div className='w-2.5 h-2.5 rounded-full bg-green-400'></div>
          <span className='text-xs text-green-700'>Correct</span>
        </div>
        <div
          className={`text-green-600 font-bold ${compact ? 'text-lg' : 'text-xl'}`}
        >
          {correctStrokes}
        </div>
      </div>

      {/* Missed strokes */}
      <div
        className={`rounded-xl bg-red-50 border border-red-200 ${
          compact ? 'p-2.5 flex justify-between items-center' : 'p-3'
        }`}
      >
        <div className='flex items-center gap-2'>
          <div className='w-2.5 h-2.5 rounded-full bg-red-400'></div>
          <span className='text-xs text-red-700'>Missed</span>
        </div>
        <div
          className={`text-red-600 font-bold ${compact ? 'text-lg' : 'text-xl'}`}
        >
          {missedStrokes}
        </div>
      </div>

      {/* Completed characters */}
      <div
        className={`rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/30 ${
          compact ? 'p-2.5 flex justify-between items-center' : 'p-3'
        }`}
      >
        <div className='flex items-center gap-2'>
          <div className='w-2.5 h-2.5 rounded-full bg-[#F59E0B]'></div>
          <span className='text-xs text-[#92400E]'>
            {selectedKanaType === 'hiragana' ? 'Hiragana' : 'Katakana'}
          </span>
        </div>
        <div
          className={`text-[#D97706] font-bold ${compact ? 'text-lg' : 'text-xl'}`}
        >
          {completedCount}/{totalCharacters}
        </div>
      </div>

      {/* Accuracy */}
      <div
        className={`rounded-xl bg-gray-50 border border-gray-200 ${
          compact ? 'p-2.5 flex justify-between items-center' : 'p-3'
        }`}
      >
        <div className='flex items-center gap-2'>
          <span className='text-xs text-gray-600'>Accuracy</span>
        </div>
        <div
          className={`font-bold ${
            accuracy >= 80
              ? 'text-green-600'
              : accuracy >= 50
                ? 'text-[#D97706]'
                : 'text-red-500'
          } ${compact ? 'text-lg' : 'text-xl'}`}
        >
          {accuracy}%
        </div>
      </div>

      {/* Show both kana progress if any completed */}
      {(completedHiragana.length > 0 || completedKatakana.length > 0) && (
        <div className='pt-2 border-t border-gray-100'>
          <div className='text-xs text-gray-500 mb-2'>Overall Progress</div>
          <div className='grid grid-cols-2 gap-2'>
            <div className='bg-white rounded-lg p-2 border border-gray-100 text-center'>
              <div className='text-[10px] text-gray-400 mb-0.5'>ひらがな</div>
              <div className='text-sm font-semibold text-[#D97706]'>
                {completedHiragana.length}/46
              </div>
            </div>
            <div className='bg-white rounded-lg p-2 border border-gray-100 text-center'>
              <div className='text-[10px] text-gray-400 mb-0.5'>カタカナ</div>
              <div className='text-sm font-semibold text-[#D97706]'>
                {completedKatakana.length}/46
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
