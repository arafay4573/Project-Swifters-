from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the dashboard page directly
        page.goto("http://localhost:5173/dashboard")
        page.wait_for_selector('[data-testid="profile-settings-button"]')

        # Take a screenshot of the dashboard with the new settings button
        page.screenshot(path="jules-scratch/verification/dashboard_with_settings.png")

        # Click the settings button to open the modal
        page.click('[data-testid="profile-settings-button"]')
        page.wait_for_selector('text="Profile Settings"')

        # Take a screenshot of the settings modal
        page.screenshot(path="jules-scratch/verification/profile_settings_modal.png")

        browser.close()

if __name__ == "__main__":
    run()
