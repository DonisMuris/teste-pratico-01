import logoFull from '@/assets/brand/logo-full.svg';
import logoIcon from '@/assets/brand/logo-icon.svg';
import watermark from '@/assets/brand/watermark.svg';

/**
 * PONTO UNICO DE CONFIGURACAO DA MARCA.
 *
 * Toda a identidade visual do sistema (sidebar, cabecalho, PDF) le deste objeto.
 * Para trocar a marca do projeto basta:
 *   1. substituir os arquivos em `src/assets/brand/`
 *      (ou apontar os imports acima para novos arquivos), e
 *   2. ajustar `name`, `tagline` e `watermarkOpacity` abaixo.
 *
 * Nenhum componente deve importar um arquivo de logo diretamente.
 */
export interface Brand {
  /** Nome da marca, usado em textos, titulos e rodape do PDF. */
  name: string;
  /** Descricao curta exibida na tela inicial. */
  tagline: string;
  /** Logo completa (simbolo + nome), usada com a sidebar expandida. */
  logoFull: string;
  /** Simbolo isolado, usado com a sidebar recolhida. */
  logoIcon: string;
  /** Arte aplicada como marca d'agua no PDF. */
  watermark: string;
  /** Opacidade da marca d'agua no PDF (0 a 1). Deve permanecer baixa. */
  watermarkOpacity: number;
  /** Largura da marca d'agua como fracao da largura da pagina do PDF (0 a 1). */
  watermarkWidthRatio: number;
  /** Rotacao da marca d'agua no PDF, em graus. */
  watermarkRotation: number;
}

export const brand: Brand = {
  name: 'Orbita',
  tagline: 'Mini sistema de demonstracao para o teste pratico.',
  logoFull,
  logoIcon,
  watermark,
  watermarkOpacity: 0.08,
  watermarkWidthRatio: 0.62,
  watermarkRotation: 30,
};
