import { test, expect } from '@playwright/test';

test('navigates to the home page and checks if weather suggestion text is visible', async ({ page }) => {
  // Navigate to the dashboard application
  await page.goto('http://localhost:3000');

  // Verify that the title is present
  await expect(page.locator('h1', { hasText: 'Daily Dashboard' })).toBeVisible();

  // Verify the "Recommended Task" heading is visible
  await expect(page.locator('h2', { hasText: 'Recommended Task' })).toBeVisible();

  // Verify that a suggestion text is visible (either the hot or cold weather suggestion)
  const suggestionText = page.locator('p.text-white.font-semibold.text-xl');
  await expect(suggestionText).toBeVisible(); // Just verifying it's visible, as it can be either depending on the weather
  
  // Optionally, we can check if it contains one of the two possible strings
  const text = await suggestionText.innerText();
  expect(['Outdoor Coffee Break/Walk', 'Deep Work / Focus Session']).toContain(text);
});
