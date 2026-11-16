// @ts-check
import { test, expect } from '@playwright/test';

test.describe('VARMA CAR TRAVELS - OWASP Security & Header Audit', () => {
  test('TC14 - Mandatory HTTP Security Headers are strictly enforced', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);

    const headers = response.headers();

    // 1. Powered-By header should be removed
    expect(headers['x-powered-by']).toBeUndefined();

    // 2. Content Security Policy
    expect(headers['content-security-policy']).toBeDefined();
    expect(headers['content-security-policy']).toContain("default-src 'self'");
    expect(headers['content-security-policy']).toContain("frame-ancestors 'self'");

    // 3. MIME sniffing protection
    expect(headers['x-content-type-options']).toBe('nosniff');

    // 4. Clickjacking protection
    expect(headers['x-frame-options']).toBe('SAMEORIGIN');

    // 5. Cross-Site Scripting filter
    expect(headers['x-xss-protection']).toBe('1; mode=block');

    // 6. Referrer Policy
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');

    // 7. Permissions Policy
    expect(headers['permissions-policy']).toBeDefined();

    // 8. Strict Transport Security (HSTS)
    expect(headers['strict-transport-security']).toContain('max-age=63072000');
  });

  test('TC15 - Legacy /index.html permanently redirects (308) to root', async ({ request }) => {
    const response = await request.get('/index.html', { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers()['location']).toBe('/');
  });

  test('TC16 - Critical paths and server configs return 404', async ({ request }) => {
    const forbiddenPaths = ['/.git/config', '/.env', '/package.json', '/server.js', '/app/layout.js'];

    for (const path of forbiddenPaths) {
      const response = await request.get(path);
      expect(response.status()).toBe(404);
    }
  });
});
