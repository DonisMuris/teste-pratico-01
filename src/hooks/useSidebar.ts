import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'orbita:sidebar-collapsed';

function readStoredState(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export interface SidebarState {
  /** `true` quando a sidebar esta recolhida (apenas icones). */
  collapsed: boolean;
  /** Alterna entre recolhida e expandida. */
  toggle: () => void;
}

/**
 * Controla o estado recolhido/expandido da sidebar e o mantem entre recargas
 * da pagina usando `localStorage`.
 */
export function useSidebar(): SidebarState {
  const [collapsed, setCollapsed] = useState<boolean>(readStoredState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(collapsed));
    } catch {
      // Armazenamento indisponivel (modo privado, por exemplo): segue sem persistir.
    }
  }, [collapsed]);

  const toggle = useCallback(() => {
    setCollapsed((current) => !current);
  }, []);

  return { collapsed, toggle };
}
