const sounds = {
  key: "/sounds/typewriter-key.mp3",
  enter: "/sounds/typewriter-enter.wav",
};

const ingnoredKeys = [
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "CapsLock",
  "Tab",
  "Backspace",
];

function playKeySound(e: React.KeyboardEvent) {
  if (ingnoredKeys.includes(e.key)) {
    return;
  }

  const src = e.key === "Enter" ? sounds.enter : sounds.key;

  const audio = new Audio(src);
  audio.volume = 0.3;
  audio.play().catch(() => {});
}

export const typewriter = {
  onKeyDown: playKeySound,
};
