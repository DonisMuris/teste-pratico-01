import { brand } from '@/brand/brand';

export interface BrandLogoProps {
  /**
   * `true` exibe apenas o simbolo da marca (sidebar recolhida);
   * `false` exibe a logo completa (sidebar expandida).
   */
  collapsed: boolean;
}

/**
 * Exibe a marca do projeto no topo da sidebar.
 *
 * Os arquivos de imagem vem de `src/brand/brand.ts` - nenhum caminho de logo
 * deve ser escrito diretamente neste componente.
 */
export function BrandLogo({ collapsed }: BrandLogoProps) {
  if (collapsed) {
    return (
      <img
        className="brand-logo brand-logo--icon"
        data-testid="brand-logo-icon"
        src={brand.logoIcon}
        alt={`${brand.name} (simbolo)`}
        width={36}
        height={36}
      />
    );
  }

  return (
    <img
      className="brand-logo brand-logo--full"
      data-testid="brand-logo-full"
      src={brand.logoFull}
      alt={brand.name}
      width={168}
      height={45}
    />
  );
}
