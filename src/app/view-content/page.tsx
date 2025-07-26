import { Suspense } from 'react';
import { getRawHtml } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function Content({ filePath }: { filePath: string }) {
  const decodedPath = decodeURIComponent(filePath);
  const content = await getRawHtml(decodedPath);
  
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

export default function ViewContentPage({
  searchParams,
}: {
  searchParams: { file: string };
}) {
  const { file } = searchParams;
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
                    <CardTitle className="text-4xl font-extrabold tracking-tight">
                        {topic}
                    </CardTitle>
                    <CardDescription className="text-lg capitalize text-primary">
                        {subject}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<ContentSkeleton />}>
                        <Content filePath={file} />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    </main>
  );
}
