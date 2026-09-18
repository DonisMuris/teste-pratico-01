import { GeneratePdfButton } from '@/components/GeneratePdfButton';
import { brand } from '@/brand/brand';

const PARTICIPANTE = 'Maria Aparecida de Souza';
const CURSO = 'Desenvolvimento Front-end com React e TypeScript';
const CARGA_HORARIA = '40 horas';

export function CertificadoPage() {
  return (
    <div className="page" data-testid="page-certificado">
      <header className="page__header">
        <p className="page__eyebrow">Certificado</p>
        <h1 className="page__title">Certificado de conclusao</h1>
        <p className="page__subtitle">Documento ficticio usado apenas para demonstracao.</p>
      </header>

      <section className="certificate" data-testid="certificado-conteudo">
        <p className="certificate__lead">Certificamos que</p>
        <p className="certificate__name">{PARTICIPANTE}</p>
        <p className="certificate__text">
          concluiu o curso de <strong>{CURSO}</strong>, com carga horaria de {CARGA_HORARIA}, promovido por{' '}
          {brand.name}.
        </p>
      </section>

      <GeneratePdfButton
        document={{
          title: 'Certificado de conclusao',
          subtitle: `Emitido por ${brand.name}`,
          paragraphs: [
            `Certificamos que ${PARTICIPANTE} concluiu o curso de ${CURSO}, com carga horaria de ${CARGA_HORARIA}.`,
            'Este documento e ficticio e foi gerado apenas para demonstracao do fluxo de exportacao em PDF.',
          ],
          fileName: 'certificado',
        }}
      />
    </div>
  );
}
