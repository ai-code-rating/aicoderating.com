# Draws src/assets/img/og-image.png, the 1200x630 link preview image.
# Run from the project root: python3 scripts/make-og-image.py  (needs Pillow; downloads TTF fonts on first run)
import os, re, urllib.request
FONT_DIR = os.path.join(os.path.dirname(__file__), ".fonts")  # gitignored cache
QUERIES = {
    "Archivo_wdth_wght_125_900.ttf": "Archivo:wdth,wght@125,900",
    "Archivo_wdth_wght_115_700.ttf": "Archivo:wdth,wght@115,700",
    "Martian_Mono_wght_800.ttf": "Martian+Mono:wght@800",
    "IBM_Plex_Sans_wght_400.ttf": "IBM+Plex+Sans:wght@400",
    "IBM_Plex_Sans_wght_600.ttf": "IBM+Plex+Sans:wght@600",
}
os.makedirs(FONT_DIR, exist_ok=True)
for name, q in QUERIES.items():
    path = os.path.join(FONT_DIR, name)
    if not os.path.exists(path):
        css = urllib.request.urlopen("https://fonts.googleapis.com/css2?family=" + q).read().decode()
        urllib.request.urlretrieve(re.search(r"url\((https://[^)]+)\)", css).group(1), path)

from PIL import Image, ImageDraw, ImageFont
W, H = 1200, 630
PAPER, SURFACE, INK, MUTED, LINE = "#F1F3F6", "#FFFFFF", "#131A23", "#576271", "#D3D9E1"
P = ["#2140B5", "#9A5300", "#0A7260"]
F = lambda n, s: ImageFont.truetype(os.path.join(FONT_DIR, n), s)
display = "Archivo_wdth_wght_125_900.ttf"; label = "Archivo_wdth_wght_115_700.ttf"
mono = "Martian_Mono_wght_800.ttf"; body = "IBM_Plex_Sans_wght_400.ttf"; bodyb = "IBM_Plex_Sans_wght_600.ttf"

im = Image.new("RGB", (W, H), PAPER); d = ImageDraw.Draw(im)
X = 72
# brand: three bars + name
for i, c in enumerate(P): d.rectangle([X + i * 15, 70, X + i * 15 + 10, 104], fill=c)
d.text((X + 58, 87), "AI CODE RATING", font=F(display, 34), fill=INK, anchor="lm")
# headline
hf = F(display, 64)
d.text((X, 190), "Who Wrote", font=hf, fill=INK)
d.text((X, 270), "the Code?", font=hf, fill=INK)
bf = F(body, 26)
d.text((X, 410), "Three characters that disclose how AI", font=bf, fill=MUTED)
d.text((X, 446), "was used in a code project.", font=bf, fill=MUTED)
d.text((X, 540), "aicoderating.com", font=F(bodyb, 26), fill=INK)

# rating plate
px0, py0, px1, py1 = 700, 140, 1128, 500
d.rectangle([px0, py0, px1, py1], fill=SURFACE, outline=INK, width=4)
lf = F(label, 16)
d.text((px0 + 28, py0 + 30), "EXAMPLE RATING", font=lf, fill=MUTED, anchor="lm")
d.line([px0 + 28, py0 + 54, px1 - 28, py0 + 54], fill=LINE, width=2)
cw = (px1 - px0 - 56) / 3
chars = ["A", "2", "b"]; names = ["MAINTAINER", "AI SHARE", "OVERSIGHT"]; vals = ["Expert", "26–50%", "Reviewed"]
mf, nf, vf = F(mono, 118), F(label, 17), F(body, 20)
for i in range(3):
    cx = px0 + 28 + cw * i + cw / 2
    d.text((cx, py0 + 170), chars[i], font=mf, fill=P[i], anchor="mm")
    d.line([cx - cw * 0.32, py0 + 250, cx - cw * 0.32, py0 + 260, cx + cw * 0.32, py0 + 260, cx + cw * 0.32, py0 + 250], fill=P[i], width=3)
    d.text((cx, py0 + 290), names[i], font=nf, fill=P[i], anchor="mm")
    d.text((cx, py0 + 320), vals[i], font=vf, fill=MUTED, anchor="mm")
im.save(os.path.join(os.path.dirname(__file__), "..", "src", "assets", "img", "og-image.png"), optimize=True)
