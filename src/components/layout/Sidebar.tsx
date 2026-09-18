import { NavLink } from 'react-router-dom';
import { Award, FileBarChart, Home, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { BrandLogo } from '@/components/BrandLogo';

export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: Home, testId: 'nav-inicio', end: true },
  { to: '/relatorio', label: 'Relatorio', icon: FileBarChart, testId: 'nav-relatorio', end: false },
  { to: '/certificado', label: 'Certificado', icon: Award, testId: 'nav-certificado', end: false },
] as const;

/** Barra lateral de navegacao com estado recolhido/expandido. */
export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside
      className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}
      data-testid="sidebar"
      data-collapsed={collapsed}
    >
      <div className="sidebar__brand">
        <BrandLogo collapsed={collapsed} />
      </div>

      <nav className="sidebar__nav" aria-label="Navegacao principal">
        {NAV_ITEMS.map(({ to, label, icon: Icon, testId, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            data-testid={testId}
            title={collapsed ? label : undefined}
            className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
          >
            <Icon className="sidebar__link-icon" size={20} aria-hidden="true" />
            <span className="sidebar__link-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className="sidebar__toggle"
        data-testid="sidebar-toggle"
        onClick={onToggle}
        aria-expanded={!collapsed}
        aria-controls="sidebar"
        aria-label={collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
      >
        <ToggleIcon size={20} aria-hidden="true" />
        <span className="sidebar__link-label">Recolher</span>
      </button>
    </aside>
  );
}
