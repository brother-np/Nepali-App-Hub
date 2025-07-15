import { Header } from '@/components/header';
import { LoginForm } from '@/components/admin/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Admin Login</CardTitle>
                <CardDescription>Please enter your credentials to access the dashboard.</CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
