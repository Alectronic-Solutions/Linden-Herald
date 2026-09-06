"""
Generates the Herald's brand assets: favicons, app icons and Open Graph cards.

The mark is a slab-serif H held between two rules, the same double-rule motif
the site uses to separate sections. It is drawn from rectangles rather than set
in a typeface, so it stays identical at 16px and 512px and needs no font.

Run: python3 scripts/brand_assets.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = "public"
INK = (20, 17, 15)
HERALD = (27, 77, 62)
CREAM = (250, 247, 240)
NEWSPRINT = (255, 253, 248)
HARVEST = (184, 134, 47)
CHERRY = (142, 42, 42)

SERIF_BOLD = "/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf"
SERIF_FALLBACK = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed.ttf"


def serif(size):
    for path in (SERIF_BOLD, SERIF_FALLBACK):
        try:
            f = ImageFont.truetype(path, size)
            try:
                f.set_variation_by_name("Bold")
            except Exception:
                pass
            return f
        except Exception:
            continue
    return ImageFont.load_default()


def sans(size):
    try:
        return ImageFont.truetype(SANS, size)
    except Exception:
        return ImageFont.load_default()


def draw_mark(size, bg=HERALD, fg=CREAM, radius_ratio=0.14, padded=True):
    """The H-between-rules mark, drawn proportionally at any size."""
    s = size
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = int(s * radius_ratio)
    if bg is not None:
        d.rounded_rectangle([0, 0, s - 1, s - 1], radius=r, fill=bg)

    u = s / 64.0                      # design grid unit
    inset = 14 * u if padded else 8 * u
    width = s - inset * 2

    # rules above and below
    rule_h = max(2 * u, 1)
    d.rectangle([inset, 13 * u, inset + width, 13 * u + rule_h], fill=fg)
    d.rectangle([inset, 48 * u, inset + width, 48 * u + rule_h], fill=fg)

    # H: two stems, a crossbar, and slab serifs top and bottom
    stem_w = 6 * u
    top, bot = 20 * u, 44 * u
    left_x, right_x = 20 * u, 38 * u
    d.rectangle([left_x, top, left_x + stem_w, bot], fill=fg)
    d.rectangle([right_x, top, right_x + stem_w, bot], fill=fg)
    d.rectangle([left_x, 29 * u, right_x + stem_w, 29 * u + 5 * u], fill=fg)

    serif_w, serif_h = 11 * u, max(2.2 * u, 1)
    for x in (left_x + stem_w / 2, right_x + stem_w / 2):
        for y in (top, bot - serif_h):
            d.rectangle([x - serif_w / 2, y, x + serif_w / 2, y + serif_h], fill=fg)
    return img


def write_favicon_svg():
    """Hand-written SVG mirroring draw_mark, for crisp rendering at any size."""
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="9" fill="rgb{HERALD}"/>
  <g fill="rgb{CREAM}">
    <rect x="14" y="13" width="36" height="2"/>
    <rect x="14" y="48" width="36" height="2"/>
    <rect x="20" y="20" width="6" height="24"/>
    <rect x="38" y="20" width="6" height="24"/>
    <rect x="20" y="29" width="24" height="5"/>
    <rect x="17.5" y="20" width="11" height="2.2"/>
    <rect x="17.5" y="41.8" width="11" height="2.2"/>
    <rect x="35.5" y="20" width="11" height="2.2"/>
    <rect x="35.5" y="41.8" width="11" height="2.2"/>
  </g>
</svg>'''
    open(f"{OUT}/favicon.svg", "w").write(svg)
    print("wrote favicon.svg")


def write_icons():
    ico_sizes = [16, 32, 48]
    frames = [draw_mark(s).convert("RGB") for s in ico_sizes]
    frames[0].save(f"{OUT}/favicon.ico", format="ICO",
                   sizes=[(s, s) for s in ico_sizes], append_images=frames[1:])
    print("wrote favicon.ico")

    for size, name in [(180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
        draw_mark(size).convert("RGB").save(f"{OUT}/{name}", optimize=True)
        print("wrote", name)


def rules(d, x0, x1, y, thick=4, gap=5, color=INK):
    d.rectangle([x0, y, x1, y + thick], fill=color)
    d.rectangle([x0, y + thick + gap, x1, y + thick + gap + 1], fill=color)


def og_card(path, eyebrow, headline, sub, accent=CHERRY):
    """1200x630 share card in the paper's own furniture."""
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(img)

    # paper edge
    d.rectangle([0, 0, W, 10], fill=HERALD)
    margin = 74

    mark = draw_mark(84)
    img.paste(mark, (margin, 58), mark)

    f_eyebrow = sans(23)
    d.text((margin + 104, 74), eyebrow.upper(), font=f_eyebrow, fill=accent)
    f_est = sans(20)
    d.text((margin + 104, 106), "LINDEN, CALIFORNIA  ·  ESTABLISHED 1959", font=f_est, fill=(90, 82, 72))

    rules(d, margin, W - margin, 176)

    # headline, wrapped by measured width
    f_head = serif(62)
    words, lines, cur = headline.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if d.textlength(trial, font=f_head) <= W - margin * 2:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)

    y = 224
    for line in lines[:3]:
        d.text((margin, y), line, font=f_head, fill=INK)
        y += 76

    f_sub = serif(29)
    d.text((margin, y + 18), sub, font=f_sub, fill=(90, 82, 72))

    # foot
    d.rectangle([margin, H - 96, W - margin, H - 93], fill=(200, 190, 172))
    f_foot = sans(22)
    d.text((margin, H - 74), "LINDENHERALD.COM", font=f_foot, fill=HERALD)
    foot_r = "A WEEKLY NEWSPAPER"
    d.text((W - margin - d.textlength(foot_r, font=f_foot), H - 74), foot_r, font=f_foot, fill=(140, 130, 116))

    d.rectangle([0, H - 8, W, H], fill=HARVEST)
    img.save(path, quality=92, optimize=True)
    print("wrote", os.path.basename(path))


def main():
    os.makedirs(OUT, exist_ok=True)
    write_favicon_svg()
    write_icons()
    os.makedirs(f"{OUT}/og", exist_ok=True)
    og_card(f"{OUT}/og/default.jpg", "The Linden Herald",
            "Serving San Joaquin County since 1959",
            "Local news, agriculture, sports and legal notices, every Thursday.")
    og_card(f"{OUT}/og/news.jpg", "News",
            "What happened in Linden this week",
            "Reported by correspondents who live and work here.")
    og_card(f"{OUT}/og/archive.jpg", "E-Edition Archive",
            "Sixty-seven years of the Herald, searchable",
            "Pick any date since 1959 and read the issue closest to it.")
    og_card(f"{OUT}/og/advertise.jpg", "Advertise & Notices",
            "Adjudicated legal notices, priced in three questions",
            "Proof of publication filed with the county at no cost.")
    og_card(f"{OUT}/og/subscribe.jpg", "Subscribe",
            "Fifty-two issues a year for $42",
            "Delivered by mail across San Joaquin County.")


if __name__ == "__main__":
    main()
