#!/usr/bin/env python3
"""Schiesst Mobile- und Desktop-Screenshots fuer v4-Praesentation."""
import os
from playwright.sync_api import sync_playwright

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "figma-screenshots", "v4")
os.makedirs(OUT, exist_ok=True)

OLD = "https://fitness-factory-hattingen.de"
NEW = "https://l1u2k3e4.github.io/fitness-factory-hattingen/"

def accept_cookies_if_present(page):
    """Klickt Cookie-Accept weg, falls vorhanden."""
    selectors = [
        "button:has-text('Alle akzeptieren')",
        "button:has-text('Alle Cookies akzeptieren')",
        "button:has-text('Akzeptieren')",
        "button:has-text('Accept')",
    ]
    for sel in selectors:
        try:
            btn = page.locator(sel).first
            if btn.is_visible(timeout=1500):
                btn.click()
                page.wait_for_timeout(800)
                return True
        except Exception:
            pass
    return False


with sync_playwright() as p:
    browser = p.chromium.launch()
    iphone = p.devices["iPhone 13"]

    # Alte Site — Mobile Top (Nav + Hero)
    ctx = browser.new_context(**iphone)
    page = ctx.new_page()
    page.goto(OLD, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2500)
    accept_cookies_if_present(page)
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(OUT, "mobile-old-top.png"))
    # Scroll: Sticky Header Test
    page.evaluate("window.scrollTo(0, 600)")
    page.wait_for_timeout(800)
    page.screenshot(path=os.path.join(OUT, "mobile-old-scrolled.png"))
    ctx.close()

    # Neue Site — Mobile Top
    ctx = browser.new_context(**iphone)
    page = ctx.new_page()
    page.goto(NEW, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2500)
    accept_cookies_if_present(page)
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(OUT, "mobile-new-top.png"))
    page.evaluate("window.scrollTo(0, 600)")
    page.wait_for_timeout(800)
    page.screenshot(path=os.path.join(OUT, "mobile-new-scrolled.png"))
    ctx.close()

    # Desktop — Alte Site
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(OLD, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2500)
    accept_cookies_if_present(page)
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(OUT, "desktop-old-top.png"))
    ctx.close()

    # Desktop — Neue Site
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.goto(NEW, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2500)
    accept_cookies_if_present(page)
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(OUT, "desktop-new-top.png"))
    ctx.close()

    browser.close()

print("\u2713 Screenshots erstellt in", OUT)
for f in sorted(os.listdir(OUT)):
    print(" -", f)
