"""
Builds a sample PDF for every issue listed in src/data/archive.ts, so the
E-Edition archive is clickable end to end during the demo.

Each file is plainly marked a placeholder. Replace them with the Herald's own
scans, keeping the same filenames, and nothing else needs to change.

Run: python3 scripts/build_issue_pdfs.py
"""
import os, re, datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas as rl_canvas

OUT = "public/issues"
W, H = letter
INK = (20 / 255, 17 / 255, 15 / 255)
HERALD = (27 / 255, 77 / 255, 62 / 255)
CHERRY = (142 / 255, 42 / 255, 42 / 255)
GREY = (0.62, 0.60, 0.56)
FAINT = (0.86, 0.84, 0.80)
M = 0.6 * inch


def parse_issues(path="src/data/archive.ts"):
    src = open(path, encoding="utf-8").read()
    out = []
    # Require a quoted ISO date so the Issue type declaration is not matched too
    for blk in re.findall(r'\{\s*date:\s*"\d{4}-\d{2}-\d{2}".*?\n  \}', src, re.S):
        def g(k, cast=str):
            m = re.search(rf"{k}:\s*\"?([^\",\n]+)\"?", blk)
            return cast(m.group(1)) if m else None
        highlights = re.findall(r'"([^"]+)"', blk.split("highlights:")[1]) if "highlights:" in blk else []
        out.append({
            "date": g("date"), "label": g("label"),
            "volume": int(g("volume")), "number": int(g("number")),
            "pages": int(g("pages")), "file": g("file"),
            "highlights": highlights,
        })
    return out


def rule(c, x0, x1, y, thick=1.6, color=INK):
    c.setStrokeColorRGB(*color)
    c.setLineWidth(thick)
    c.line(x0, y, x1, y)


def double_rule(c, x0, x1, y):
    rule(c, x0, x1, y, 2.6)
    rule(c, x0, x1, y - 4, 0.7)


def column_lines(c, x, y_top, width, rows, leading=7.2, color=FAINT):
    """Grey rules standing in for body text. Deliberately not fake copy."""
    c.setStrokeColorRGB(*color)
    c.setLineWidth(2.0)
    y = y_top
    for i in range(rows):
        w = width * (0.80 + ((i * 37) % 20) / 100)
        c.line(x, y, x + w, y)
        y -= leading
    return y


def masthead(c, issue):
    c.setFillColorRGB(*CHERRY)
    c.setFont("Times-Bold", 8)
    c.drawCentredString(W / 2, H - M - 6, "ESTABLISHED 1959")

    c.setFillColorRGB(*INK)
    c.setFont("Times-Bold", 40)
    c.drawCentredString(W / 2, H - M - 50, "The Linden Herald")

    c.setFont("Times-Italic", 10.5)
    c.setFillColorRGB(*GREY)
    c.drawCentredString(W / 2, H - M - 68, "Serving San Joaquin County since 1959")

    y = H - M - 82
    double_rule(c, M, W - M, y)

    c.setFont("Helvetica", 7.6)
    c.setFillColorRGB(*GREY)
    c.drawString(M, y - 16, issue["label"].upper())
    c.drawCentredString(W / 2, y - 16, f"VOL. {issue['volume']}  NO. {issue['number']}")
    c.drawRightString(W - M, y - 16, "LINDEN, CALIFORNIA")
    rule(c, M, W - M, y - 22, 0.7, GREY)
    return y - 34


def placeholder_band(c, y):
    c.setFillColorRGB(*HERALD)
    c.rect(M, y - 26, W - 2 * M, 26, fill=1, stroke=0)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(W / 2, y - 17, "SAMPLE EDITION  ·  DESIGN PLACEHOLDER, NOT THE HERALD'S OWN REPORTING")
    return y - 40


def wrap(c, text, font, size, max_w):
    c.setFont(font, size)
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if c.stringWidth(t, font, size) <= max_w:
            cur = t
        else:
            lines.append(cur); cur = w
    lines.append(cur)
    return lines


def front_page(c, issue):
    y = masthead(c, issue)
    y = placeholder_band(c, y)

    col_w = (W - 2 * M - 0.34 * inch) / 3
    lead = issue["highlights"][0] if issue["highlights"] else "This week in Linden"

    c.setFillColorRGB(*CHERRY)
    c.setFont("Helvetica-Bold", 7.6)
    c.drawString(M, y, "THIS WEEK")
    y -= 20

    c.setFillColorRGB(*INK)
    for line in wrap(c, lead, "Times-Bold", 25, (W - 2 * M) * 0.74):
        c.setFont("Times-Bold", 25)
        c.drawString(M, y, line)
        y -= 27
    y -= 6

    # photo well
    photo_h = 2.1 * inch
    c.setFillColorRGB(0.90, 0.89, 0.86)
    c.rect(M, y - photo_h, col_w * 2 + 0.17 * inch, photo_h, fill=1, stroke=0)
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 8)
    c.drawCentredString(M + (col_w * 2 + 0.17 * inch) / 2, y - photo_h / 2, "PHOTOGRAPH")

    right_x = M + 2 * (col_w + 0.17 * inch)
    ry = y - 4
    for h in issue["highlights"][1:4]:
        c.setFillColorRGB(*INK)
        for line in wrap(c, h, "Times-Bold", 11, col_w):
            c.setFont("Times-Bold", 11)
            c.drawString(right_x, ry, line)
            ry -= 13
        ry = column_lines(c, right_x, ry - 6, col_w, 5) - 10

    y -= photo_h + 16
    for i in range(2):
        column_lines(c, M + i * (col_w + 0.17 * inch), y, col_w, 16)

    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 7)
    c.drawCentredString(W / 2, M - 6, f"lindenherald.com  ·  page 1 of {issue['pages']}")


def inside_page(c, issue, page_no):
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 7.6)
    c.drawString(M, H - M, f"THE LINDEN HERALD  ·  {issue['label'].upper()}")
    c.drawRightString(W - M, H - M, f"PAGE {page_no}")
    rule(c, M, W - M, H - M - 6, 0.7, GREY)

    y = H - M - 26
    c.setFillColorRGB(*INK)
    c.setFont("Times-Bold", 15)
    c.drawString(M, y, "This is a placeholder page")
    y -= 18
    c.setFillColorRGB(*GREY)
    c.setFont("Times-Roman", 10)
    for line in wrap(c, "The Herald's scanned edition belongs here. Replace this file with the "
                        "real PDF, keeping the same filename, and the archive picks it up with "
                        "no other change.", "Times-Roman", 10, (W - 2 * M) * 0.62):
        c.drawString(M, y, line)
        y -= 13

    y -= 14
    col_w = (W - 2 * M - 0.34 * inch) / 3
    for i in range(3):
        column_lines(c, M + i * (col_w + 0.17 * inch), y, col_w, 44)

    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 7)
    c.drawCentredString(W / 2, M - 6, f"page {page_no} of {issue['pages']}")


def main():
    os.makedirs(OUT, exist_ok=True)
    issues = parse_issues()
    for issue in issues:
        name = os.path.basename(issue["file"])
        c = rl_canvas.Canvas(os.path.join(OUT, name), pagesize=letter)
        c.setTitle(f"The Linden Herald, {issue['label']}")
        c.setAuthor("The Linden Herald")
        c.setSubject("Sample edition, design placeholder")
        front_page(c, issue)
        c.showPage()
        for pno in (2, 3):
            inside_page(c, issue, pno)
            c.showPage()
        c.save()
        print("wrote", name)
    print(f"{len(issues)} issues")


if __name__ == "__main__":
    main()
