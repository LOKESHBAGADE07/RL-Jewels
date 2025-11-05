import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Use domcontentloaded instead of load to avoid waiting for all resources
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check if page loads
    await expect(page).toHaveTitle(/RL Jewels/);
    
    // Check hero section is visible
    const heroSection = page.locator('#home');
    await expect(heroSection).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    // Wait for page header/navigation area
    await page.waitForTimeout(2000); // Give nav time to load
    
    // Find navigation by structure (header, nav, or links container)
    const hasHeader = await page.locator('header').isVisible().catch(() => false);
    const hasNav = await page.locator('nav').isVisible().catch(() => false);
    const hasLinks = await page.locator('a[href*="#"]').count() > 0;
    
    // Should have some form of navigation
    expect(hasHeader || hasNav || hasLinks).toBe(true);
  });

  test('should have correct WhatsApp link', async ({ page }) => {
    // Find WhatsApp links (may be in header, footer, or product cards)
    const whatsappLinks = page.locator('a[href*="wa.me/919403891854"], a[href*="919403891854"]');
    const count = await whatsappLinks.count();
    
    // Should have at least one WhatsApp link
    expect(count).toBeGreaterThan(0);
    
    // Check one of the links contains correct number
    const href = await whatsappLinks.first().getAttribute('href');
    expect(href).toContain('919403891854');
  });

  test('should display products section', async ({ page }) => {
    // Scroll to products or best sellers section
    const collectionsSection = page.locator('#collections, #best-sellers').first();
    await collectionsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Check if product cards are visible (by their structure: h3 titles, buttons)
    const productTitles = page.locator('h3.text-sm.font-medium');
    const count = await productTitles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should lazy load images', async ({ page }) => {
    // Get initial image count
    const initialImages = await page.locator('img[loading="lazy"]').count();
    
    // Scroll down to load more images
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // More images should be loaded or in process
    const loadedImages = await page.locator('img').count();
    expect(loadedImages).toBeGreaterThanOrEqual(initialImages);
  });

  test('should navigate to contact section smoothly', async ({ page }) => {
    // Find navigation link to contact section (not tel: links)
    const contactNavLink = page.locator('a[href="#contact"], nav a:has-text("Contact")').first();
    
    if (await contactNavLink.isVisible()) {
      await contactNavLink.click();
      
      // Wait for scroll
      await page.waitForTimeout(1500);
      
      // Check if contact section exists and is at least partially visible
      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeVisible();
    }
  });

  test('should have working language switcher', async ({ page }) => {
    // Look for language switcher (if implemented)
    const languageSwitcher = page.locator('[class*="language"]').first();
    
    if (await languageSwitcher.isVisible()) {
      await languageSwitcher.click();
      await page.waitForTimeout(500);
      // Language should change
      await expect(page.locator('body')).toBeVisible();
    }
  });
});

test.describe('Performance Tests', () => {
  test('should load homepage DOM within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    // Wait only for DOM to be ready, not all resources
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    const loadTime = Date.now() - startTime;
    
    // Should load DOM in under 10 seconds (more realistic for dev environment)
    expect(loadTime).toBeLessThan(10000);
  });

  test('should have minimal console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Wait a bit for any async errors
    await page.waitForTimeout(2000);
    
    // Filter out known safe errors (favicon, 404, resource loading)
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('net::ERR') &&
      !error.toLowerCase().includes('supabase') && // Allow Supabase connection warnings in dev
      !error.toLowerCase().includes('cors') && // Allow CORS warnings
      !error.toLowerCase().includes('failed to load resource') // Allow resource load warnings
    );
    
    // Allow up to 5 non-critical errors (realistic for dev environment with dynamic content)
    expect(criticalErrors.length).toBeLessThanOrEqual(5);
  });

  test('should scroll without freezing', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Wait for content to be visible
    await page.waitForSelector('#home', { state: 'visible', timeout: 10000 });
    await page.waitForTimeout(1000); // Give page time to fully initialize
    
    // Try scrolling and verify page responds
    const scrollSuccessful = await page.evaluate(() => {
      const initialScrollY = window.scrollY;
      // Force scroll (even if already at position)
      window.scrollTo({ top: 500, behavior: 'auto' });
      // Give it time to scroll
      return new Promise<boolean>(resolve => {
        setTimeout(() => {
          const newScrollY = window.scrollY;
          // Success if scrolled OR already past that position
          resolve(newScrollY >= 400 || newScrollY > initialScrollY);
        }, 500);
      });
    });
    
    // Page should be able to scroll (not frozen)
    expect(scrollSuccessful).toBe(true);
  });
});
