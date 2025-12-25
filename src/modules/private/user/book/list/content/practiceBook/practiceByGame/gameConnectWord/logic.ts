import { useRef, useState } from "react";
import { motion } from "framer-motion";

export const logic = ({ imgList, wordList }: ConnectionWordProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [checked, setChecked] = useState(false);
  const imageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const wordRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lineRefs = useRef<Record<string, SVGLineElement | null>>({});

  const pulseVariant = {
    pulse: {
      scale: [1, 1.06, 1],
      transition: {
        duration: 0.3,
        repeat: 1,
        repeatType: 'reverse' as const,
      },
    },
  };

  const correctVariant = {
    correct: {
      y: [0, -5, 0],
      transition: {
        duration: 0.3,
        repeat: 1,
        repeatType: 'reverse' as const,
      },
    },
  };

  const wrongVariant = {
    wrong: {
      x: [-6, 6, -6, 6, -6, 6, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  const drawLine = (el: SVGLineElement | null) => {
    if (!el) return;
    const length = el.getTotalLength();
    el.style.strokeDasharray = length.toString();
    el.style.strokeDashoffset = length.toString();
    el.getBoundingClientRect();
  };

  const pulse = (el: HTMLElement | null) => {
    if (!el) return;
    const motionEl = el as HTMLElement & { __motion?: { variant?: string } };
    if (motionEl.__motion) {
      motionEl.__motion.variant = 'pulse';
    }
  };

  const correctAnim = (el: HTMLElement | null) => {
    if (!el) return;
    const motionEl = el as HTMLElement & { __motion?: { variant?: string } };
    if (motionEl.__motion) {
      motionEl.__motion.variant = 'correct';
    }
  };

  const wrongAnim = (el: HTMLElement | null) => {
    if (!el) return;
    const motionEl = el as HTMLElement & { __motion?: { variant?: string } };
    if (motionEl.__motion) {
      motionEl.__motion.variant = 'wrong';
    }
  };

  const selectImg = (id: string) => {
  if (checked) return;

  if (selectedImage === id) {
    setSelectedImage(null);
    return;
  }
  if (selectedWord) {
    const newConnections = connections.filter(
      c => c.imageId !== id && c.wordId !== selectedWord
    );
    newConnections.push({ imageId: id, wordId: selectedWord });
    setConnections(newConnections);
    
    // Draw the line
    const key = `${id}-${selectedWord}`;
    requestAnimationFrame(() => {
      drawLine(lineRefs.current[key]);
    });
    
    // Reset selections
    setSelectedWord(null);
    setSelectedImage(null);
  } else {
    // Just select the image
    setSelectedImage(id);
    pulse(imageRefs.current[id]);
  }
};

const selectWord = (id: string) => {
  if (checked) return;
  
  // Toggle selection
  if (selectedWord === id) {
    setSelectedWord(null);
    return;
  }
  
  // If an image is already selected, connect them
  if (selectedImage) {
    const newConnections = connections.filter(
      c => c.imageId !== selectedImage && c.wordId !== id
    );
    newConnections.push({ imageId: selectedImage, wordId: id });
    setConnections(newConnections);
    
    // Draw the line
    const key = `${selectedImage}-${id}`;
    requestAnimationFrame(() => {
      drawLine(lineRefs.current[key]);
    });
    
    // Reset selections
    setSelectedImage(null);
    setSelectedWord(null);
  } else {
    // Just select the word
    setSelectedWord(id);
    pulse(wordRefs.current[id]);
  }
};


const checkAnswer = () => {
  const result = connections.map(c => {
    const img = imgList.find(i => i.id === c.imageId);
    const word = wordList.find(w => w.id === c.wordId);
    const isCorrect = img?.answer === word?.answer;
    if (isCorrect) {
      correctAnim(wordRefs.current[c.wordId]);
      correctAnim(imageRefs.current[c.imageId]);
    } else {
      wrongAnim(wordRefs.current[c.wordId]);
      wrongAnim(imageRefs.current[c.imageId]);
    }

    return { ...c, isCorrect };
  });

  setConnections(result);
  setChecked(true);
};

  const getCenter = (
  el: HTMLDivElement | null,
  container: HTMLDivElement | null
) => {
  if (!el || !container) return { x: 0, y: 0 };

  const rect = el.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const x = rect.left + rect.width / 2 - containerRect.left;
  const y = rect.top + rect.height / 2 - containerRect.top;

  return { x, y };
};

  return {
    imgList,
    wordList,
    connections,
    checked,
    imageRefs,
    wordRefs,
    lineRefs,
    getCenter,
    selectImg,
    selectedImage,
    selectWord,
    checkAnswer,
    selectedWord,
    setSelectedWord,
    animationVariants: {
      pulse: pulseVariant,
      correct: correctVariant,
      wrong: wrongVariant,
    },
    motion,
  };
};
