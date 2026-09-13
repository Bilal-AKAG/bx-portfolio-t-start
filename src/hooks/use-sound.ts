"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAudioContext, decodeAudioData } from "#/lib/sound-engine";
import type {
  SoundAsset,
  UseSoundOptions,
  UseSoundReturn,
} from "#/lib/sound-types";

export function useSound(
  sound: SoundAsset,
  options: UseSoundOptions = {}
): UseSoundReturn {
  const {
    volume = 1,
    playbackRate = 1,
    interrupt = false,
    soundEnabled = true,
    onPlay,
    onEnd,
    onPause,
    onStop,
  } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(
    sound.duration ?? null
  );
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const decodePromiseRef = useRef<Promise<AudioBuffer> | null>(null);

  // Decoded lazily on first play: no AudioContext creation, base64 decode,
  // or main-thread work on page load when the user may never press anything.
  const ensureBuffer = useCallback(() => {
    if (!decodePromiseRef.current) {
      decodePromiseRef.current = decodeAudioData(sound.dataUri).then(
        (buffer) => {
          bufferRef.current = buffer;
          setDuration(buffer.duration);
          return buffer;
        }
      );
    }

    return decodePromiseRef.current;
  }, [sound.dataUri]);

  const stop = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
      } catch {
        // Already stopped
      }
      sourceRef.current = null;
    }
    setIsPlaying(false);
    onStop?.();
  }, [onStop]);

  const play = useCallback(
    (overrides?: { volume?: number; playbackRate?: number }) => {
      if (!soundEnabled) return;

      if (!bufferRef.current) {
        // First interaction warms the cache, then plays.
        void ensureBuffer().then(() => play(overrides));
        return;
      }

      const ctx = getAudioContext();

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (interrupt && sourceRef.current) {
        stop();
      }

      const source = ctx.createBufferSource();
      const gain = ctx.createGain();

      source.buffer = bufferRef.current;
      source.playbackRate.value = overrides?.playbackRate ?? playbackRate;
      gain.gain.value = overrides?.volume ?? volume;

      source.connect(gain);
      gain.connect(ctx.destination);

      source.onended = () => {
        setIsPlaying(false);
        onEnd?.();
      };

      source.start(0);
      sourceRef.current = source;
      setIsPlaying(true);
      onPlay?.();
    },
    [soundEnabled, playbackRate, volume, interrupt, stop, onPlay, onEnd, ensureBuffer]
  );

  const pause = useCallback(() => {
    stop();
    onPause?.();
  }, [stop, onPause]);

  useEffect(() => {
    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch {
          // Already stopped
        }
      }
    };
  }, []);

  return [play, { stop, pause, isPlaying, duration, sound }] as const;
}
