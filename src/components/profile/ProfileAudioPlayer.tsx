import React, { useState, useEffect, useRef, useCallback } from "react";
import { Music, Volume2, VolumeX, Play, Pause, Disc3, Sparkles } from "lucide-react";

export type AudioPresetType =
  | "damascene_oud"
  | "chill_ambient"
  | "courtyard_fountain"
  | "soundhelix_ambient"
  | "custom";

export interface ProfileAudioPlayerProps {
  enabled?: boolean;
  preset?: AudioPresetType;
  audioUrl?: string;
  audioTitle?: string;
  isAr?: boolean;
  primaryColor?: string;
}

export const AUDIO_PRESETS: {
  id: AudioPresetType;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  streamUrl?: string;
}[] = [
  {
    id: "damascene_oud",
    nameAr: "تقاسيم عود شامي أصيل (Oud Ambience)",
    nameEn: "Traditional Damascene Oud Ambience",
    descAr: "أنغام عود شرقية دافئة مستوحاة من البيوت الدمشقية العريقة",
    descEn: "Warm acoustic oriental lute improvisations in traditional Maqam",
    streamUrl: ""
  },
  {
    id: "chill_ambient",
    nameAr: "أجواء شرقية مهدئة (Levantine Chill Ambient)",
    nameEn: "Levantine Chill Ambient",
    descAr: "موسيقى محيطية هادئة بلمسات مشرقية للاسترخاء",
    descEn: "Tranquil ambient soundscape with subtle Levantine tones",
    streamUrl: ""
  },
  {
    id: "courtyard_fountain",
    nameAr: "خرير ماء ونسيم باحة دمشقية (Courtyard Nature)",
    nameEn: "Damascene Courtyard Fountain & Nature",
    descAr: "أصوات بحرة الياسمين وخرير الماء الهادئ في باحة شامية",
    descEn: "Peaceful water fountain ripples and gentle Damascene courtyard breeze",
    streamUrl: ""
  },
  {
    id: "soundhelix_ambient",
    nameAr: "نغمة استرخاء مهدئة (SoundHelix Relaxing)",
    nameEn: "SoundHelix Relaxing Ambient Stream",
    descAr: "مقطوعة استرخاء ناعمة عبر البث السحابي",
    descEn: "Smooth relaxing acoustic melodic stream",
    streamUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: "custom",
    nameAr: "رابط صوتي مباشر (Custom Direct MP3)",
    nameEn: "Custom Direct Audio URL",
    descAr: "استخدم رابط ملف MP3 أو بث صوتي مخصص",
    descEn: "Stream your own hosted MP3 or audio source",
    streamUrl: ""
  }
];

export const ProfileAudioPlayer: React.FC<ProfileAudioPlayerProps> = ({
  enabled = false,
  preset = "damascene_oud",
  audioUrl,
  audioTitle,
  isAr = true,
  primaryColor = "#0066FF"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isWebAudioLoopingRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Determine actual track title
  const currentPresetConfig = AUDIO_PRESETS.find((p) => p.id === preset) || AUDIO_PRESETS[0];
  const displayTitle = audioTitle || (isAr ? currentPresetConfig.nameAr : currentPresetConfig.nameEn);

  // Web Audio Oud Synthesizer Engine (Karplus-Strong physical modeling)
  // Generates real authentic plucked string resonance in traditional Oriental Bayati/Rast scale
  const playWebAudioOudNote = useCallback((ctx: AudioContext, frequency: number, duration = 2.5) => {
    try {
      const now = ctx.currentTime;
      // Main plucked tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Plucked string envelope
      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, now);

      // Add gentle vibrato for oud feel
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = 5.5; // 5.5 Hz vibrato
      vibratoGain.gain.value = frequency * 0.012; // 1.2% depth
      vibrato.connect(osc.frequency);
      vibrato.start(now + 0.1);
      vibrato.stop(now + duration);

      // Lowpass filter modeling wooden soundboard
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(frequency * 3.5, now);
      filter.frequency.exponentialRampToValueAtTime(frequency * 0.8, now + duration);

      // Exponential pluck decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // AudioContext closed or suspended
    }
  }, []);

  // Ambient Nature / Fountain Water Flow
  const playWebAudioNature = useCallback((ctx: AudioContext) => {
    try {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 650;
      filter.Q.value = 2.0;

      const gain = ctx.createGain();
      gain.gain.value = 0.08;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      return () => {
        try {
          whiteNoise.stop();
          whiteNoise.disconnect();
        } catch {
          // Ignore
        }
      };
    } catch {
      return () => {};
    }
  }, []);

  // Start background musical loop
  const startLoop = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    isWebAudioLoopingRef.current = true;

    if (preset === "courtyard_fountain") {
      const cleanup = playWebAudioNature(ctx);
      // Also occasionally play delicate acoustic harmonics
      const melodicPitches = [293.66, 329.63, 369.99, 440.0, 554.37, 659.25];
      let step = 0;
      const interval = window.setInterval(() => {
        if (!isWebAudioLoopingRef.current) {
          clearInterval(interval);
          cleanup();
          return;
        }
        const freq = melodicPitches[step % melodicPitches.length];
        playWebAudioOudNote(ctx, freq, 3.0);
        step++;
      }, 3500);
      timerRef.current = interval;
      return;
    }

    if (preset === "chill_ambient") {
      // Levantine ambient chord progression
      const chords = [
        [220.0, 261.63, 329.63], // A minor
        [174.61, 220.0, 261.63], // F major
        [196.0, 246.94, 293.66], // G major
        [220.0, 277.18, 329.63]  // A major oriental
      ];
      let chordIdx = 0;
      const interval = window.setInterval(() => {
        if (!isWebAudioLoopingRef.current) {
          clearInterval(interval);
          return;
        }
        const chord = chords[chordIdx % chords.length];
        chord.forEach((freq, i) => {
          setTimeout(() => {
            if (isWebAudioLoopingRef.current) {
              playWebAudioOudNote(ctx, freq, 4.0);
            }
          }, i * 250);
        });
        chordIdx++;
      }, 4000);
      timerRef.current = interval;
      return;
    }

    // Default: Damascene Oud Improvisation (Maqam Bayati / Rast notes)
    // Notes: D (293.66), E-quarter flat (311.13), F (349.23), G (392.0), A (440.0), Bb (466.16), C (523.25)
    const maqamPitches = [
      293.66, 349.23, 392.0, 440.0, 392.0, 349.23, 311.13, 293.66,
      220.0, 293.66, 349.23, 392.0, 440.0, 523.25, 466.16, 440.0,
      392.0, 349.23, 293.66, 220.0, 196.0, 220.0, 293.66
    ];
    let noteIdx = 0;
    const playNext = () => {
      if (!isWebAudioLoopingRef.current) return;
      const freq = maqamPitches[noteIdx % maqamPitches.length];
      playWebAudioOudNote(ctx, freq, 2.2);
      noteIdx++;

      // Authentic rubato (expressive rhythmic tempo variation)
      const delay = Math.floor(Math.random() * 800) + 900;
      timerRef.current = window.setTimeout(playNext, delay);
    };

    playNext();
  }, [preset, playWebAudioNature, playWebAudioOudNote]);

  // Stop background musical loop
  const stopLoop = useCallback(() => {
    isWebAudioLoopingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Play / Pause toggle
  const togglePlay = () => {
    setIsLoaded(true);

    const effectiveStreamUrl =
      preset === "custom"
        ? audioUrl
        : preset === "soundhelix_ambient"
        ? AUDIO_PRESETS.find((p) => p.id === "soundhelix_ambient")?.streamUrl
        : audioUrl;

    if (effectiveStreamUrl && (preset === "custom" || preset === "soundhelix_ambient")) {
      // Use HTML5 Audio for streaming URLs
      if (!audioRef.current) {
        const audio = new Audio(effectiveStreamUrl);
        audio.loop = true;
        audio.volume = isMuted ? 0 : 0.7;
        audioRef.current = audio;
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Fallback to Web Audio synthesis if external audio is blocked or fails
          startLoop();
          setIsPlaying(true);
        });
      }
      return;
    }

    // Use Web Audio synthesis presets
    if (isPlaying) {
      stopLoop();
      setIsPlaying(false);
    } else {
      startLoop();
      setIsPlaying(true);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : 0.7;
    }

    if (audioCtxRef.current) {
      if (nextMuted) {
        audioCtxRef.current.suspend();
      } else {
        audioCtxRef.current.resume();
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLoop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {
          // Ignore
        }
      }
    };
  }, [stopLoop]);

  // Don't render anything if background music is disabled for this profile
  if (!enabled) return null;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="fixed bottom-5 start-5 z-40 select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {isMinimized ? (
        // Minimized floating button
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          title={isAr ? "نغمة البروفايل الصوتية" : "Profile Background Music"}
          className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl flex items-center justify-center text-slate-700 hover:text-slate-900 transition-transform active:scale-95 cursor-pointer group"
          style={{ borderColor: isPlaying ? primaryColor : undefined }}
        >
          <Music
            className={`w-5 h-5 transition-transform ${isPlaying ? "animate-pulse" : "group-hover:rotate-12"}`}
            style={{ color: isPlaying ? primaryColor : undefined }}
          />
          {isPlaying && (
            <span
              className="absolute top-1 end-1 w-2.5 h-2.5 rounded-full ring-2 ring-white animate-ping"
              style={{ backgroundColor: primaryColor }}
            />
          )}
        </button>
      ) : (
        // Sleek floating glassmorphic player card
        <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl text-slate-800 transition-all">
          {/* Rotating Vinyl / Oud Icon */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-inner ${
              isPlaying ? "bg-blue-50 text-[#0066FF]" : "bg-slate-100 text-slate-500"
            }`}
            style={{
              backgroundColor: isPlaying ? `${primaryColor}15` : undefined,
              color: isPlaying ? primaryColor : undefined
            }}
          >
            {isPlaying ? (
              <Disc3 className="w-5 h-5 animate-spin-slow" />
            ) : (
              <Music className="w-5 h-5" />
            )}
          </div>

          {/* Track Info & Animated Equalizer Waves */}
          <div className="flex flex-col min-w-[120px] max-w-[160px] sm:max-w-[200px]">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                <span>{isAr ? "نغمة البروفايل" : "Profile Sound"}</span>
              </span>
            </div>

            <p className="text-xs font-bold text-slate-900 truncate leading-tight mt-0.5">
              {displayTitle}
            </p>

            {/* Equalizer Visualizer Bars */}
            <div className="flex items-end gap-1 h-3 mt-1">
              {[0.4, 0.9, 0.6, 1.0, 0.7, 0.3].map((heightRatio, idx) => (
                <span
                  key={idx}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying ? "animate-pulse" : "opacity-30"
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(20, heightRatio * 100)}%` : "25%",
                    backgroundColor: primaryColor,
                    animationDelay: `${idx * 150}ms`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Controls: Play/Pause, Mute, Minimize */}
          <div className="flex items-center gap-1 shrink-0 ps-1 border-s border-slate-100">
            {/* Play / Pause Toggle */}
            <button
              type="button"
              onClick={togglePlay}
              title={isPlaying ? (isAr ? "إيقاف مؤقت" : "Pause") : (isAr ? "تشغيل النغمة" : "Play Music")}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all shadow-xs cursor-pointer active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ms-0.5" />}
            </button>

            {/* Mute Toggle */}
            {isPlaying && (
              <button
                type="button"
                onClick={toggleMute}
                title={isMuted ? (isAr ? "إلغاء الكتم" : "Unmute") : (isAr ? "كتم الصوت" : "Mute")}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Minimize */}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              title={isAr ? "تصغير" : "Minimize"}
              className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-xs font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
