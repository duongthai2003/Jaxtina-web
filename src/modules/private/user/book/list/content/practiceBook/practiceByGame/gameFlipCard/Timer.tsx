import { Colon, TimeBox, TimeNumber, TimerWrapper } from "./style";

const Timer = ({ seconds }: TimerProps) => {
    const min = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0")

    return (
        <TimerWrapper>
            <TimeBox>
                <TimeNumber
                    key={min}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {min}
                </TimeNumber>
            </TimeBox>
            <Colon>:</Colon>
            <TimeBox>
                <TimeNumber
                    key={sec}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {sec}
                </TimeNumber>
            </TimeBox>
        </TimerWrapper>
    )
}

export default Timer