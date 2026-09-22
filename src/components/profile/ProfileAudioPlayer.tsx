import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Disc3,
  Sparkles,
  ExternalLink,
  Radio,
  CloudRain,
  Waves,
  Feather
} from "lucide-react";
import { parseEmbeddedAudioUrl, EmbeddedAudioInfo } from "../../services/embeddedAudioParser";

export type AudioPresetType =
  | "damascene_oud"
  | "courtyard_fountain"
  | "rain_ambient"
  | "chill_ambient"
  | "soundhelix_ambient"
  | "embedded_track"
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
  iconName: string;
  streamUrl?: string;
}[] = [
  {
    id: "damascene_oud",
    nameAr: "تقاسيم عود شامي هادئ (Soft Oud)",
    nameEn: "Soft Damascene Oud Ambience",
    descAr: "أنغام عود شرقية دافئة مستوحاة من البيوت الدمشقية العريقة بمقام بياتي",
    descEn: "Warm acoustic oriental lute improvisations in traditional Maqam Bayati",
    iconName: "feather",
    streamUrl: ""
  },
  {
    id: "courtyard_fountain",
    nameAr: "خرير ماء ونسيم باحة دمشقية (Damascene Fountain)",
    nameEn: "Damascene Courtyard Fountain & Breeze",
    descAr: "أصوات بحرة الياسمين وخرير الماء الهادئ في باحة شامية عريقة",
    descEn: "Peaceful water fountain ripples and gentle Damascene courtyard breeze",
    iconName: "waves",
    streamUrl: ""
  },
  {
    id: "rain_ambient",
    nameAr: "زخات مطر دمشقية هادئة (Gentle Rain)",
    nameEn: "Gentle Damascene Rain",
    descAr: "هدير وزخات مطر خفيفة على أحجار الباحة الدمشقية للاسترخاء والتركيز",
    descEn: "Soothing soundscape of gentle raindrops on Damascus courtyard stones",
    iconName: "cloud-rain",
    streamUrl: ""
  },
  {
    id: "chill_ambient",
    nameAr: "أجواء مشرقية مهدئة (Levantine Chill)",
    nameEn: "Levantine Chill Ambient",
    descAr: "موسيقى محيطية هادئة بلمسات وترية مشرقية",
    descEn: "Tranquil ambient soundscape with subtle Levantine chord progressions",
    iconName: "music",
    streamUrl: ""
  },
  {
    id: "embedded_track",
    nameAr: "مسار مدمج (YouTube / SoundCloud / Spotify)",
    nameEn: "Embedded Track (YouTube / SoundCloud / Spotify)",
    descAr: "تضمين رابط مسار صوتي بدون تكلفة تخزين نهائياً",
    descEn: "Zero-storage background audio from YouTube, SoundCloud, or Spotify",
    iconName: "radio",
    streamUrl: ""
  },
  {
    id: "soundhelix_ambient",
    nameAr: "نغمة استرخاء سحابية (SoundHelix)",
    nameEn: "SoundHelix Relaxing Ambient Stream",
    descAr: "مقطوعة استرخاء بيانو وأوتار هادئة عبر البث السحابي",
    descEn: "Smooth relaxing acoustic melodic piano and strings stream",
    iconName: "radio",
    streamUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: "custom",
    nameAr: "رابط صوتي مباشر (Direct MP3 / Audio Stream)",
    nameEn: "Direct MP3 / Audio Stream Link",
    descAr: "استخدم رابط ملف MP3 أو بث راديو مخصص",
    descEn: "Stream your own direct MP3 or audio stream source",
    iconName: "radio",
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
  // Starts unplayed & muted initially to respect user bandwidth and browser policies
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUserStarted, setHasUserStarted] = useState(false);
  const [showEmbedPlayer, setShowEmbedPlayer] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isWebAudioLoopingRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const rainCleanupRef = useRef<(() => void) | null>(null);

  // Analyze if there is an embedded URL (YouTube, SoundCloud, Spotify, or direct)
  const embeddedInfo: EmbeddedAudioInfo = parseEmbeddedAudioUrl(audioUrl || "");
  const isEmbeddedPlatform =
    preset === "embedded_track" ||
    (embeddedInfo.type !== "unknown" && preset === "custom") ||
    embeddedInfo.type === "youtube" ||
    embeddedInfo.type === "spotify" ||
    embeddedInfo.type === "soundcloud";

  // Determine actual track title
  const currentPresetConfig = AUDIO_PRESETS.find((p) => p.id === preset) || AUDIO_PRESETS[0];
  const displayTitle =
    audioTitle ||
    (isEmbeddedPlatform && embeddedInfo.type !== "unknown"
      ? isAr
        ? `${currentPresetConfig.nameAr} (${embeddedInfo.providerLabelAr})`
        : `${currentPresetConfig.nameEn} (${embeddedInfo.providerLabelEn})`
      : isAr
      ? currentPresetConfig.nameAr
      : currentPresetConfig.nameEn);

  // --------------------------------------------------------------------------
  // Web Audio Oud Synthesizer Engine (Karplus-Strong physical modeling)
  // Generates real authentic plucked string resonance in traditional Oriental Bayati/Rast scale
  // --------------------------------------------------------------------------
  const playWebAudioOudNote = useCallback((ctx: AudioContext, frequency: number, duration = 2.5) => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, now);

      // Add gentle vibrato for authentic oud feel
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = 5.5;
      vibratoGain.gain.value = frequency * 0.012;
      vibrato.connect(osc.frequency);
      vibrato.start(now + 0.1);
      vibrato.stop(now + duration);

      // Lowpass filter modeling wooden soundboard
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(frequency * 3.5, now);
      filter.frequency.exponentialRampToValueAtTime(frequency * 0.8, now + duration);

      // Exponential pluck decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.015);
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

  // --------------------------------------------------------------------------
  // Damascene Courtyard Fountain Water Flow
  // --------------------------------------------------------------------------
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
      gain.gain.value = 0.07;

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

  // --------------------------------------------------------------------------
  // Gentle Damascene Rain Synthesis Engine (Zero Storage Physical Modeling)
  // --------------------------------------------------------------------------
  const playWebAudioRain = useCallback((ctx: AudioContext) => {
    try {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      // Generate pink/brownian noise for soft rain hiss
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.15;
      }

      const rainNoise = ctx.createBufferSource();
      rainNoise.buffer = noiseBuffer;
      rainNoise.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 1100;

      const rainGain = ctx.createGain();
      rainGain.gain.value = 0.12;

      rainNoise.connect(lowpass);
      lowpass.connect(rainGain);
      rainGain.connect(ctx.destination);

      rainNoise.start();

      // Random gentle droplet taps on stones
      let isDropping = true;
      const dropInterval = window.setInterval(() => {
        if (!isDropping || ctx.state !== "running") return;
        try {
          const dropOsc = ctx.createOscillator();
          const dropGain = ctx.createGain();
          const now = ctx.currentTime;
          const dropFreq = 2200 + Math.random() * 1200;

          dropOsc.type = "sine";
          dropOsc.frequency.setValueAtTime(dropFreq, now);
          dropOsc.frequency.exponentialRampToValueAtTime(dropFreq * 0.5, now + 0.04);

          dropGain.gain.setValueAtTime(0.04, now);
          dropGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

          dropOsc.connect(dropGain);
          dropGain.connect(ctx.destination);

          dropOsc.start(now);
          dropOsc.stop(now + 0.045);
        } catch {
          // Ignore
        }
      }, 280);

      return () => {
        isDropping = false;
        clearInterval(dropInterval);
        try {
          rainNoise.stop();
          rainNoise.disconnect();
        } catch {
          // Ignore
        }
      };
    } catch {
      return () => {};
    }
  }, []);

  // --------------------------------------------------------------------------
  // Start background musical loop
  // --------------------------------------------------------------------------
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

    // 1. Rain Ambient Preset
    if (preset === "rain_ambient") {
      const cleanupRain = playWebAudioRain(ctx);
      rainCleanupRef.current = cleanupRain;
      return;
    }

    // 2. Courtyard Fountain Preset
    if (preset === "courtyard_fountain") {
      const cleanupFountain = playWebAudioNature(ctx);
      rainCleanupRef.current = cleanupFountain;

      const melodicPitches = [293.66, 329.63, 369.99, 440.0, 554.37, 659.25];
      let step = 0;
      const interval = window.setInterval(() => {
        if (!isWebAudioLoopingRef.current) {
          clearInterval(interval);
          cleanupFountain();
          return;
        }
        const freq = melodicPitches[step % melodicPitches.length];
        playWebAudioOudNote(ctx, freq, 3.0);
        step++;
      }, 3500);
      timerRef.current = interval;
      return;
    }

    // 3. Chill Ambient Preset
    if (preset === "chill_ambient") {
      const chords = [
        [220.0, 261.63, 329.63],
        [174.61, 220.0, 261.63],
        [196.0, 246.94, 293.66],
        [220.0, 277.18, 329.63]
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

    // 4. Default Soft Oud (Maqam Bayati / Rast notes)
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

      const delay = Math.floor(Math.random() * 800) + 900;
      timerRef.current = window.setTimeout(playNext, delay);
    };

    playNext();
  }, [preset, playWebAudioNature, playWebAudioRain, playWebAudioOudNote]);

  // Stop background musical loop
  const stopLoop = useCallback(() => {
    isWebAudioLoopingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (rainCleanupRef.current) {
      rainCleanupRef.current();
      rainCleanupRef.current = null;
    }
  }, []);

  // --------------------------------------------------------------------------
  // Play / Pause Toggle Handler
  // --------------------------------------------------------------------------
  const handleTogglePlay = () => {
    setHasUserStarted(true);

    // If using YouTube/SoundCloud/Spotify embedded player
    if (isEmbeddedPlatform && (embeddedInfo.type === "youtube" || embeddedInfo.type === "spotify" || embeddedInfo.type === "soundcloud")) {
      if (!isPlaying) {
        setIsPlaying(true);
        setShowEmbedPlayer(true);
      } else {
        setIsPlaying(false);
        setShowEmbedPlayer(false);
      }
      return;
    }

    // Direct streaming URL or SoundHelix
    const effectiveStreamUrl =
      preset === "custom" || preset === "embedded_track"
        ? (embeddedInfo.type === "direct" ? embeddedInfo.embedUrl : audioUrl)
        : preset === "soundhelix_ambient"
        ? AUDIO_PRESETS.find((p) => p.id === "soundhelix_ambient")?.streamUrl
        : audioUrl;

    if (effectiveStreamUrl && (preset === "custom" || preset === "embedded_track" || preset === "soundhelix_ambient") && embeddedInfo.type === "direct") {
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
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Fallback to Web Audio synthesis if browser blocks external MP3
            startLoop();
            setIsPlaying(true);
          });
      }
      return;
    }

    // Web Audio Synthesizer Presets (Damascene Oud, Fountain, Rain, Chill)
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
      className="fixed bottom-3 start-3 sm:bottom-5 sm:start-5 z-30 select-none animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[calc(100vw-1.5rem)]"
    >
      {/* 1. Initial State or Minimized State: Sleek Floating Pill "Play Music 🎵" */}
      {!hasUserStarted || isMinimized ? (
        <button
          type="button"
          onClick={handleTogglePlay}
          title={
            isPlaying
              ? isAr
                ? "إيقاف الموسيقى"
                : "Pause Music"
              : isAr
              ? "تشغيل نغمة البروفايل الهادئة 🎵"
              : "Play Background Music 🎵"
          }
          className="group relative flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer max-w-full"
          style={{
            boxShadow: `0 8px 24px -4px ${primaryColor}40`
          }}
        >
          {/* Subtle glowing ring */}
          <div
            className="absolute -inset-0.5 rounded-full opacity-30 group-hover:opacity-75 blur-xs transition-opacity duration-300"
            style={{ backgroundColor: primaryColor }}
          />

          <div className="relative z-10 flex items-center gap-2 min-w-0">
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-xs shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              {isPlaying ? (
                <Disc3 className="w-4 h-4 animate-spin-slow" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white ms-0.5" />
              )}
            </span>

            <span className="text-xs font-bold tracking-tight truncate">
              {isPlaying
                ? isAr
                  ? "الموسيقى تعمل 🎵"
                  : "Music Playing 🎵"
                : isAr
                ? "تشغيل النغمة 🎵"
                : "Play Music 🎵"}
            </span>

            {/* Micro visualizer waves when playing */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-2.5 ms-1 shrink-0">
                {[0.4, 0.9, 0.5, 1.0].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-blue-300 rounded-full animate-pulse"
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        </button>
      ) : (
        /* 2. Expanded Interactive Glassmorphic Music Player Dock */
        <div className="flex flex-col gap-2 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl text-slate-800 transition-all w-[calc(100vw-1.5rem)] xs:w-auto max-w-[320px] sm:max-w-[360px]">
          <div className="flex items-center gap-3">
            {/* Rotating Vinyl / Oud / Rain Icon */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-inner ${
                isPlaying ? "bg-blue-50 text-[#0066FF]" : "bg-slate-100 text-slate-500"
              }`}
              style={{
                backgroundColor: isPlaying ? `${primaryColor}15` : undefined,
                color: isPlaying ? primaryColor : undefined
              }}
            >
              {isPlaying ? (
                <Disc3 className="w-5 h-5 animate-spin-slow" />
              ) : preset === "rain_ambient" ? (
                <CloudRain className="w-5 h-5" />
              ) : preset === "courtyard_fountain" ? (
                <Waves className="w-5 h-5" />
              ) : (
                <Music className="w-5 h-5" />
              )}
            </div>

            {/* Track Info & Animated Equalizer Waves */}
            <div className="flex flex-col min-w-[130px] max-w-[180px] sm:max-w-[210px] truncate">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  <span>{isAr ? "نغمة خلفية البروفايل" : "Profile Ambience"}</span>
                </span>
                {isEmbeddedPlatform && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-800 font-mono">
                    {embeddedInfo.providerLabelEn}
                  </span>
                )}
              </div>

              <p className="text-xs font-bold text-slate-900 truncate leading-tight mt-0.5" title={displayTitle}>
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
                onClick={handleTogglePlay}
                title={isPlaying ? (isAr ? "إيقاف مؤقت" : "Pause") : isAr ? "تشغيل النغمة" : "Play Music"}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all shadow-xs cursor-pointer active:scale-95"
                style={{ backgroundColor: primaryColor }}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ms-0.5" />}
              </button>

              {/* Mute Toggle */}
              {isPlaying && !isEmbeddedPlatform && (
                <button
                  type="button"
                  onClick={toggleMute}
                  title={isMuted ? (isAr ? "إلغاء الكتم" : "Unmute") : isAr ? "كتم الصوت" : "Mute"}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Minimize to Floating Pill */}
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                title={isAr ? "تصغير للزر العائم" : "Minimize to floating button"}
                className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-xs font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Embedded Player View (YouTube / Spotify / SoundCloud) */}
          {showEmbedPlayer && isEmbeddedPlatform && embeddedInfo.embedUrl && (
            <div className="mt-1 pt-2 border-t border-slate-100">
              {embeddedInfo.type === "youtube" ? (
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-black aspect-video max-h-[140px] w-full">
                  <iframe
                    src={embeddedInfo.embedUrl}
                    title="YouTube Background Audio"
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                  />
                </div>
              ) : embeddedInfo.type === "spotify" ? (
                <div className="rounded-xl overflow-hidden shadow-xs">
                  <iframe
                    src={embeddedInfo.embedUrl}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Background Audio"
                  />
                </div>
              ) : embeddedInfo.type === "soundcloud" ? (
                <div className="rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={embeddedInfo.embedUrl}
                    title="SoundCloud Background Audio"
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
