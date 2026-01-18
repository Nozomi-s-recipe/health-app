'use client';

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface SmoothScrollButtonProps {
  targetId: string;
}

export function SmoothScrollButton({ targetId }: SmoothScrollButtonProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Button
      size='lg'
      variant='outline'
      className='text-lg rounded-full min-h-[44px] min-w-[120px]'
      onClick={handleClick}
      aria-label='Scroll to features section'
    >
      See How It Works
      <ChevronDown className='ml-2 h-5 w-5' aria-hidden='true' />
    </Button>
  );
}
