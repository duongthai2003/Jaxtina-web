import { useState } from 'react';
import { images } from "@/assets";
import ConnectionWord from './ConnectionWord';
import { useParams } from 'react-router-dom';

const GameConnectWord = () => {
  const { gameId , typeGame} = useParams();
  const wordSets: WordSet[] = [
    {
      imgList: [
        { id:'1', url: images.goodafternoon, answer: "afternoon" },
        { id: '2', url: images.goodafternoon, answer: "1" },
        { id: '3', url: images.goodafternoon, answer: "2"},
      ],
      wordList: [
        { id: '1', word: 'Good afternoon', answer: "afternoon" },
        { id: '2', word: 'Good morning', answer: "2"  },
        { id: '3', word: 'Good evening', answer: "1" },
      ],
    },
    {
      imgList: [
        { id:'1', url: images.goodafternoon, answer: "afternoon" },
        { id: '2', url: images.goodafternoon, answer: "1" },
        { id: '3', url: images.goodafternoon, answer: "2"},
      ],
      wordList: [
        { id: '1', word: 'Good afternoon', answer: "afternoon" },
        { id: '2', word: 'Good morning', answer: "2"  },
        { id: '3', word: 'Good evening', answer: "1" },
      ],
    },
  ];

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = wordSets[currentSetIndex];

  const handleContinue = () => {
    if (currentSetIndex < wordSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      setCurrentSetIndex(0); 
    }
  };
  return (
    <ConnectionWord
      key={currentSetIndex}
      imgList={currentSet.imgList}
      wordList={currentSet.wordList}
      onContinue={handleContinue}
      isLastSet={currentSetIndex === wordSets.length - 1}
      gameId={gameId!}
      typeGame={typeGame!}
    />
  );
};

export default GameConnectWord;