"""Builds HitarthResume.pdf (one US-letter page) with ReportLab.

usage: python3 build_resume.py [out.pdf]
Edit the CONTENT section below, rebuild, then upload the PDF to the
`resume-v1` GitHub release (the site links to releases/latest/download).
"""
import sys

from reportlab.lib.colors import Color
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

# ---------- CONTENT ----------

NAME = "Hitarth Bhatt"
TITLE = "SENIOR iOS ENGINEER"
PHONE = "+91 8302880263"
EMAIL = "hitarthbhatt12@gmail.com"
LINKS = [
    ("Portfolio", "https://hitarthbhatt.github.io"),
    ("Github", "https://github.com/Hitarthbhatt"),
    ("Linkedin", "https://www.linkedin.com/in/hitarth-bhatt"),
    ("Leetcode", "https://leetcode.com/hitarthbhatt12/"),
]

# Bullets use <b>…</b> for emphasis.
EXPERIENCE = [
    {
        "company": "eBay", "product": ("TCGplayer App", "https://apps.apple.com/us/app/tcgplayer/id1247645833"),
        "location": "Bangalore, India", "role": "Senior Software Engineer", "dates": "July 2026 – Present",
        "bullets": [
            "Building the <b>TCGplayer iOS app</b>, a trading card marketplace and collection tracker used by <b>1M active users</b>.",
            "Shipped <b>PAX Australia onboarding</b> for TCGplayer's <b>Australia launch</b> and redesigned the <b>Account &amp; Settings</b> experience.",
            "Built an in-app <b>debug menu</b> to override <b>feature flags</b> and <b>experiments</b> at runtime, speeding up QA and experiment validation.",
            "Integrated <b>MetricKit</b> to track on-device performance and diagnostics in production.",
        ],
    },
    {
        "company": "Meesho", "product": ("Meesho App", "https://apps.apple.com/us/app/meesho-online-shopping/id1457958492"),
        "location": "Bangalore, India", "role": "Senior Software Engineer", "dates": "April 2025 – June 2026",
        "bullets": [
            "Architected an <b>AI-assisted developer toolchain</b> using <b>Claude Code</b> — custom skills for <b>project-wide file indexing</b> and <b>dependency graph mapping</b>, plus <b>autonomous AI agents</b> that auto-generate PRs from branch diffs and resolve reviewer comments.",
            "Architected <b>zero-dependency App Extension binaries</b> across Notification Service, Widget, and Share targets; instrumented <b>MetricKit</b> crash diagnostics to surface previously invisible extension-level failures.",
            "<b>Pioneered feature modularization</b> by extracting <b>Help Center</b> &amp; <b>Navigation</b> into independent modules, then offset the size increase by <b>4 MB</b> with <b>Mergeable Binaries</b>.",
            "Reduced iOS app size by <b>6.2 MB (71.1 <font name='ArialUnicode'>→</font> 64.9 MB)</b> by migrating from CocoaPods to SPM, improving <b>Kaizen metrics</b>.",
            "Built production alerting on Meesho’s in-house <b>Signal system</b>, achieving <b>90% alert accuracy</b> and reducing incident detection time.",
            "Shipped <b>Personalized First Order Discount</b> (<b>10% 1ODNR, 5% NMV growth</b>) and <b>Sale Revamp</b> (<b>15% O/DAU uplift</b>).",
        ],
    },
    {
        "company": "Walmart Global Tech", "product": ("Walmart App", "https://apps.apple.com/us/app/walmart-shopping-savings/id338137227"),
        "location": "Bangalore, India", "role": "Software Engineer III", "dates": "Mar 2024 – April 2025",
        "bullets": [
            "Owned and enhanced <b>Apparel item pages</b> in the Walmart iOS app, improving product discovery and conversion on high-traffic e-Commerce screens.",
            "Integrated <b>Bazel</b> build system into the iOS pipeline, reducing incremental build times and accelerating developer iteration cycles.",
            "Shipped <b>Complete the Look</b> cross-sell feature and <b>Dynamic Size Guide</b> with personalized recommendations, targeting return rate reduction.",
        ],
    },
    {
        "company": "Adobe Systems (via Hughes Systique Corp.)", "product": ("Photoshop Express", "https://apps.apple.com/us/app/photoshop-express-photo-editor/id331975235"),
        "location": "Noida, India", "role": "Software Engineer", "dates": "Mar 2023 – Mar 2024",
        "bullets": [
            "Contributed to the Adobe PSX <b>Growth team</b>, helping maintain a <b>4.8-star rating</b> with <b>700K+ reviews</b>; architected seamless <b>light/dark theme</b> support.",
            "Designed and executed multi-country <b>A/B experiments</b> using <b>Adobe Analytics</b>, promoting successful variants to global features.",
            "Built a <b>Python-based A/B infrastructure</b> for language localization, automating variant management across <b>20+ locales</b>.",
        ],
    },
    {
        "company": "Simform Solutions", "product": ("AI-Health App", "https://www.ai-health.com"),
        "location": "Ahmedabad, India", "role": "Software Engineer", "dates": "Jul 2021 – Feb 2023",
        "bullets": [
            "Revamped legacy codebase by implementing <b>MVVM</b> architecture and integrating <b>SwiftUI</b>, resulting in a <b>40% reduction in app crashes</b>.",
            "Refactored <b>80%+ of watchOS screens</b> from UIKit to SwiftUI, modernizing the codebase and reducing UI development time.",
            "Delivered cross-platform features across <b>iPad, iPhone, and watchOS</b> in a 5-person remote team, consistently meeting sprint commitments.",
        ],
    },
]

PROJECTS = [
    {
        "company": "SSLineChart", "product": ("Link", "https://github.com/SimformSolutionsPvtLtd/SSLineChart"),
        "location": "Ahmedabad, India", "role": "Open Source Library", "dates": "",
        "bullets": [
            "Developed an open-source <b>watchOS charting library</b> in Swift with gradient-based line chart rendering; published on GitHub, adopted by health/fitness developers.",
        ],
    },
]

SKILLS = [
    ("Concepts", "Data Structures, OOP, Multi-Threading, MVVM-C, MVC, Protocol-Oriented Programming, RESTful APIs, App Store Publishing"),
    ("Languages &amp; Tools", "Swift, Objective-C, C++, Xcode, Git, JIRA, CocoaPods, Swift Package Manager, Bazel, Charles, Proxyman, Claude Code"),
    ("Frameworks", "SwiftUI, UIKit, Combine, Structured Concurrency, CoreData, Firebase, Swift Charts, XCTest, MetricKit"),
]

EDUCATION = [
    {"company": "Arya College of Engineering and IT", "product": None, "location": "Jaipur, India",
     "role": "BTech in Information Technology", "dates": "2017 – 2021", "bullets": []},
]

# ---------- LAYOUT ----------

pdfmetrics.registerFont(TTFont("ArialUnicode", "/Library/Fonts/Arial Unicode.ttf"))

INK = Color(.2, .2, .2)
BODY = Color(.267, .267, .267)
MUTED = Color(.4, .4, .4)
ACCENT = Color(.169, .643, .706)
RULE = Color(.333, .333, .333)
WIDTH = letter[0] - 84

def hexc(c):
    return "#%02x%02x%02x" % (int(c.red * 255), int(c.green * 255), int(c.blue * 255))

def link(label, url):
    return f"<a href='{url}' color='{hexc(ACCENT)}'>{label}</a>"

name = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=18, leading=21, alignment=TA_CENTER, textColor=INK)
title = ParagraphStyle("title", fontName="ArialUnicode", fontSize=8.5, leading=11, alignment=TA_CENTER, textColor=ACCENT)
contact = ParagraphStyle("contact", fontName="Helvetica", fontSize=8, leading=10, alignment=TA_CENTER, textColor=INK)
section = ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=INK)
company = ParagraphStyle("company", fontName="Helvetica-Bold", fontSize=9, leading=12, textColor=INK)
meta = ParagraphStyle("meta", fontName="ArialUnicode", fontSize=8.5, leading=11, textColor=MUTED)
meta_right = ParagraphStyle("meta_right", parent=meta, alignment=TA_RIGHT)
place_right = ParagraphStyle("place_right", parent=meta_right, textColor=ACCENT)
bullet = ParagraphStyle("bullet", fontName="Helvetica", fontSize=8.3, leading=11.5, textColor=BODY,
                        leftIndent=10, spaceBefore=1.5)
skill_key = ParagraphStyle("skill_key", parent=bullet, leftIndent=0, alignment=TA_RIGHT, textColor=INK)
skill_val = ParagraphStyle("skill_val", parent=bullet, leftIndent=0)

def row(left, right, lstyle, rstyle):
    t = Table([[Paragraph(left, lstyle), Paragraph(right, rstyle)]], colWidths=[WIDTH * .72, WIDTH * .28])
    t.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                           ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                           ("VALIGN", (0, 0), (-1, -1), "BOTTOM")]))
    return t

def heading(text):
    return [Spacer(1, 5), Paragraph(text, section), HRFlowable(width="100%", thickness=.6, color=RULE, spaceBefore=1, spaceAfter=5)]

def entry(e):
    head = e["company"]
    if e["product"]:
        head += f" ({link(*e['product'])})"
    parts = [row(head, e["location"], company, place_right), row(e["role"], e["dates"], meta, meta_right)]
    parts += [Paragraph("• " + b, bullet) for b in e["bullets"]]
    return KeepTogether(parts + [Spacer(1, 4)])

def build(out):
    doc = SimpleDocTemplate(out, pagesize=letter, leftMargin=36, rightMargin=36, topMargin=22, bottomMargin=20,
                            title=f"{NAME} — Résumé", author=NAME)
    story = [
        Paragraph(NAME, name),
        Paragraph(TITLE, title),
        Paragraph(" | ".join([PHONE, EMAIL] + [link(*l) for l in LINKS]), contact),
    ]
    story += heading("Work Experience") + [entry(e) for e in EXPERIENCE]
    story += heading("Projects") + [entry(e) for e in PROJECTS]
    story += heading("Skills")
    skills = Table([[Paragraph(k, skill_key), Paragraph(v, skill_val)] for k, v in SKILLS], colWidths=[100, WIDTH - 100])
    skills.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (0, -1), 8),
                                ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                                ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    story.append(skills)
    story += heading("Education") + [entry(e) for e in EDUCATION]
    doc.build(story)

if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else "HitarthResume.pdf")
