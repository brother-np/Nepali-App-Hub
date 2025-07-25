'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Wand2 } from 'lucide-react';
import { suggestRelevantTags } from '@/ai/flows/suggest-relevant-tags';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(2, 'App name must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  icon: z.string().min(1, 'An icon image is required.'),
  appLink: z.string().url('Please enter a valid URL for the app.'),
  pcLink: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  category: z.enum(['Finance', 'E-commerce', 'Utilities', 'Social', 'Entertainment']),
});

export function AddAppForm() {
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      icon: '',
      appLink: '',
      pcLink: '',
    },
  });

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
         toast({
          title: 'Image too large',
          description: 'Please select an image smaller than 2MB.',
          variant: 'destructive',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        form.setValue('icon', dataUrl);
        setIconPreview(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSuggestTags = async () => {
    const description = form.getValues('description');
    if (description.length < 10) {
      toast({
        title: 'Description too short',
        description: 'Please enter a longer description to get tag suggestions.',
        variant: 'destructive',
      });
      return;
    }

    setIsSuggesting(true);
    setSuggestedTags([]);
    try {
      const result = await suggestRelevantTags({ appDescription: description });
      setSuggestedTags(result.tags);
    } catch (error) {
      console.error('Error suggesting tags:', error);
      toast({
        title: 'Error',
        description: 'Could not suggest tags. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'App Submitted!',
      description: `The app "${values.name}" has been added.`,
    });
    form.reset();
    setSuggestedTags([]);
    setIconPreview(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Khalti" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App Icon</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleIconChange}
                  className="file:text-primary file:font-medium"
                />
              </FormControl>
              <FormDescription>Upload a PNG, JPG, or WEBP file (max 2MB).</FormDescription>
              {iconPreview && (
                <div className="mt-4">
                  <Image 
                    src={iconPreview} 
                    alt="Icon preview" 
                    width={64} 
                    height={64} 
                    className="rounded-xl border shadow-sm"
                  />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App Link (Mobile)</FormLabel>
              <FormControl>
                <Input placeholder="https://play.google.com/store/apps/details?id=com.example.app" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pcLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PC Download Link (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/download/pc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the app and its features."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isSuggesting}>
            {isSuggesting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Suggest Tags with AI
          </Button>
          {suggestedTags.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2 text-muted-foreground">Suggested Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button type="submit">Add Application</Button>
      </form>
    </Form>
  );
}
