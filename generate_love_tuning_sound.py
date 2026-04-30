import numpy as np
from scipy.io.wavfile import write

# =====================
# 恋愛運チューニング音源 Generator
# =====================

sample_rate = 44_100
duration = 180  # 秒。3分
volume = 0.35

t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)

# ベース周波数
# 528Hz：愛・調和系のイメージでよく使われる周波数
# 432Hz：落ち着き・リラックス系の演出
base_528 = np.sin(2 * np.pi * 528 * t)
base_432 = np.sin(2 * np.pi * 432 * t)

# 柔らかい倍音
harmonic_264 = np.sin(2 * np.pi * 264 * t) * 0.5
harmonic_132 = np.sin(2 * np.pi * 132 * t) * 0.35

# ゆっくり揺れるLFO
lfo = 0.5 + 0.5 * np.sin(2 * np.pi * 0.08 * t)

# ドローン音
drone = (
    base_528 * 0.35
    + base_432 * 0.25
    + harmonic_264 * 0.25
    + harmonic_132 * 0.15
)

drone *= lfo

# 簡易アンビエントパッド
pad = np.sin(2 * np.pi * 66 * t) * 0.25
pad += np.sin(2 * np.pi * 99 * t) * 0.18
pad *= 0.5 + 0.5 * np.sin(2 * np.pi * 0.03 * t)

# ノイズを薄く入れて空気感を作る
noise = np.random.normal(0, 0.03, len(t))
noise *= 0.2 + 0.8 * np.sin(np.pi * t / duration)

# 全体ミックス
audio = drone + pad + noise

# フェードイン・フェードアウト
fade_duration = 8
fade_samples = int(sample_rate * fade_duration)

fade_in = np.linspace(0, 1, fade_samples)
fade_out = np.linspace(1, 0, fade_samples)

audio[:fade_samples] *= fade_in
audio[-fade_samples:] *= fade_out

# 正規化
audio = audio / np.max(np.abs(audio))
audio = audio * volume

# ステレオ化
left = audio
right = (
    np.sin(2 * np.pi * 530 * t) * 0.18
    + np.sin(2 * np.pi * 432 * t) * 0.22
    + pad * 0.6
    + noise * 0.5
)

right = right / np.max(np.abs(right)) * volume

stereo_audio = np.stack([left, right], axis=1)

# 16bit WAVに変換
stereo_audio_int16 = np.int16(stereo_audio * 32767)

write("love_tuning_sound.wav", sample_rate, stereo_audio_int16)

print("love_tuning_sound.wav を作成しました")
