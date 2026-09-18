import { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';

import { generatePdf, type GeneratePdfOptions } from '@/lib/pdf/generatePdf';

export interface GeneratePdfButtonProps {
  /** Conteudo que sera impresso no PDF. */
  document: GeneratePdfOptions;
}

type Status = 'idle' | 'loading' | 'error';

/**
 * Botao central das paginas de conteudo: gera o PDF com a marca d'agua
 * e dispara o download.
 */
export function GeneratePdfButton({ document }: GeneratePdfButtonProps) {
  const [status, setStatus] = useState<Status>('idle');

  async function handleClick() {
    setStatus('loading');
    try {
      await generatePdf(document);
      setStatus('idle');
    } catch (error) {
      console.error('Falha ao gerar o PDF:', error);
      setStatus('error');
    }
  }

  return (
    <div className="pdf-action">
      <button
        type="button"
        className="button button--primary"
        data-testid="generate-pdf"
        onClick={handleClick}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <Loader2 className="button__icon button__icon--spin" size={18} aria-hidden="true" />
        ) : (
          <FileDown className="button__icon" size={18} aria-hidden="true" />
        )}
        {status === 'loading' ? 'Gerando PDF...' : 'Gerar PDF'}
      </button>

      <p className="pdf-action__hint">
        O arquivo e baixado com a marca d&apos;agua do projeto em todas as paginas.
      </p>

      {status === 'error' && (
        <p className="pdf-action__error" role="alert" data-testid="generate-pdf-error">
          Nao foi possivel gerar o PDF. Tente novamente.
        </p>
      )}
    </div>
  );
}
