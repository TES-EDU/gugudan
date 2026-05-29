/**
 * Web Audio API 기반 사운드 시스템
 * MVP: 일시정지 뽀잉 효과음만 구현, 나머지는 확장 가능 구조
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

/** 일시정지 뽀잉 사운드 */
export function playPauseSound(volume: number = 0.7): void {
  const ctx = getAudioContext();

  // 뽀잉 = 빠르게 올라가는 주파수 + 짧은 지속
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.25);

  gain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

/** 숫자 버튼 클릭음 */
export function playClickSound(volume: number = 0.7): void {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);

  gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}

/** 정답 효과음 */
export function playCorrectSound(volume: number = 0.7): void {
  const ctx = getAudioContext();

  // 밝은 2음 멜로디
  [0, 0.1].forEach((delay, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(i === 0 ? 523 : 784, ctx.currentTime + delay);
    gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.2);
  });
}

/** 오답 효과음 */
export function playWrongSound(volume: number = 0.7): void {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.2);

  gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

/** 문제 바닥 도달 충돌음 */
export function playMissSound(volume: number = 0.7): void {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.3);

  gain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
}

/** 여러 문제 동시 제거 (강화된 팡!) */
export function playMultiCorrectSound(volume: number = 0.7): void {
  const ctx = getAudioContext();
  const freqs = [523, 659, 784, 1047];

  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const delay = i * 0.05;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(volume * 0.35, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.3);
  });
}

/** 게임 종료음 */
export function playGameOverSound(volume: number = 0.7): void {
  const ctx = getAudioContext();
  const freqs = [392, 330, 262];

  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const delay = i * 0.2;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.4);
  });
}

// ===== BGM 구조 =====

let bgmAudio: HTMLAudioElement | null = null;

export function playBGM(volume: number = 0.3): void {
  // 소리 40%에서 더 커지지 않게 제한 (입력된 volume의 40% 적용 또는 최대치 제한)
  const clampedVolume = Math.min(volume, 0.4);

  if (bgmAudio) {
    bgmAudio.volume = clampedVolume;
    bgmAudio.play().catch(() => {});
    return;
  }

  bgmAudio = new Audio('/sounds/ukulele-ukulele-joyful.mp3');
  bgmAudio.loop = true;
  bgmAudio.volume = clampedVolume;
  bgmAudio.play().catch((e) => {
    console.warn("BGM autoplay blocked or file not found:", e);
  });
}

export function pauseBGM(): void {
  bgmAudio?.pause();
}

export function resumeBGM(): void {
  bgmAudio?.play().catch(() => {});
}

export function stopBGM(): void {
  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
  }
}

export function setBGMVolume(volume: number): void {
  if (bgmAudio) bgmAudio.volume = Math.min(volume, 0.4);
}
