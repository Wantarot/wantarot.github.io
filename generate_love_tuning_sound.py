"""Generate an ambient stereo WAV track.

Usage:
  python3 generate_love_tuning_sound.py
  python3 generate_love_tuning_sound.py --output my_sound.wav --duration 180 --seed 42
"""

from __future__ import annotations

import argparse
from pathlib import Path


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="恋愛運チューニング風の音源をWAVで生成します")
    parser.add_argument("--output", default="love_tuning_sound.wav", help="出力するWAVファイル名")
    parser.add_argument("--duration", type=float, default=180.0, help="長さ（秒）")
    parser.add_argument("--sample-rate", type=int, default=44_100, help="サンプルレート")
    parser.add_argument("--volume", type=float, default=0.35, help="最終音量（0.0〜1.0推奨）")
    parser.add_argument("--seed", type=int, default=None, help="ノイズの乱数シード（再現性用）")
    return parser


def main() -> None:
    try:
        import numpy as np
        from scipy.io.wavfile import write
    except ModuleNotFoundError as exc:
        missing = exc.name or "required dependency"
        raise SystemExit(
            f"'{missing}' がインストールされていません。"
            "先に `pip install numpy scipy` を実行してください。"
        ) from exc

    args = build_parser().parse_args()

    if args.duration <= 0:
        raise SystemExit("--duration は 0 より大きい値を指定してください。")
    if args.sample_rate <= 0:
        raise SystemExit("--sample-rate は 0 より大きい値を指定してください。")
    if args.volume <= 0:
        raise SystemExit("--volume は 0 より大きい値を指定してください。")

    if args.seed is not None:
        np.random.seed(args.seed)

    t = np.linspace(0, args.duration, int(args.sample_rate * args.duration), endpoint=False)

    base_528 = np.sin(2 * np.pi * 528 * t)
    base_432 = np.sin(2 * np.pi * 432 * t)
    harmonic_264 = np.sin(2 * np.pi * 264 * t) * 0.5
    harmonic_132 = np.sin(2 * np.pi * 132 * t) * 0.35
    lfo = 0.5 + 0.5 * np.sin(2 * np.pi * 0.08 * t)

    drone = (
        base_528 * 0.35
        + base_432 * 0.25
        + harmonic_264 * 0.25
        + harmonic_132 * 0.15
    ) * lfo

    pad = np.sin(2 * np.pi * 66 * t) * 0.25
    pad += np.sin(2 * np.pi * 99 * t) * 0.18
    pad *= 0.5 + 0.5 * np.sin(2 * np.pi * 0.03 * t)

    noise = np.random.normal(0, 0.03, len(t))
    noise *= 0.2 + 0.8 * np.sin(np.pi * t / args.duration)

    audio = drone + pad + noise

    fade_duration = min(8, args.duration / 2)
    fade_samples = int(args.sample_rate * fade_duration)
    if fade_samples > 0:
        fade_in = np.linspace(0, 1, fade_samples)
        fade_out = np.linspace(1, 0, fade_samples)
        audio[:fade_samples] *= fade_in
        audio[-fade_samples:] *= fade_out

    audio = audio / np.max(np.abs(audio))
    left = audio * args.volume

    right = (
        np.sin(2 * np.pi * 530 * t) * 0.18
        + np.sin(2 * np.pi * 432 * t) * 0.22
        + pad * 0.6
        + noise * 0.5
    )
    right = right / np.max(np.abs(right)) * args.volume

    stereo_audio = np.stack([left, right], axis=1)
    stereo_audio_int16 = np.int16(stereo_audio * 32767)

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    write(str(output), args.sample_rate, stereo_audio_int16)

    print(f"{output} を作成しました")


if __name__ == "__main__":
    main()
