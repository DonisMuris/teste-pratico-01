/**
 * Converte uma imagem (SVG, PNG, JPG) em um data URL PNG.
 *
 * O jsPDF nao desenha SVG nativamente, entao a marca d'agua precisa ser
 * rasterizada antes de ser inserida no documento.
 */
export async function rasterizeToPng(source: string, width = 1200): Promise<{
  dataUrl: string;
  width: number;
  height: number;
}> {
  const image = await loadImage(source);

  const naturalWidth = image.naturalWidth || width;
  const naturalHeight = image.naturalHeight || Math.round(width / 3.75);
  const scale = width / naturalWidth;

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(naturalWidth * scale);
  canvas.height = Math.round(naturalHeight * scale);

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Nao foi possivel criar o contexto 2D para rasterizar a marca d\'agua.');
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  return {
    dataUrl: canvas.toDataURL('image/png'),
    width: canvas.width,
    height: canvas.height,
  };
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Falha ao carregar a imagem: ${source}`));
    image.src = source;
  });
}
