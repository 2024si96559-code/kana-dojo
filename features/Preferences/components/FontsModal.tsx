'use client';

import fonts from '@/features/Preferences/data/fonts';
import usePreferencesStore from '@/features/Preferences/store/usePreferencesStore';
import { useClick } from '@/shared/hooks/useAudio';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

interface FontsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FontCardProps {
  fontName: string;
  fontClassName: string;
  isSelected: boolean;
  onClick: (name: string) => void;
}

const FontCard = memo(function FontCard({
  fontName,
  fontClassName,
  isSelected,
  onClick
}: FontCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='cursor-pointer rounded-lg p-3'
      style={{
        backgroundColor: isHovered
          ? 'var(--card-color)'
          : 'var(--background-color)',
        border: isSelected
          ? '1px solid var(--main-color)'
          : '1px solid var(--border-color)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(fontName)}
    >
      <div className='mb-2'>
        <span className='text-sm text-(--main-color)'>
          {isSelected && '\u2B24 '}
          {fontName}
        </span>
      </div>
      <p className={`text-2xl text-(--secondary-color) ${fontClassName}`}>
        あいうえお
      </p>
    </div>
  );
});

export default function FontsModal({ open, onOpenChange }: FontsModalProps) {
  const { playClick } = useClick();
  const selectedFont = usePreferencesStore(state => state.font);
  const setSelectedFont = usePreferencesStore(state => state.setFont);

  const handleFontClick = useCallback(
    (fontName: string) => {
      playClick();
      setSelectedFont(fontName);
    },
    [playClick, setSelectedFont]
  );

  const handleClose = useCallback(() => {
    playClick();
    onOpenChange(false);
  }, [playClick, onOpenChange]);

  if (!open) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal forceMount>
        <DialogPrimitive.Overlay className='fixed inset-0 z-50 bg-black/80' />
        <DialogPrimitive.Content
          className='fixed top-1/2 left-1/2 z-50 flex max-h-[85vh] w-[95vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col gap-0 rounded-2xl border-0 border-(--border-color) bg-(--background-color) p-0 sm:max-h-[80vh] sm:w-[90vw]'
          onOpenAutoFocus={e => e.preventDefault()}
        >
          <div className='sticky top-0 z-10 flex flex-row items-center justify-between rounded-t-2xl border-b border-(--border-color) bg-(--background-color) px-6 pt-6 pb-4'>
            <DialogPrimitive.Title className='text-2xl font-semibold text-(--main-color)'>
              Fonts
              <span className='ml-2 text-sm font-normal text-(--secondary-color)'>
                ({fonts.length})
              </span>
            </DialogPrimitive.Title>
            <button
              onClick={handleClose}
              className='shrink-0 rounded-xl p-2 hover:cursor-pointer hover:bg-(--card-color)'
            >
              <X size={24} className='text-(--secondary-color)' />
            </button>
          </div>
          <div id='modal-scroll' className='flex-1 overflow-y-auto px-6 py-6'>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
              {fonts.map(fontObj => (
                <FontCard
                  key={fontObj.name}
                  fontName={fontObj.name}
                  fontClassName={fontObj.font.className}
                  isSelected={selectedFont === fontObj.name}
                  onClick={handleFontClick}
                />
              ))}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
