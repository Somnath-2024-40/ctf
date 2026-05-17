#!/usr/bin/env bash
set -e

echo "[+] Installing Python dependencies..."
pip install -r requirements.txt

echo "[+] Generating steganography image for Flag 7..."
python generate_stego.py

echo "[+] Build complete."
