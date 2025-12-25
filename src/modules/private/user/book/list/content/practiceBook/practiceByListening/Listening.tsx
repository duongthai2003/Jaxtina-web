import { useEffect, useState } from "react";
import { PauseOutlined, CaretRightOutlined, SettingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { BaseTag } from "@/utils/baseTagHTML";
import { images } from "@/assets";
import { SubtitleItem, Vocab } from "../../../../type";
import { VocabPopup } from "./Popup";
import { list } from "./datafake";
import useListenVideo from "@/hooks/useListenVideo";

const Listening = () => {
    const {
        videoRef,
        time,
        duration,
        playing,
        play,
        pause,
        seek,
    } = useListenVideo()
    const [currentSub, setCurrentSub] = useState<any>(null)
    const [activeVocab, setActiveVocab] = useState<{ word: string, ipa: string, text: string, meaningVocab: string } | null>(null);
    const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const sub = list.find(
            (s) => time >= s.start && time <= s.end
        );
        setCurrentSub(sub || null);
    }, [time]);

    const renderSentence = (item: SubtitleItem) => {
        const words = item.english.split(" ");
        return words.map((word, index) => {
            const cleanWord = word.replace(/[?.!]/g, "").toLowerCase();
            const vocab = item.newWord.find(
                (v: Vocab) => v.word.toLowerCase() === cleanWord
            );
            if (vocab) {
                return (
                    <HighlightWord
                        key={index}
                        onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setPopupPos({
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                            });
                            setActiveVocab(vocab);
                            pause();
                        }}
                        onMouseLeave={() => {
                            setActiveVocab(null);
                            setPopupPos(null);
                            play();
                        }}
                    >
                        {word}{" "}
                    </HighlightWord>
                );
            }
            return <BaseTag.span key={index}>{word} </BaseTag.span>;
        });
    };

    const formatTime = (t = 0) => {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <video 
            ref={videoRef}
            src="/src/assets/video-listen.mp4"
            controls={false}
            preload="metadata"
        />
            <Controls>
                <PlayBtn onClick={() =>
                    playing ? pause() : play()
                }>
                    {playing ? <PauseOutlined /> : <CaretRightOutlined />}
                </PlayBtn>
                <Time>{formatTime(time)}</Time>
                {duration > 0 && (
                    <Progress
                        type="range"
                        min={0}
                        max={duration}
                        step={0.1}
                        value={time}
                        $percent={(time / duration) * 100}
                        onChange={(e) => seek(Number(e.target.value))}
                    />
                )}
                <Time>
                    {formatTime(duration)}
                </Time>
                <SettingOutlined />
            </Controls>

            {currentSub && (
                <>
                    <SubTitleWrapper>
                        <Card> 
                            <ImgSub src={images.flagUk} /> 
                            <BaseTag.p>{renderSentence(currentSub)}</BaseTag.p>
                        </Card>
                    </SubTitleWrapper>
                    <SubTitleWrapper>
                        <Card> 
                            <ImgSub src={images.flagVietNam} /> 
                            <BaseTag.p>{currentSub.vietnam}</BaseTag.p>
                        </Card>
                    </SubTitleWrapper>
                </>
            )}
            {activeVocab && popupPos && (
                <SubTitleWrapper>
                    <VocabPopup item={activeVocab} position={popupPos} />
                </SubTitleWrapper>
            )}

        </>
    )
}
export default Listening

const Card = styled.div`
    width: ${convertPixelToRem(1200)};
    inset: 0;
    border-radius: ${convertPixelToRem(12)};
    background:${(props) => props.theme.$bg_white};
    display: flex;
    margin: 0;
    align-items: center;
    justify-content: flex-start;
    font-weight: 600;
    font-size: ${convertPixelToRem(18)};
    backface-visibility: hidden;
    border: ${convertPixelToRem(1)} solid ${(props) => props.theme.$tw_gray_100};
    border-bottom: ${convertPixelToRem(6)} solid ${(props) => props.theme.$tw_gray_100};
    padding: ${convertPixelToRem(16)};
    text-align: center;
    word-break: break-word;
    overflow: hidden;
    pointer-events: visible;
`;

const HighlightWord = styled.span`
  color: ${(props) => props.theme.$bg_blue_900};
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
`;

const SubTitleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const ImgSub = styled.img`
    padding-right: ${convertPixelToRem(6)};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(12)};
  color: ${(props) => props.theme.$bg_blue_600};
`;

const PlayBtn = styled.button`
  width: ${convertPixelToRem(40)};
  height: ${convertPixelToRem(40)};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.$bg_blue_600};
  color: ${(props) => props.theme.$bg_white};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  svg {
    font-size: ${convertPixelToRem(18)};
  }
  &:focus,
  &:active {
    outline: none;
  }
`;

const Progress = styled.input<{ $percent: number }>`
  flex: 1;
  height: ${convertPixelToRem(20)};             
  appearance: none;
  background: transparent;
  cursor: pointer;
  &::-webkit-slider-runnable-track {
    height: ${convertPixelToRem(8)};
    border-radius: ${convertPixelToRem(999)};
    background: linear-gradient(
      to right,
      ${(props) => props.theme.$bg_blue_600} 0%,
      ${(props) => props.theme.$bg_blue_600} ${(props) => props.$percent}%,
      ${(props) => props.theme.$tw_gray_100} ${(props) => props.$percent}%,
      ${(props) => props.theme.$tw_gray_100} 100%
    );
  }
  &::-webkit-slider-thumb {
    appearance: none;
    width: ${convertPixelToRem(18)};
    height: ${convertPixelToRem(18)};
    border-radius: 50%;
    background: ${(props) => props.theme.$bg_blue_600};
    margin-top: ${convertPixelToRem(-5)};
    box-shadow: 0 0 0 ${convertPixelToRem(4)} ${(props) => props.theme.book.$stroke_sky_300};
  }
  &::-moz-range-track {
    height: ${convertPixelToRem(8)};
    border-radius: ${convertPixelToRem(999)};
    background: linear-gradient(
      to right,
      ${(props) => props.theme.$bg_blue_600} 0%,
      ${(props) => props.theme.$bg_blue_600} ${(props) => props.$percent}%,
      ${(props) => props.theme.$tw_gray_100} ${(props) => props.$percent}%,
      ${(props) => props.theme.$tw_gray_100} 100%
    );
  }

  &::-moz-range-thumb {
    width: ${convertPixelToRem(18)};
    height: ${convertPixelToRem(18)};
    border-radius: 50%;
    background: ${(props) => props.theme.$bg_blue_600};
    border: none;
    box-shadow: 0 0 0 6px ${(props) => props.theme.book.$stroke_sky_300};
  }
`;

const Time = styled.span`
  font-size: ${convertPixelToRem(14)};
  opacity: 0.8;
`;


