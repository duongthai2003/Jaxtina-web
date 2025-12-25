import { useEffect, useState } from "react";
import { FloatingPoint } from "./FloatPoint";
import { CardFace, CardWrapper } from "./style";

const FlipCardWord = ({ front, back, isMatched, isSelected, isMismatched, isDisabled, onClick }: FlipCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(true);
    const [showFloatingPoint, setShowFloatingPoint] = useState(false);

    useEffect(() => {
        if (isSelected || isMismatched || isMatched) {
            setIsFlipped(true);
        } else if (isFlipped) {
            const timer = setTimeout(() => {
                setIsFlipped(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isSelected, isMismatched, isMatched, isFlipped]);

    useEffect(() => {
        if (isMatched) {
            setShowFloatingPoint(true);
            const timer = setTimeout(() => {
                setShouldAnimate(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isMatched]);

    if (!shouldAnimate && isMatched) {
        return null;
    }

    return (
        <>
            <CardWrapper
                onClick={!isDisabled && !isMatched ? onClick : undefined}
                animate={{
                    scale: isSelected ? 1.05 : 1,
                    opacity: isMatched ? 0 : 1,
                }}
                transition={{ duration: 0.5 }}
                $isSelected={isSelected}
                $isMismatched={isMismatched}
                $isMatched={isMatched}
                style={{
                    pointerEvents: isDisabled || isMatched ? "none" : "auto",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                }}
            >
                <CardFace className="front">
                    {front}
                </CardFace>
                <CardFace className="back">
                    {back}
                </CardFace>
            </CardWrapper>
            {showFloatingPoint && (
                <FloatingPoint 
                    onComplete={() => setShowFloatingPoint(false)} 
                />
            )}
        </>
    );
}

export default FlipCardWord;
