import { test, expect } from '@playwright/test';

test.describe('Gerar PDF', () => {
  const paginas = [
    { nav: 'nav-relatorio', arquivo: /^relatorio-mensal-\d{4}-\d{2}-\d{2}\.pdf$/ },
    { nav: 'nav-certificado', arquivo: /^certificado-\d{4}-\d{2}-\d{2}\.pdf$/ },
  ];

  for (const { nav, arquivo } of paginas) {
    test(`baixa o PDF a partir de ${nav.replace('nav-', '')}`, async ({ page }) => {
      await page.goto('/');
      await page.getByTestId(nav).click();

      const downloadPromise = page.waitForEvent('download');
      await page.getByTestId('generate-pdf').click();
      const download = await downloadPromise;

      expect(download.suggestedFilename()).toMatch(arquivo);
      await expect(page.getByTestId('generate-pdf-error')).toHaveCount(0);
    });
  }
});
