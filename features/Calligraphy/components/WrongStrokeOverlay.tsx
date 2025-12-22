'use client';
import useCalligraphyStore from '@/features/Calligraphy/store/useCalligraphyStore';

const WrongStrokeOverlay = () => {
  const showWrongStroke = useCalligraphyStore(state => state.showWrongStroke);

  if (!showWrongStroke) return null;

  return (
    <div className='fixed inset-0 bg-red-500/10 backdrop-blur-[2px] flex items-center justify-center z-30 pointer-events-none animate-fade-in'>
      <div className='bg-white rounded-2xl p-6 max-w-xs mx-4 text-center shadow-xl border-2 border-red-200 animate-shake'>
        {/* Error Icon */}
        <div className='w-16 h-16 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center'>
          <svg
            className='w-8 h-8 text-red-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2.5}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className='text-lg font-bold text-gray-800 mb-1'>Try Again!</h3>

        {/* Hint */}
        <p className='text-gray-500 text-sm mb-2'>
          Start from the{' '}
          <span className='text-green-500 font-bold'>green dot</span> and follow
          the <span className='text-[#F59E0B] font-bold'>yellow line</span>
        </p>

        {/* Japanese */}
        <p className='text-red-400 text-sm'>
          もう一度！
          <span className='text-gray-400 text-xs ml-1'>(One more time!)</span>
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default WrongStrokeOverlay;
