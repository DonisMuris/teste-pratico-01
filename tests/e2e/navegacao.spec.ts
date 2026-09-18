import { test, expect } from '@playwright/test';

test.describe('Navegacao', () => {
  test('leva as tres telas pela barra lateral', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('nav-relatorio').click();
    await expect(page).toHaveURL('/relatorio');
    await expect(page.getByTestId('page-relatorio').getByRole('heading', { level: 1 })).toContainText(
      'Relatorio mensal de vendas',
    );

    await page.getByTestId('nav-certificado').click();
    await expect(page).toHaveURL('/certificado');
    await expect(page.getByTestId('page-certificado').getByRole('heading', { level: 1 })).toContainText(
      'Certificado de conclusao',
    );

    await page.getByTestId('nav-inicio').click();
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('page-inicio').getByRole('heading', { level: 1 })).toContainText(
      'Bem-vindo ao Vertex',
    );
  });
});
