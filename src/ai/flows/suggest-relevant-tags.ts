'use server';

/**
 * @fileOverview An AI agent that suggests relevant tags based on the app description.
 *
 * - suggestRelevantTags - A function that suggests relevant tags for an app.
 * - SuggestRelevantTagsInput - The input type for the suggestRelevantTags function.
 * - SuggestRelevantTagsOutput - The return type for the suggestRelevantTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantTagsInputSchema = z.object({
  appDescription: z
    .string()
    .describe('The description of the app for which tags are suggested.'),
});
export type SuggestRelevantTagsInput = z.infer<typeof SuggestRelevantTagsInputSchema>;

const SuggestRelevantTagsOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('An array of relevant tags for the app description.'),
});
export type SuggestRelevantTagsOutput = z.infer<typeof SuggestRelevantTagsOutputSchema>;

export async function suggestRelevantTags(input: SuggestRelevantTagsInput): Promise<SuggestRelevantTagsOutput> {
  return suggestRelevantTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantTagsPrompt',
  input: {schema: SuggestRelevantTagsInputSchema},
  output: {schema: SuggestRelevantTagsOutputSchema},
  prompt: `You are an expert in suggesting relevant tags for mobile applications. Based on the app description provided, suggest a list of tags that will improve the app's searchability.

App Description: {{{appDescription}}}

Tags:`,
});

const suggestRelevantTagsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantTagsFlow',
    inputSchema: SuggestRelevantTagsInputSchema,
    outputSchema: SuggestRelevantTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
