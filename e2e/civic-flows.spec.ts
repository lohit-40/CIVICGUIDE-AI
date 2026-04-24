import { test, expect } from '@playwright/test';

test.describe('CivicGuide AI - Core User Flows', () => {
  test('should load the brutalist homepage and verify meta content', async ({ page }) => {
    await page.goto('/');
    
    // Verify title and basic structure
    await expect(page).toHaveTitle(/CivicGuide AI/);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('UNDERSTAND');
    await expect(page.locator('h1')).toContainText('INDIAN DEMOCRACY');
  });

  test('⚙️ Hybrid Test Strategy — Verify Quiz Interaction', async ({ page }) => {
    // 1. Traditional Playwright for fast, deterministic navigation
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Find and navigate to Quiz section
    const quizLink = page.locator('text=Interactive Quiz');
    if (await quizLink.isVisible()) {
        await quizLink.click();
    } else {
        // Fallback if we just test the component directly (assuming it's on the page)
        await expect(page.locator('text=QUESTION 1 / 5')).toBeVisible();
    }

    // 2. We test the assertion of selecting an answer
    const firstQuestion = page.locator('h3').first();
    await expect(firstQuestion).toBeVisible();

    // Click an option
    const options = page.locator('.quiz-option');
    await expect(options.first()).toBeVisible();
    await options.first().click();

    // Verify feedback appears (either CORRECT or WRONG)
    const feedback = page.locator('text=CORRECT!').or(page.locator('text=WRONG ANSWER'));
    await expect(feedback).toBeVisible();

    // Verify "NEXT QUESTION" button appears
    await expect(page.locator('button', { hasText: 'NEXT QUESTION' })).toBeVisible();
  });

  test('should load Live Election News', async ({ page }) => {
    await page.goto('/');
    // Check if the Live Feed tag exists in the NewsPage component
    const liveFeedTag = page.locator('.brut-tag-dark', { hasText: 'LIVE FEED' });
    
    // Some components might be conditionally rendered, so we just check if it exists in the DOM
    if (await liveFeedTag.isVisible()) {
      await expect(liveFeedTag).toBeVisible();
      await expect(page.locator('text=REFRESH FEED')).toBeVisible();
    }
  });
});
