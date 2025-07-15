'use server';

/**
 * @fileOverview A flow to generate a homepage description using AI.
 *
 * - generateHomepageDescription - A function that generates the homepage description.
 * - GenerateHomepageDescriptionInput - The input type for the generateHomepageDescription function (currently empty).
 * - GenerateHomepageDescriptionOutput - The return type for the generateHomepageDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHomepageDescriptionInputSchema = z.object({});
export type GenerateHomepageDescriptionInput = z.infer<typeof GenerateHomepageDescriptionInputSchema>;

const GenerateHomepageDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated homepage description.'),
});
export type GenerateHomepageDescriptionOutput = z.infer<typeof GenerateHomepageDescriptionOutputSchema>;

export async function generateHomepageDescription(
  input: GenerateHomepageDescriptionInput
): Promise<GenerateHomepageDescriptionOutput> {
  return generateHomepageDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHomepageDescriptionPrompt',
  input: {schema: GenerateHomepageDescriptionInputSchema},
  output: {schema: GenerateHomepageDescriptionOutputSchema},
  prompt: `You are an expert in writing welcoming and engaging homepage descriptions.

  Please generate a short and welcoming description for a homepage that showcases Nepali apps. The description should be positive, hopeful, and encourage users to explore the available apps.
  The primary color of the application is vibrant orange (#FF7F50), the background color is very light orange (#FFF2EB), and the accent color is coral (#FF8A65).
  The body and headline font is 'PT Sans' (sans-serif).
  `,
});

const generateHomepageDescriptionFlow = ai.defineFlow(
  {
    name: 'generateHomepageDescriptionFlow',
    inputSchema: GenerateHomepageDescriptionInputSchema,
    outputSchema: GenerateHomepageDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
