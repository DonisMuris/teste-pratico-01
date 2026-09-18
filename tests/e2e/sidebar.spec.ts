import { test, expect } from '@playwright/test';

test.describe('Barra lateral', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('alterna entre logo completa e icone da Vertex', async ({ page }) => {
    const toggle = page.getByTestId('sidebar-toggle');
    const logoFull = page.getByTestId('brand-logo-full');
    const logoIcon = page.getByTestId('brand-logo-icon');

    await expect(logoFull).toBeVisible();
    await expect(logoFull).toHaveAttribute('alt', /Vertex/);
    await expect(logoIcon).toBeHidden();

    await toggle.click();
    await expect(logoIcon).toBeVisible();
    await expect(logoIcon).toHaveAttribute('alt', /Vertex/);
    await expect(logoFull).toBeHidden();

    await toggle.click();
    await expect(logoFull).toBeVisible();
    await expect(logoIcon).toBeHidden();
  });

  test('mantem o estado recolhido apos recarregar a pagina', async ({ page }) => {
    await page.getByTestId('sidebar-toggle').click();
    await expect(page.getByTestId('brand-logo-icon')).toBeVisible();

    await page.reload();

    await expect(page.getByTestId('brand-logo-icon')).toBeVisible();
    await expect(page.getByTestId('brand-logo-full')).toBeHidden();
  });
});
