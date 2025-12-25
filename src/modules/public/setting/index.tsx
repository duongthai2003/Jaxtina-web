import { useAudio } from "react-use";

function SettingPage() {
  const [audio, state, controls] = useAudio({
    src: "https://s3.ustatik.com/audio.com.audio/transcoding/79/17/1835849072621779-1835898139535386-1835898181128633.mp3?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=W7IA3NSYSOQIKLY9DEVC%2F20251208%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20251208T214858Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=8996033442697dc9bd8a28a5d34f1e21e7463acd3527a32d28447aa7c35f329f",
    autoPlay: false,
  });

  return (
    <div>
      {audio} {/* phần tử <audio> */}
      <button onClick={controls.play}>Play</button>
      <button onClick={controls.pause}>Pause</button>
      <button onClick={() => controls.seek(state.time + 10)}>+10s</button>
      <div>
        Time: {state.time} / {state.duration}
      </div>
    </div>
  );
}
export default SettingPage;
