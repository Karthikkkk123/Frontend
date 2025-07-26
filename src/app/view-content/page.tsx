import { Suspense } from 'react';
import { getRawHtml } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    )
  }

export default function ViewContentPage({
  searchParams,
}: {
  searchParams: { file: string };
}) {
  const { file } = searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background font-body">
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl capitalize">
                {decodeURIComponent(file).replace(/^\//, '').replace('.html','').replace('/',' - ')}
            </CardTitle>
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
