
"use client"
import { Suspense, useEffect, useState } from 'react';
import { getRawHtml } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function Content({ filePath }: { filePath: string }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const decodedPath = decodeURIComponent(filePath);
        const htmlContent = await getRawHtml(decodedPath);
        setContent(htmlContent);
      } catch (e: any) {
        setError(e.message);
      }
    };
    fetchContent();
  }, [filePath]);

  if (error) {
    return (
        <div className="text-destructive text-center p-8 bg-destructive/10 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Error Loading Content</h2>
            <p className="font-mono bg-destructive/20 p-2 rounded">{error}</p>
        </div>
    );
  }

  return (
    <div
      className="html-content-view"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

function ContentSkeleton() {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-40 w-full" />
        <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    )
  }

function ViewContent() {
    const searchParams = useSearchParams();
    const file = searchParams.get('file');

    if (!file) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-background font-body">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">No file selected.</p>
                    <Button asChild variant="link" className="mt-4">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go back to subjects
                        </Link>
                    </Button>
                </div>
            </main>
        );
    }
    
    const title = decodeURIComponent(file).replace(/^\//, '').replace('.html','');
    const [subject, topic] = title.split('/');

    return (
        <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background font-body">
            <div className="w-full max-w-5xl">
                <div className="mb-8">
                    <Button asChild variant="outline">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Subjects
                        </Link>
                    </Button>
                </div>
                <Card className="shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-4xl font-extrabold tracking-tight capitalize">
                            {topic}
                        </CardTitle>
                        <CardDescription className="text-lg capitalize text-primary">
                            {subject}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Content filePath={file} />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

export default function ViewContentPage() {
    return (
        <Suspense fallback={<ContentSkeleton />}>
            <ViewContent />
        </Suspense>
    )
}
