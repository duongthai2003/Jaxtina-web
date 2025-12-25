import { FloatingPointContainer } from './style';

export const FloatingPoint = ({ onComplete }: FloatingPointProps) => {
  return (
    <FloatingPointContainer
      initial={{ opacity: 1, y: 0 }}
      animate={{ 
        y: -600,
        opacity: 0,
        transition: { 
          duration: 2,
          ease: "easeOut"
        }
      }}
      onAnimationComplete={onComplete}
    >
      +1
    </FloatingPointContainer>
  );
};