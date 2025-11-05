# 🧪 Running Automated Tests - Quick Guide

## 📋 Installation (One-Time Setup)

### Step 1: Install Playwright
```powershell
npm install -D @playwright/test
```

### Step 2: Install Browser Binaries
```powershell
npx playwright install
```

This will install Chrome, Firefox, Safari, and mobile browser engines (~500MB).

---

## 🚀 Running Tests

### Run All Tests (Recommended First Run)
```powershell
npm run test
```

### Run Tests with Interactive UI
```powershell
npm run test:ui
```
Best for debugging - shows tests running in real-time with visual feedback.

### Run Tests in Headed Mode (Watch Browser)
```powershell
npm run test:headed
```
Opens actual browser windows so you can see tests executing.

### Run Specific Browser Tests
```powershell
# Chrome only
npm run test:chrome

# Firefox only
npm run test:firefox

# Safari only
npm run test:safari

# Mobile browsers only
npm run test:mobile
```

### Debug Failed Tests
```powershell
npm run test:debug
```
Opens Playwright Inspector for step-by-step debugging.

### View Test Results Report
```powershell
npm run test:report
```
Opens HTML report with screenshots and videos of failures.

---

## 📊 Test Coverage

### ✅ Homepage Tests (13 tests)
- Page loads successfully
- Navigation menu works
- WhatsApp link correct (919403891854)
- Product section displays
- Lazy loading functioning
- Performance: Loads in under 3 seconds
- Performance: Scrolling at 60 FPS
- No console errors

### ✅ Admin Panel Tests (11 tests)
- Admin login page accessible
- Email validation working
- Hero banners manager loads
- Carousel auto-advances correctly
- Product display functioning
- WhatsApp enquiry buttons correct
- Image optimization active

### ✅ Mobile Tests (10 tests)
- Mobile navigation works (iPhone 12)
- Touch targets minimum 44x44px
- Mobile loads in under 4 seconds
- Text minimum 14px
- No horizontal scroll
- Images fit viewport
- Footer optimized
- Tablet layout works (iPad Pro)

---

## 🎯 Expected Results

### All Tests Pass ✅
```
34 passed (34 tests)
```

### Some Tests Fail ❌
The report will show:
- Screenshots of failures
- Video recordings
- Console logs
- Step-by-step trace

---

## 🔧 Troubleshooting

### Error: "npx: command not found"
**Solution:** Make sure Node.js is installed:
```powershell
node --version
npm --version
```

### Error: "Executable doesn't exist"
**Solution:** Install browser binaries:
```powershell
npx playwright install
```

### Tests Timeout
**Solution:** Make sure dev server is running on port 5173:
```powershell
npm run dev
```
Playwright will auto-start the server, but if issues occur, start manually first.

### Port 5173 Already in Use
**Solution:** Kill the process:
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

---

## 📈 Continuous Integration (Optional)

### Add to GitHub Actions
Create `.github/workflows/tests.yml`:
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: test-results
          path: playwright-report/
```

---

## 📝 Adding New Tests

### Create Test File
```typescript
// tests/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test('my feature works', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#my-element')).toBeVisible();
});
```

### Run Single Test File
```powershell
npx playwright test tests/my-feature.spec.ts
```

---

## 🎬 Next Steps

1. **Install Playwright:**
   ```powershell
   npm install -D @playwright/test
   npx playwright install
   ```

2. **Run All Tests:**
   ```powershell
   npm run test
   ```

3. **View Report:**
   ```powershell
   npm run test:report
   ```

4. **Fix any failing tests** before deploying to production

5. **Compress product images** (see IMAGE_OPTIMIZATION_COMPLETE.md)

---

## 🆘 Need Help?

- **Playwright Docs:** https://playwright.dev
- **Test Examples:** Check `tests/` directory
- **Configuration:** `playwright.config.ts`
- **Image Optimization:** `IMAGE_OPTIMIZATION_COMPLETE.md`
- **Hero Banners Setup:** `HERO_BANNERS_SETUP_GUIDE.md`

---

**Ready to test!** Run `npm install -D @playwright/test` to begin. 🚀
