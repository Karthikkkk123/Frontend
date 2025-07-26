'use server';

import { promises as fs } from 'fs';
import path from 'path';

export async function getRawHtml(filePath: string): Promise<string> {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    // Sanitize filePath to prevent directory traversal
    const safeFilePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');
    const fullPath = path.join(publicDir, safeFilePath);

    if (!fullPath.startsWith(publicDir)) {
      throw new Error('Access denied: Invalid file path');
    }

    const htmlContent = await fs.readFile(fullPath, 'utf-8');
    return htmlContent;
  } catch (error) {
    console.error(`Error processing file at ${filePath}:`, error);

    let errorMessage = 'An unexpected error occurred while loading the content.';
    if (error instanceof Error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            errorMessage = `File not found at path: ${filePath}. Please ensure the file exists in the public directory.`;
        } else {
            errorMessage = error.message;
        }
    }
    
    return `<div class="text-destructive text-center p-8 bg-destructive/10 rounded-lg">
                <h2 class="text-xl font-bold mb-2">Error Loading Content</h2>
                <p class="font-mono bg-destructive/20 p-2 rounded">${errorMessage}</p>
            </div>`;
  }
}
