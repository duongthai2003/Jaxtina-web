interface FlipCardProps {
    front: string;
    back: string;
    isMatched: boolean;
    isSelected: boolean;
    isMismatched: boolean;
    isDisabled: boolean;
    onClick: () => void;
}
interface TimerProps {
    seconds: number
}

interface Card {
    id: number;
    value: string;
    pairId: number;
    type: string;
    url?: string;
}

interface CardWrapperProps {
  $isSelected?: boolean;
  $isMismatched?: boolean;
  $isMatched?: boolean;
}

interface FloatingPointProps {
  onComplete: () => void;
}