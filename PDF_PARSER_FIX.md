# PDF Parser Fix

## Problem
The original `pdf-parse` library had dependency issues with Next.js, specifically:
- Required `@napi-rs/canvas` which wasn't compatible
- DOMMatrix, ImageData, and Path2D polyfill errors
- Failed to work in Next.js server components

## Solution
Replaced `pdf-parse` with `pdfjs-dist` (Mozilla's PDF.js library)

### Why pdfjs-dist?
- ✅ Official Mozilla PDF parser
- ✅ Works perfectly with Next.js
- ✅ No canvas dependencies
- ✅ Pure JavaScript implementation
- ✅ Widely used and well-maintained
- ✅ Handles complex PDFs better

## Changes Made

### 1. Removed Old Dependencies
```bash
npm uninstall pdf-parse canvas pdf2json
```

### 2. Installed New Dependency
```bash
npm install pdfjs-dist
```

### 3. Updated lib/pdfParser.ts
- Uses `pdfjs-dist/legacy/build/pdf.mjs`
- Properly handles Buffer to Uint8Array conversion
- Extracts text from all pages
- Better error handling

### 4. Updated next.config.ts
- Added webpack configuration to suppress source map warnings
- Configured for server-side rendering

## How It Works Now

1. **Buffer Conversion**: Converts uploaded file buffer to Uint8Array
2. **PDF Loading**: Uses pdfjs-dist to load the PDF document
3. **Page Iteration**: Loops through all pages in the PDF
4. **Text Extraction**: Extracts text content from each page
5. **Concatenation**: Combines all page text into a single string

## Testing

The PDF parser now:
- ✅ Works with text-based PDFs
- ✅ Handles multi-page documents
- ✅ Extracts formatted text properly
- ✅ No dependency errors
- ✅ No canvas warnings
- ✅ Compatible with Next.js 15

## Usage

No changes needed in your code - the API remains the same:

```typescript
import { extractTextFromPDF } from "@/lib/pdfParser";

const buffer = Buffer.from(await file.arrayBuffer());
const text = await extractTextFromPDF(buffer);
```

## Limitations

- Still requires text-based PDFs (not scanned images)
- For scanned PDFs, would need OCR (Tesseract.js)
- Large PDFs (100+ pages) may take longer to process

## Future Enhancements

If needed, we could add:
- OCR support for scanned PDFs (Tesseract.js)
- Progress tracking for large PDFs
- Caching of extracted text
- PDF metadata extraction

## Verification

To verify it's working:
1. Start the dev server: `npm run dev`
2. Upload a text-based PDF resume
3. Check terminal - should see no canvas/DOMMatrix errors
4. Resume should be analyzed successfully
