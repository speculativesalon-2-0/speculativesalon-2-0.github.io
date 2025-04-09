from playwright.sync_api import sync_playwright
import sys
import os
from ascii_magic import AsciiArt

folder = sys.argv[1]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1600, "height": 1200})

    for filename in os.listdir(folder):
        if filename.endswith(".jpg"):
            print(f"Processing {filename}")

            image_path = os.path.join(folder, filename)
            html_path = f"{image_path}.html"
            jpg_path = f"{image_path}.ascii.jpg"

            # Generate HTML from ASCII art
            my_art = AsciiArt.from_image(image_path)
            my_art.to_html_file(html_path, columns=200, width_ratio=2)

            # Open HTML file in browser
            page.goto(f"file://{os.path.abspath(html_path)}")

            # Give it a sec to load
            page.wait_for_timeout(500)

            # Screenshot full page
            page.screenshot(path=jpg_path)

    browser.close()
