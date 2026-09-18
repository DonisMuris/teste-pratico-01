import { GState, jsPDF } from 'jspdf';

import { brand } from '@/brand/brand';

import { rasterizeToPng } from './rasterize';

export interface PdfTable {
  head: string[];
  rows: string[][];
}

export interface GeneratePdfOptions {
  /** Titulo impresso no topo da primeira pagina. */
  title: string;
  /** Subtitulo opcional abaixo do titulo. */
  subtitle?: string;
  /** Paragrafos de texto corrido. */
  paragraphs?: string[];
  /** Tabela opcional renderizada apos os paragrafos. */
  table?: PdfTable;
  /** Nome do arquivo gerado, sem a data e sem a extensao `.pdf`. */
  fileName: string;
}

const MARGIN = 18;
const LINE_HEIGHT = 6;
const ROW_HEIGHT = 8;

/**
 * Gera o PDF da pagina atual e dispara o download no navegador.
 *
 * A marca d'agua e a arte definida em `src/brand/brand.ts`: ela e aplicada
 * centralizada, rotacionada e com opacidade baixa em TODAS as paginas.
 *
 * Retorna o nome do arquivo gerado.
 */
export async function generatePdf(options: GeneratePdfOptions): Promise<string> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - MARGIN * 2;
  const bottomLimit = pageHeight - MARGIN - 10;

  let y = MARGIN + 6;

  /** Quebra a pagina quando o proximo bloco nao couber no espaco restante. */
  const ensureSpace = (needed: number) => {
    if (y + needed > bottomLimit) {
      doc.addPage();
      y = MARGIN + 6;
    }
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text(options.title, MARGIN, y);
  y += 9;

  if (options.subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text(options.subtitle, MARGIN, y);
    y += 8;
  }

  doc.setDrawColor(226, 232, 240);
  doc.line(MARGIN, y, pageWidth - MARGIN, y);
  y += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);

  for (const paragraph of options.paragraphs ?? []) {
    const lines = doc.splitTextToSize(paragraph, contentWidth) as string[];
    ensureSpace(lines.length * LINE_HEIGHT);
    doc.text(lines, MARGIN, y);
    y += lines.length * LINE_HEIGHT + 4;
  }

  if (options.table) {
    const table = options.table;
    const columnWidth = contentWidth / table.head.length;

    y += 2;
    ensureSpace(ROW_HEIGHT * 2);

    doc.setFillColor(241, 245, 249);
    doc.rect(MARGIN, y - 5.5, contentWidth, ROW_HEIGHT, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    table.head.forEach((cell, index) => {
      doc.text(cell, MARGIN + 2 + index * columnWidth, y);
    });
    y += ROW_HEIGHT;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);

    for (const row of table.rows) {
      ensureSpace(ROW_HEIGHT);
      row.forEach((cell, index) => {
        doc.text(cell, MARGIN + 2 + index * columnWidth, y);
      });
      doc.setDrawColor(241, 245, 249);
      doc.line(MARGIN, y + 2.5, MARGIN + contentWidth, y + 2.5);
      y += ROW_HEIGHT;
    }
  }

  await applyWatermark(doc);
  drawFooter(doc);

  const fileName = `${options.fileName}-${formatDateForFileName(new Date())}.pdf`;
  doc.save(fileName);

  return fileName;
}

/** Desenha a marca d'agua centralizada, rotacionada e translucida em todas as paginas. */
async function applyWatermark(doc: jsPDF): Promise<void> {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const { dataUrl, width, height } = await rasterizeToPng(brand.watermark);
  const watermarkWidth = pageWidth * brand.watermarkWidthRatio;
  const watermarkHeight = (height / width) * watermarkWidth;
  const { x, y } = centerRotatedImage(pageWidth, pageHeight, watermarkWidth, watermarkHeight, brand.watermarkRotation);

  const totalPages = doc.getNumberOfPages();

  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    doc.saveGraphicsState();
    doc.setGState(new GState({ opacity: brand.watermarkOpacity }));
    doc.addImage(dataUrl, 'PNG', x, y, watermarkWidth, watermarkHeight, undefined, 'FAST', brand.watermarkRotation);
    doc.restoreGraphicsState();
  }
}

/**
 * Calcula a ancora (`x`, `y`) que deixa uma imagem rotacionada centralizada na pagina.
 *
 * O jsPDF gira a imagem em torno do proprio canto, e nao do centro dela: usar
 * simplesmente `(pagina - imagem) / 2` deslocaria a marca d'agua para fora do meio.
 */
function centerRotatedImage(
  pageWidth: number,
  pageHeight: number,
  imageWidth: number,
  imageHeight: number,
  rotationDegrees: number,
): { x: number; y: number } {
  const angle = (rotationDegrees * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // Deslocamento do centro da imagem em relacao a ancora, ja rotacionado.
  const offsetX = (imageWidth / 2) * cos - (imageHeight / 2) * sin;
  const offsetY = (imageWidth / 2) * sin + (imageHeight / 2) * cos;

  return {
    x: pageWidth / 2 - offsetX,
    y: pageHeight / 2 - imageHeight + offsetY,
  };
}

/** Escreve o rodape com a marca, a data de geracao e a numeracao das paginas. */
function drawFooter(doc: jsPDF): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const totalPages = doc.getNumberOfPages();
  const generatedAt = new Date().toLocaleString('pt-BR');

  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`${brand.name} - gerado em ${generatedAt}`, MARGIN, pageHeight - 10);
    doc.text(`Pagina ${page} de ${totalPages}`, pageWidth - MARGIN, pageHeight - 10, { align: 'right' });
  }
}

function formatDateForFileName(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
