#!/usr/bin/env bash
# Turns a screen recording into a small project clip and its poster image.
# Use: scripts/import-clip.sh <input video> <project file name> [start s] [length s] [poster time s]
# Writes public/assets/projects/<name>.mp4 (720p, no sound) and <name>.jpg.
set -euo pipefail
input="$1"; name="$2"; start="${3:-0}"; length="${4:-12}"; poster="${5:-4}"
out="$(dirname "$0")/../public/assets/projects"
ffmpeg -y -loglevel error -ss "$start" -t "$length" -i "$input" -an \
    -vf "scale=1280:-2:flags=lanczos,fps=24" -c:v libx264 -crf 30 -preset slow \
    -pix_fmt yuv420p -movflags +faststart "$out/$name.mp4"
ffmpeg -y -loglevel error -ss "$poster" -i "$out/$name.mp4" -frames:v 1 -q:v 3 "$out/$name.jpg"
ls -la "$out/$name.mp4" "$out/$name.jpg" | awk '{printf "%8.0f KB  %s\n", $5/1024, $9}'
