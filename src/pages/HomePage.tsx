import { Link } from 'react-router-dom';
import { Award, FileBarChart } from 'lucide-react';

import { brand } from '@/brand/brand';

const CARDS = [
  {
    to: '/relatorio',
    title: 'Relatorio mensal',
    description: 'Tabela de resultados com botao central para exportar em PDF.',
    icon: FileBarChart,
    testId: 'card-relatorio',
  },
  {
    to: '/certificado',
    title: 'Certificado',
    description: 'Documento de conclusao com botao central para exportar em PDF.',
    icon: Award,
    testId: 'card-certificado',
  },
] as const;

export function HomePage() {
  return (
    <div className="page" data-testid="page-inicio">
      <header className="page__header">
        <p className="page__eyebrow">Inicio</p>
        <h1 className="page__title">Bem-vindo ao {brand.name}</h1>
        <p className="page__subtitle">{brand.tagline}</p>
      </header>

      <section className="card-grid">
        {CARDS.map(({ to, title, description, icon: Icon, testId }) => (
          <Link key={to} to={to} className="card" data-testid={testId}>
            <Icon className="card__icon" size={24} aria-hidden="true" />
            <h2 className="card__title">{title}</h2>
            <p className="card__description">{description}</p>
          </Link>
        ))}
      </section>

      <section className="panel">
        <h2 className="panel__title">Como usar</h2>
        <ol className="panel__list">
          <li>Use o botao no rodape da barra lateral para recolher e expandir o menu.</li>
          <li>Com o menu recolhido a marca aparece como icone; expandido, como logo completa.</li>
          <li>Abra Relatorio ou Certificado e clique em Gerar PDF para baixar o documento.</li>
        </ol>
      </section>
    </div>
  );
}
