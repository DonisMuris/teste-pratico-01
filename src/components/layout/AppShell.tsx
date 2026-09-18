import type { ReactNode } from 'react';

import { useSidebar } from '@/hooks/useSidebar';

import { Sidebar } from './Sidebar';

export interface AppShellProps {
  children: ReactNode;
}

/** Estrutura da aplicacao: sidebar retratil + area de conteudo. */
export function AppShell({ children }: AppShellProps) {
  const { collapsed, toggle } = useSidebar();

  return (
    <div className={`app-shell${collapsed ? ' app-shell--collapsed' : ''}`} data-testid="app-shell">
      <Sidebar collapsed={collapsed} onToggle={toggle} />
      <main className="app-content" data-testid="app-content">
        {children}
      </main>
    </div>
  );
}
