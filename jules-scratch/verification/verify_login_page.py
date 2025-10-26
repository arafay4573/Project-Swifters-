from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:5173/login")
    page.get_by_placeholder("Email").fill("test@example.com")
    page.get_by_placeholder("Password").fill("password123")
    page.get_by_role("button", name="Login").click()
    page.screenshot(path="jules-scratch/verification/login_page.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
