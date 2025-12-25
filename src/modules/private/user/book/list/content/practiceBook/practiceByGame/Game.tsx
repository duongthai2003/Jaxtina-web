import { useParams } from "react-router-dom";
import NotFound from "@/components/NotFound";
import GameConnectWord from "./gameConnectWord/GameConnectWord";
import GameFlipCardWord from "./gameFlipCard/GameFlipCardWord";

const Game = () => {
  const { typeGame, gameId } = useParams<{ typeGame?: string; gameId?: string;}>();
  let GameComponent: React.FC<{ gameId?: string }> | null = null;

  switch (typeGame) {
    case "connect-word":
      GameComponent = GameConnectWord;
      break;
    case "flip-card-word":
      GameComponent = GameFlipCardWord;
      break;
    default:
      GameComponent = null;
  }

  if (!GameComponent) return <NotFound />;
  return <GameComponent gameId={gameId} />;
};

export default Game;
