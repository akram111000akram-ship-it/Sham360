/**
 * Embedded Audio URL Parser for Zero-Storage Profile Background Music
 * Resolves YouTube, SoundCloud, Spotify, and direct audio streams.
 */

export interface EmbeddedAudioInfo {
  type: "youtube" | "spotify" | "soundcloud" | "direct" | "unknown";
  embedUrl?: string;
  originalUrl: string;
  videoId?: string;
  spotifyId?: string;
  spotifyType?: "track" | "playlist" | "album";
  providerLabelAr: string;
  providerLabelEn: string;
  iconName: string;
}

export function parseEmbeddedAudioUrl(url: string): EmbeddedAudioInfo {
  if (!url || typeof url !== "string") {
    return {
      type: "unknown",
      originalUrl: "",
      providerLabelAr: "غير محدد",
      providerLabelEn: "Unknown",
      iconName: "music"
    };
  }
  const trimmed = url.trim();

  // 1. YouTube Detection
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: "youtube",
      originalUrl: trimmed,
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&playsinline=1&modestbranding=1`,
      providerLabelAr: "يوتيوب (YouTube)",
      providerLabelEn: "YouTube Audio",
      iconName: "youtube"
    };
  }

  // 2. Spotify Detection
  const spotifyMatch = trimmed.match(/open\.spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/i);
  if (spotifyMatch && spotifyMatch[1] && spotifyMatch[2]) {
    const spotifyType = spotifyMatch[1] as "track" | "playlist" | "album";
    const spotifyId = spotifyMatch[2];
    return {
      type: "spotify",
      originalUrl: trimmed,
      spotifyId,
      spotifyType,
      embedUrl: `https://open.spotify.com/embed/${spotifyType}/${spotifyId}?utm_source=generator&theme=0`,
      providerLabelAr: "سبوتيفاي (Spotify)",
      providerLabelEn: "Spotify Track",
      iconName: "spotify"
    };
  }

  // 3. SoundCloud Detection
  if (trimmed.includes("soundcloud.com/")) {
    return {
      type: "soundcloud",
      originalUrl: trimmed,
      embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(
        trimmed
      )}&color=%230066ff&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`,
      providerLabelAr: "ساوندكلاود (SoundCloud)",
      providerLabelEn: "SoundCloud",
      iconName: "soundcloud"
    };
  }

  // 4. Direct Audio File (.mp3, .ogg, .wav, etc.) or streaming link
  if (trimmed.match(/\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i) || trimmed.startsWith("http")) {
    return {
      type: "direct",
      originalUrl: trimmed,
      embedUrl: trimmed,
      providerLabelAr: "بث صوتي مباشر (Direct MP3)",
      providerLabelEn: "Direct Audio Stream",
      iconName: "radio"
    };
  }

  return {
    type: "unknown",
    originalUrl: trimmed,
    providerLabelAr: "رابط خارجي",
    providerLabelEn: "External Link",
    iconName: "link"
  };
}
