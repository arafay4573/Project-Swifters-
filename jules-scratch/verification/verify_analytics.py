import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto("http://localhost:5173/login", timeout=60000)
        await page.wait_for_load_state('networkidle', timeout=60000)

        # Login
        await page.fill('input[name="email"]', "parent@example.com")
        await page.fill('input[name="password"]', "password123")
        await page.click('button[type="submit"]')

        # Wait for navigation to the dashboard
        await page.wait_for_url("http://localhost:5173/dashboard", timeout=60000)
        await page.wait_for_load_state('networkidle', timeout=60000)

        # Take a screenshot of the dashboard
        await page.screenshot(path="jules-scratch/verification/dashboard_analytics.png")

        await browser.close()

asyncio.run(main())
