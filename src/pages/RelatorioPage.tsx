import { GeneratePdfButton } from '@/components/GeneratePdfButton';

const ROWS = [
  ['Janeiro', 'Sudeste', 'R$ 128.400,00', '+12%'],
  ['Fevereiro', 'Sul', 'R$ 96.750,00', '+4%'],
  ['Marco', 'Nordeste', 'R$ 143.220,00', '+21%'],
  ['Abril', 'Centro-Oeste', 'R$ 88.910,00', '-3%'],
  ['Maio', 'Norte', 'R$ 74.560,00', '+8%'],
];

const HEAD = ['Mes', 'Regiao', 'Faturamento', 'Variacao'];

export function RelatorioPage() {
  return (
    <div className="page" data-testid="page-relatorio">
      <header className="page__header">
        <p className="page__eyebrow">Relatorio</p>
        <h1 className="page__title">Relatorio mensal de vendas</h1>
        <p className="page__subtitle">Dados ficticios usados apenas para demonstracao.</p>
      </header>

      <section className="table-wrapper">
        <table className="table" data-testid="tabela-relatorio">
          <thead>
            <tr>
              {HEAD.map((cell) => (
                <th key={cell} scope="col">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <GeneratePdfButton
        document={{
          title: 'Relatorio mensal de vendas',
          subtitle: 'Dados ficticios usados apenas para demonstracao.',
          paragraphs: [
            'Este relatorio consolida o faturamento por regiao nos primeiros cinco meses do periodo analisado.',
          ],
          table: { head: HEAD, rows: ROWS },
          fileName: 'relatorio-mensal',
        }}
      />
    </div>
  );
}
