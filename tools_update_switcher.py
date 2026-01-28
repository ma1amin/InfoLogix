from pathlib import Path
import re
import textwrap

base = Path(r"e:/faris/infologix")
page_paths = [
    base / "en" / name for name in [
        "index.html",
        "about.html",
        "contact.html",
        "services.html",
        "products.html",
        "privacy.html",
        "terms.html",
    ]
] + [
    base / "ar" / name for name in [
        "index.html",
        "about.html",
        "contact.html",
        "services.html",
        "products.html",
        "privacy.html",
        "terms.html",
    ]
]

block_pattern = re.compile(
    r"\s*<!--\s*Language\s*&\s*Theme\s*Switcher\s*-->[\s\S]*?</div>\s*</div>\s*</div>",
    re.IGNORECASE,
)
nav_pattern = re.compile(
    r"\s*<li class=\"nav-item\">\s*<a class=\"nav-link[^"]*lang-switch\"[\s\S]*?</li>",
    re.IGNORECASE,
)
body_pattern = re.compile(r"(<body[^>]*>)", re.IGNORECASE)

quick_switcher_templates = {
    "en": textwrap.dedent(
        """
        <!-- Quick Switcher -->
        <div class=\"quick-switcher\">
            <button class=\"switch-btn theme-toggle\" id=\"themeToggle\" type=\"button\" aria-label=\"Toggle theme\">
                <i class=\"fas fa-moon\" id=\"themeIcon\"></i>
            </button>
            <a href=\"{target}\" class=\"switch-btn lang-toggle lang-btn\" data-lang=\"ar\" aria-label=\"Switch to Arabic\">
                AR
            </a>
        </div>
        """
    ).strip(),
    "ar": textwrap.dedent(
        """
        <!-- محول سريع -->
        <div class=\"quick-switcher\">
            <button class=\"switch-btn theme-toggle\" id=\"themeToggle\" type=\"button\" aria-label=\"تبديل النمط\">
                <i class=\"fas fa-moon\" id=\"themeIcon\"></i>
            </button>
            <a href=\"{target}\" class=\"switch-btn lang-toggle lang-btn\" data-lang=\"en\" aria-label=\"الانتقال إلى الإنجليزية\">
                EN
            </a>
        </div>
        """
    ).strip(),
}

for path in page_paths:
    if not path.exists():
        continue

    text = path.read_text(encoding="utf-8")
    original = text

    text, _ = block_pattern.subn("\n", text, count=1)
    text, _ = nav_pattern.subn("\n", text, count=1)

    if "quick-switcher" not in text:
        lang = path.parent.name
        stem = path.stem
        if lang == "en":
            target = f"../ar/{'index' if stem == 'index' else stem}.html"
            snippet = quick_switcher_templates["en"].format(target=target)
        else:
            target = f"../en/{'index' if stem == 'index' else stem}.html"
            snippet = quick_switcher_templates["ar"].format(target=target)

        text = body_pattern.sub(r"\\1\n" + snippet + "\n", text, count=1)

    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"Updated {path.relative_to(base)}")
