interface WordSet {
  imgList: Array<{
    id: string;
    url: string;
    answer: string;
  }>;
  wordList: Array<{
    id: string;
    word: string;
    answer: string;
  }>;
}

interface ConnectionWordProps {
  imgList: Array<{
    id: string;
    url: string;
    answer: string;
  }>;
  wordList: Array<{
    id: string;
    word: string;
    answer: string;
  }>;
  onContinue?: () => void
  isLastSet?: boolean
  gameId: string
  typeGame:string
}

type Connection = {
  imageId: string;
  wordId: string;
  isCorrect?: boolean;
};