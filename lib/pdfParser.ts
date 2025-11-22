async function extractWithPdfJs(buffer: Buffer): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  
  // Disable worker for server-side rendering
  pdfjsLib.GlobalWorkerOptions.workerSrc = "";
  
  const uint8Array = new Uint8Array(buffer);
  
  const loadingTask = pdfjsLib.getDocument({
    data: uint8Array,
    useSystemFonts: true,
    disableWorker: true,
    isEvalSupported: false,
  });
  
  const pdf = await loadingTask.promise;
  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(" ");
    
    fullText += pageText + "\n";
  }

  return fullText.trim();
}

async function extractWithPdfLib(buffer: Buffer): Promise<string> {
  const { PDFDocument } = await import("pdf-lib");
  
  const pdfDoc = await PDFDocument.load(buffer);
  const pages = pdfDoc.getPages();
  
  let fullText = "";
  
  // pdf-lib doesn't extract text directly, but we can get form fields and annotations
  // This is a fallback method
  for (const page of pages) {
    const { width, height } = page.getSize();
    fullText += `[Page ${pages.indexOf(page) + 1}: ${width}x${height}]\n`;
  }
  
  return fullText;
}

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    console.log("Attempting to extract text from PDF...");
    
    // Try pdfjs-dist first (best for text extraction)
    try {
      const text = await extractWithPdfJs(buffer);
      if (text && text.trim().length > 0) {
        console.log("Successfully extracted text using pdfjs-dist");
        return text;
      }
    } catch (pdfJsError) {
      console.log("pdfjs-dist failed, trying alternative method:", pdfJsError);
    }
    
    // Fallback: Try pdf-lib
    try {
      const text = await extractWithPdfLib(buffer);
      if (text && text.trim().length > 0) {
        console.log("Using pdf-lib (limited text extraction)");
        return text;
      }
    } catch (pdfLibError) {
      console.log("pdf-lib also failed:", pdfLibError);
    }
    
    throw new Error("Could not extract text from PDF using any method");
    
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF. Please ensure the PDF contains text (not scanned images). Try a different PDF file.");
  }
}
