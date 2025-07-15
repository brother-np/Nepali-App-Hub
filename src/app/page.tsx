import { generateHomepageDescription } from '@/ai/flows/generate-homepage-description';
import { Header } from '@/components/header';
import { AppShowcase } from '@/components/app-showcase';
import { mockApps } from '@/lib/mock-data';

export default async function Home() {
  const { description } = await generateHomepageDescription({});

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto py-12 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4 text-gray-800">
              Discover Nepali Apps
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {description}
            </p>
        </section>
        <section className="container mx-auto px-4 pb-12">
          <AppShowcase apps={mockApps} />
        </section>
      </main>
      <footer className="py-6 border-t bg-background">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Nepali App Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
