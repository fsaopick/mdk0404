#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$ROOT_DIR/artifacts/screenshots"

mkdir -p "$OUTPUT_DIR"

docker compose -f "$ROOT_DIR/docker-compose.yml" build

docker run --rm \
  --name xeyes-shot \
  -v "$OUTPUT_DIR:/output" \
  mdk-xeyes:latest \
  sh -lc 'Xvfb :99 -screen 0 1280x800x24 >/tmp/xvfb.log 2>&1 & until [ -S /tmp/.X11-unix/X99 ]; do sleep 0.1; done; export DISPLAY=:99; xeyes -geometry 300x180 >/tmp/app.log 2>&1 & sleep 3; import -display :99 -window root /output/xeyes.png'

docker run --rm \
  --name calc-shot \
  -v "$OUTPUT_DIR:/output" \
  mdk-calc:latest \
  sh -lc 'Xvfb :99 -screen 0 1280x800x24 >/tmp/xvfb.log 2>&1 & until [ -S /tmp/.X11-unix/X99 ]; do sleep 0.1; done; export DISPLAY=:99; java -jar /opt/calc/calc.jar >/tmp/app.log 2>&1 & sleep 3; import -display :99 -window root /output/calc.png'

docker run --rm \
  --name python-gui-shot \
  -v "$OUTPUT_DIR:/output" \
  mdk-python-gui:latest \
  sh -lc 'Xvfb :99 -screen 0 1280x800x24 >/tmp/xvfb.log 2>&1 & until [ -S /tmp/.X11-unix/X99 ]; do sleep 0.1; done; export DISPLAY=:99; python3 /opt/app/app.py >/tmp/app.log 2>&1 & sleep 3; import -display :99 -window root /output/python-gui.png'

echo "Screenshots saved to $OUTPUT_DIR"
