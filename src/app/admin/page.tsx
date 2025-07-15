import { Header } from '@/components/header';
import { AddAppForm } from '@/components/admin/add-app-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Admin Dashboard</CardTitle>
                <CardDescription>Add a new application to the GharApp directory.</CardDescription>
              </CardHeader>
              <CardContent>
                <AddAppForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
