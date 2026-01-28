from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import random

WIDTH, HEIGHT = 1600, 900
OUTPUT = Path(__file__).resolve().parent.parent / "images" / "about-image.png"


def lerp(a, b, t):
    return int(a + (b - a) * t)


def create_gradient_background():
    img = Image.new("RGB", (WIDTH, HEIGHT), "#0b1b3a")
    pixels = img.load()
    for y in range(HEIGHT):
        t = y / HEIGHT
        r = lerp(11, 25, t)
        g = lerp(27, 108, t)
        b = lerp(58, 235, t)
        for x in range(WIDTH):
            pixels[x, y] = (r, g, b)
    return img


def add_diagonal_band(base):
    band = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    band_draw = ImageDraw.Draw(band)
    for i in range(20):
        opacity = int(255 * (1 - i / 20) * 0.18)
        color = (15, 118, 255, opacity)
        band_draw.polygon([
            (-200 + i * 40, -100 + i * 20),
            (WIDTH + 200 + i * 40, -120 + i * 20),
            (WIDTH + 200 - i * 40, HEIGHT + 120 - i * 20),
            (-200 - i * 40, HEIGHT + 100 - i * 20),
        ], fill=color)
    return Image.alpha_composite(base.convert("RGBA"), band).convert("RGBA")


def add_network_overlay(base):
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    random.seed(42)
    nodes = [
        (random.randint(150, WIDTH - 200), random.randint(180, HEIGHT - 150))
        for _ in range(18)
    ]
    for i in range(len(nodes)):
        for j in range(i + 1, len(nodes)):
            if random.random() < 0.15:
                draw.line([nodes[i], nodes[j]], fill=(255, 255, 255, 40), width=2)
    for (x, y) in nodes:
        draw.ellipse((x - 6, y - 6, x + 6, y + 6), fill=(59, 130, 246, 220))
        draw.ellipse((x - 12, y - 12, x + 12, y + 12), outline=(255, 255, 255, 120), width=2)
    return Image.alpha_composite(base, overlay)


def add_pillar_blocks(base):
    blocks = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(blocks)
    pillars = [
        ("Strategy", "Data-driven roadmaps"),
        ("Platforms", "Unified logistics stack"),
        ("Operations", "Real-time orchestration"),
    ]
    block_width = 360
    block_height = 140
    start_x = 180
    start_y = 580
    spacing = 30
    try:
        title_font = ImageFont.truetype("arial.ttf", 42)
        subtitle_font = ImageFont.truetype("arial.ttf", 24)
    except OSError:
        title_font = subtitle_font = ImageFont.load_default()
    for idx, (title, subtitle) in enumerate(pillars):
        x = start_x + idx * (block_width + spacing)
        y = start_y
        rect = (x, y, x + block_width, y + block_height)
        draw.rounded_rectangle(
            rect,
            radius=28,
            fill=(11, 27, 58, 220),
            outline=(59, 130, 246, 120),
            width=2,
        )
        draw.text((x + 30, y + 30), title, font=title_font, fill=(255, 255, 255, 255))
        draw.text(
            (x + 30, y + 80),
            subtitle,
            font=subtitle_font,
            fill=(148, 180, 255, 255),
        )
    return Image.alpha_composite(base, blocks)


def add_main_text(base):
    final = base.convert("RGB")
    draw = ImageDraw.Draw(final)
    try:
        title_font = ImageFont.truetype("arial.ttf", 86)
        subtitle_font = ImageFont.truetype("arial.ttf", 36)
        body_font = ImageFont.truetype("arial.ttf", 28)
    except OSError:
        title_font = subtitle_font = body_font = ImageFont.load_default()
    text_x = 140
    text_y = 180
    draw.text((text_x, text_y), "InfoLogix", font=title_font, fill=(255, 255, 255))
    draw.text(
        (text_x, text_y + 110),
        "Logistics Intelligence Suite",
        font=subtitle_font,
        fill=(199, 220, 255),
    )
    body_lines = [
        "Trusted partner for digital transformation across Middle East logistics",
        "Combining consulting, platforms, and 24/7 operations stewardship",
    ]
    for i, line in enumerate(body_lines):
        draw.text((text_x, text_y + 180 + i * 42), line, font=body_font, fill=(211, 226, 255))
    final = final.filter(ImageFilter.GaussianBlur(radius=0.3))
    final.save(OUTPUT, quality=95)


def main():
    image = create_gradient_background()
    image = add_diagonal_band(image)
    image = add_network_overlay(image)
    image = add_pillar_blocks(image)
    add_main_text(image)
    print(f"Saved {OUTPUT}")


if __name__ == "__main__":
    main()
