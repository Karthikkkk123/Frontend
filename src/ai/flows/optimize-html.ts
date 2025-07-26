// Optimize HTML content for cross-browser rendering.

'use server';

/**
 * @fileOverview Optimizes HTML content for better cross-browser rendering.
 *
 * - optimizeHtmlContent - A function that optimizes the given HTML content.
 * - OptimizeHtmlContentInput - The input type for the optimizeHtmlContent function.
 * - OptimizeHtmlContentOutput - The return type for the optimizeHtmlContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeHtmlContentInputSchema = z.object({
  htmlContent: z
    .string()
    .describe('The HTML content to be optimized for rendering.'),
});
export type OptimizeHtmlContentInput = z.infer<typeof OptimizeHtmlContentInputSchema>;

const OptimizeHtmlContentOutputSchema = z.object({
  optimizedHtmlContent: z
    .string()
    .describe('The optimized HTML content for better rendering.'),
});
export type OptimizeHtmlContentOutput = z.infer<typeof OptimizeHtmlContentOutputSchema>;

export async function optimizeHtmlContent(
  input: OptimizeHtmlContentInput
): Promise<OptimizeHtmlContentOutput> {
  return optimizeHtmlContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeHtmlContentPrompt',
  input: {schema: OptimizeHtmlContentInputSchema},
  output: {schema: OptimizeHtmlContentOutputSchema},
  prompt: `You are an expert web developer specializing in optimizing HTML content for cross-browser rendering.

  Given the following HTML content, optimize it for better rendering across different browsers.
  Ensure that the optimized HTML content is valid and well-formed.

  HTML Content: {{{htmlContent}}}`,
});

const optimizeHtmlContentFlow = ai.defineFlow(
  {
    name: 'optimizeHtmlContentFlow',
    inputSchema: OptimizeHtmlContentInputSchema,
    outputSchema: OptimizeHtmlContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
