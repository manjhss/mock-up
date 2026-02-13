import { toPng } from "html-to-image";
import { ZipWriter, BlobWriter, BlobReader } from "@zip.js/zip.js";

export async function exportSlides(slideRefs: HTMLElement[]) {
  const zipWriter = new ZipWriter(new BlobWriter("application/zip"));

  for (let i = 0; i < slideRefs.length; i++) {
    const dataUrl = await toPng(slideRefs[i], { pixelRatio: 2 });
    const blob = await (await fetch(dataUrl)).blob();

    await zipWriter.add(`slide-${i + 1}.png`, new BlobReader(blob));
  }

  const zipBlob = await zipWriter.close();

  const link = document.createElement("a");
  link.href = URL.createObjectURL(zipBlob);
  link.download = "slides.zip";
  link.click();
}
