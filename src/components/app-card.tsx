import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { App } from '@/lib/types';
import { Button } from './ui/button';
import Link from 'next/link';
import { Computer, Smartphone } from 'lucide-react';

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 bg-card">
      <CardHeader className="flex flex-row items-start gap-4">
        <Image 
          src={app.icon} 
          alt={`${app.name} icon`} 
          width={64} 
          height={64} 
          className="rounded-xl border shadow-sm" 
          data-ai-hint="app logo"
        />
        <div className="flex-1">
          <CardTitle className="font-headline text-lg">{app.name}</CardTitle>
          <Badge variant="outline" className="mt-2 border-primary/50 text-primary">{app.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{app.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2 pt-4">
        <Button asChild className="w-full">
          <Link href={app.appLink} target="_blank">
            <Smartphone className="mr-2 h-4 w-4" /> Get App
          </Link>
        </Button>
        {app.pcLink && (
          <Button asChild variant="secondary" className="w-full">
            <Link href={app.pcLink} target="_blank">
              <Computer className="mr-2 h-4 w-4" /> Download for PC
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
