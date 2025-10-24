from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Verify the Home Page
    page.goto("http://localhost:5173/")
    page.screenshot(path="jules-scratch/verification/home_page.png")

    # Verify the Register Page
    page.goto("http://localhost:5173/register")
    page.screenshot(path="jules-scratch/verification/register_page.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
