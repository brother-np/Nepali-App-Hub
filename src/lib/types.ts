export type AppCategory = 'Finance' | 'E-commerce' | 'Utilities' | 'Social' | 'Entertainment';

export type App = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AppCategory;
  appLink: string;
  pcLink?: string;
};
