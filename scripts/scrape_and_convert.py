#!/usr/bin/env python3
"""
scrape_and_convert.py

Scrapes a URL, rephrases content via a self-hosted Ollama model,
and saves a structured .md file to posts/ matching the reference format.

Required env vars:
  OLLAMA_BASE_URL  — e.g. http://your-server:11434
  OLLAMA_MODEL     — e.g. llama3, mistral, etc.
"""

import argparse
import os
import re
import sys
from ollama import Client
from datetime import datetime

import requests
from bs4 import BeautifulSoup, Comment


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

FIXED_AUTHOR_NAME        = "LangQ Team"
FIXED_AUTHOR_DESIGNATION = "Editor"

# Ordered from most specific to least to avoid partial replacements
COMPANY_REPLACEMENTS = [
    (r'\bLokalise AI\b',  'Lang Q AI'),
    (r'\bLokalise\b',     'Lang Q'),
    (r'\bLOKALISE AI\b',  'LANG Q AI'),
    (r'\bLOKALISE\b',     'LANG Q'),
    (r'\blokalise ai\b',  'lang q ai'),
    (r'\blokalise\b',     'lang q'),
]

AUTHOR_CLASS_PATTERN = re.compile(
    r'\b(author|byline|by-line|writer|contributor|bio|profile|avatar|posted-by)\b',
    re.IGNORECASE
)

CONTENT_CLASS_PATTERN = re.compile(
    r'\b(article|post|blog|entry|content|story)([-_]?(body|text|inner|content|wrap))?\b',
    re.IGNORECASE
)


# ---------------------------------------------------------------------------
# Step 1 — Scrape
# ---------------------------------------------------------------------------

def scrape(url: str) -> dict:
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/123.0 Safari/537.36"
        )
    }
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "lxml")

    # --- Extract metadata ---
    title = _meta(soup, "og:title") or _text(soup.h1) or _text(soup.title) or ""
    description = _meta(soup, "og:description") or _meta(soup, "description") or ""
    image = _meta(soup, "og:image") or ""
    kw_tag = soup.find("meta", attrs={"name": "keywords"})
    tags = [t.strip() for t in kw_tag["content"].split(",")] if kw_tag else []

    # --- Remove noise ---
    for tag in soup(["script", "style", "nav", "header", "footer",
                     "aside", "noscript", "iframe", "form", "figure"]):
        tag.decompose()

    for comment in soup.find_all(string=lambda s: isinstance(s, Comment)):
        comment.extract()

    # Remove author / bio blocks by class or id
    for el in soup.find_all(True):
        attrs = " ".join(el.get("class", [])) + " " + el.get("id", "")
        if AUTHOR_CLASS_PATTERN.search(attrs):
            el.decompose()

    # Convert <a> links to plain text (drop URLs, keep anchor text)
    for a in soup.find_all("a"):
        a.replace_with(a.get_text(strip=True))

    # --- Extract main content ---
    main_el = (
        soup.find("article") or
        soup.find("main") or
        soup.find(True, class_=CONTENT_CLASS_PATTERN)
    )
    body = main_el or soup.body or soup
    raw_text = body.get_text(separator="\n")

    # Collapse excessive blank lines
    content = re.sub(r"\n{3,}", "\n\n", raw_text).strip()

    return {
        "title":       title,
        "description": description,
        "image":       image,
        "tags":        tags,
        "content":     content,
    }


def _meta(soup, prop: str) -> str:
    tag = soup.find("meta", property=prop) or soup.find("meta", attrs={"name": prop})
    return (tag.get("content") or "").strip() if tag else ""


def _text(tag) -> str:
    return tag.get_text(strip=True) if tag else ""


# ---------------------------------------------------------------------------
# Step 2 — Rephrase via Ollama
# ---------------------------------------------------------------------------

def build_prompt(scraped: dict) -> str:
    today   = datetime.now().strftime("%Y-%m-%d")
    tags_ex = ", ".join(scraped["tags"][:5]) if scraped["tags"] else "derive 4–5 relevant tags from the content"

    # Trim content to stay within model context
    content = scraped["content"][:5500]

    return f"""You are a professional content writer for "Lang Q", a localization and translation platform.

TASK
====
Rewrite and rephrase the article below into a fresh, original, well-structured blog post.

RULES
=====
1. Replace EVERY occurrence of "Lokalise" (any casing/form) with "Lang Q".
2. The FIRST occurrence of "Lang Q" in the body content (not the frontmatter, not the author name) must be a Markdown link: [Lang Q](https://lang-q.com). Do not link every occurrence — only the first mention in the body.
3. Remove all author names, "written by", "published by", author bios, and profile references.
4. Remove all hyperlinks — keep the link text if it adds meaning, discard the URL entirely.
5. Output ONLY raw Markdown — no code fences, no preamble, no explanation.

OUTPUT FORMAT
=============
Follow this structure exactly, including YAML frontmatter, emoji in headings, and --- section dividers:

---
title: "Rephrased article title here"
description: "Concise 1–2 sentence SEO description."
author: {{ name: "{FIXED_AUTHOR_NAME}", designation: "{FIXED_AUTHOR_DESIGNATION}" }}
date: "{today}"
image: /images/descriptive-kebab-case-slug.jpeg
tags: ["Tag1", "Tag2", "Tag3", "Tag4"]
---
# 🔑 H1 Title With a Relevant Emoji

Opening paragraph(s) introducing the topic.

---
## 🛡️ Section Heading With Relevant Emoji

Section body content...

---
## 📋 Another Section Heading

More content...

---

Closing paragraph or call-to-action.

NOTES ON FORMAT
===============
- author block must always be exactly: {{ name: "{FIXED_AUTHOR_NAME}", designation: "{FIXED_AUTHOR_DESIGNATION}" }}
- date must always be: "{today}"
- image must be a /images/<slug>.jpeg path — choose a slug that describes the article topic
- tags hint: {tags_ex}
- Use emojis only in H1 and H2 headings
- Use --- dividers between major sections
- Bold key terms and technical concepts
- Use numbered lists for sequential steps, bullet lists for non-ordered items

ARTICLE TO REPHRASE
===================
Title: {scraped["title"]}
Description: {scraped["description"]}

{content}
"""


def validate_model(client: Client, model: str):
    try:
        models = client.list()
        available = [m.model for m in models.models]
        if not any(model in m for m in available):
            print(f"❌ Model '{model}' not found on server.")
            print(f"   Available models: {available}")
            sys.exit(1)
        print(f"✅ Model confirmed available")
    except Exception as e:
        print(f"⚠️  Could not verify model (server may still work): {e}")

def call_ollama(scraped: dict, base_url: str, api_key: str, model: str) -> str:
    client = Client(
        host=base_url,
        headers={"Authorization": f"Bearer {api_key}"}
    )
    validate_model(client, model)

    prompt = build_prompt(scraped)

    response = client.chat(
        model=model,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a professional content writer for Lang Q. "
                    "Always output raw Markdown only — no code fences, no commentary."
                )
            },
            {"role": "user", "content": prompt}
        ],
        options={"temperature": 0.7, "num_predict": 4096}
    )

    return response.message.content

def linkify_langq(md: str, max_links: int = 1) -> str:
    """
    Turn plain 'Lang Q' mentions in the body into markdown links,
    skipping: frontmatter, headings, already-linked text, and the
    fixed author name ('Lang Q Team').
    """
    # Split frontmatter from body so we never touch the YAML block
    parts = md.split("---", 2)
    if len(parts) < 3:
        return md  # no frontmatter found, bail out safely
    frontmatter, body = parts[1], parts[2]

    link_count = 0

    def replace(match):
        nonlocal link_count
        if link_count >= max_links:
            return match.group(0)
        link_count += 1
        return f"[{match.group(0)}](https://lang-q.com)"

    # Match "Lang Q" but not:
    #  - when followed by "Team" (author name)
    #  - when already inside [Lang Q](...) or [Lang Q ...]
    #  - inside heading lines starting with # (avoid linking headings)
    lines = body.split("\n")
    for i, line in enumerate(lines):
        if line.lstrip().startswith("#"):
            continue  # skip headings
        if link_count >= max_links:
            break
        pattern = re.compile(r'(?<!\[)\bLang Q\b(?!\])(?!\(https)(?! Team)')
        lines[i] = pattern.sub(replace, line, count=max_links - link_count)
    body = "\n".join(lines)

    return f"---{frontmatter}---{body}"


# ---------------------------------------------------------------------------
# Step 3 — Post-process
# ---------------------------------------------------------------------------

def post_process(md: str) -> str:
    # Strip any code fences the model might wrap output in
    md = re.sub(r"^```[a-z]*\s*\n", "", md.strip())
    md = re.sub(r"\n```\s*$", "", md.strip())

    # Safety pass: catch any leftover Lokalise mentions
    for pattern, replacement in COMPANY_REPLACEMENTS:
        md = re.sub(pattern, replacement, md)

    md = linkify_langq(md, max_links=1)

    return md.strip()


def validate_frontmatter(md: str) -> bool:
    """Warn if the output doesn't start with expected YAML frontmatter."""
    return md.startswith("---")


# ---------------------------------------------------------------------------
# Step 4 — Save
# ---------------------------------------------------------------------------

def save(md: str, filename: str) -> str:
    os.makedirs("posts", exist_ok=True)
    if not filename.endswith(".md"):
        filename += ".md"
    path = os.path.join("posts", filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(md + "\n")
    return path


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Scrape a URL and convert to a structured markdown post."
    )
    parser.add_argument("--url",      required=True, help="URL to scrape")
    parser.add_argument("--filename", required=True, help="Output filename (no .md needed)")
    args = parser.parse_args()

    base_url = os.environ.get("OLLAMA_BASE_URL", "").rstrip("/")
    model    = os.environ.get("OLLAMA_MODEL", "")
    api_key  = os.environ.get("OLLAMA_API_KEY", "")

    if not base_url or not model or not api_key:
        print("ERROR: OLLAMA_BASE_URL, OLLAMA_API_KEY and OLLAMA_MODEL environment variables must be set.", file=sys.stderr)
        sys.exit(1)

    # Step 1 — Scrape
    print(f"🔍  Scraping  → {args.url}")
    scraped = scrape(args.url)
    print(f"    Title: {scraped['title'][:80] or '(none found)'}")
    print(f"    Content length: {len(scraped['content'])} chars")

    # Step 2 — Rephrase
    print(f"🤖  Rephrasing via {model} ...")
    raw_md = call_ollama(scraped, base_url, api_key, model)

    # Step 3 — Post-process
    print("✨  Post-processing ...")
    final_md = post_process(raw_md)

    if not validate_frontmatter(final_md):
        print("⚠️  WARNING: Output does not start with YAML frontmatter (---). Check the file manually.", file=sys.stderr)

    # Step 4 — Save
    path = save(final_md, args.filename)
    print(f"✅  Saved → {path}")


if __name__ == "__main__":
    main()
