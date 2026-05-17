# this is for generating the image 

from PIL import Image
import os

FLAG = "CTF{st3g0_lsb_1m4g3_s3cr3t}"

def embed_lsb(image_path: str, message: str, output_path: str):
    img = Image.open(image_path).convert("RGB")
    pixels = list(img.getdata())

    binary_msg = ''.join(format(ord(c), '08b') for c in message)
    binary_msg += '00000000'  # null terminator

    if len(binary_msg) > len(pixels) * 3:
        raise ValueError("Message too long for image")

    new_pixels = []
    bit_idx = 0
    for pixel in pixels:
        r, g, b = pixel
        if bit_idx < len(binary_msg):
            r = (r & ~1) | int(binary_msg[bit_idx])
            bit_idx += 1
        if bit_idx < len(binary_msg):
            g = (g & ~1) | int(binary_msg[bit_idx])
            bit_idx += 1
        if bit_idx < len(binary_msg):
            b = (b & ~1) | int(binary_msg[bit_idx])
            bit_idx += 1
        new_pixels.append((r, g, b))

    new_img = Image.new("RGB", img.size)
    new_img.putdata(new_pixels)
    new_img.save(output_path)
    print(f"[+] Stego image saved to {output_path}")


def create_base_image(path: str):
    """Create a visually interesting base image."""
    width, height = 800, 600
    img = Image.new("RGB", (width, height))
    pixels = []
    for y in range(height):
        for x in range(width):
            r = int((x / width) * 100) + 20
            g = int((y / height) * 80) + 40
            b = int(((x + y) / (width + height)) * 60) + 60
            # Add some noise pattern
            if (x + y) % 20 < 2:
                r, g, b = 30, 80, 30
            pixels.append((r, g, b))
    img.putdata(pixels)
    img.save(path)
    print(f"[+] Base image created at {path}")


if __name__ == "__main__":
    static_dir = os.path.join(os.path.dirname(__file__), "static")
    os.makedirs(static_dir, exist_ok=True)

    base_path = os.path.join(static_dir, "base.png")
    output_path = os.path.join(static_dir, "stego_image.png")

    create_base_image(base_path)
    embed_lsb(base_path, FLAG, output_path)
    os.remove(base_path)
    print("[+] Done! stego_image.png is ready.")
    print(f"[+] Hidden flag: {FLAG}")
