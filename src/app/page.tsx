"use client";

import { useState } from "react";
import { Folder, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const FOLDERS_DATA = {
  physics: {
    name: "Physics",
    icon: Folder,
    topics: ["topic1.html", "topic2.html", "topic3.html"],
    description: "Explore topics in classical and modern physics."
  },
  maths: {
    name: "Maths",
    icon: Folder,
    topics: ["topic1.html", "topic2.html", "topic3.html"],
    description: "Dive into mathematical concepts and theories."
  },
  chemistry: {
    name: "Chemistry",
    icon: Folder,
    topics: ["topic1.html", "topic2.html", "topic3.html"],
    description: "Discover the world of molecules and reactions."
  },
};

type FolderKey = keyof typeof FOLDERS_DATA;

export default function Home() {
  const [selectedFolder, setSelectedFolder] = useState<FolderKey | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const router = useRouter();

  const handleFolderClick = (folder: FolderKey) => {
    if (selectedFolder === folder) {
      setSelectedFolder(null);
      setSelectedTopic(null);
    } else {
      setSelectedFolder(folder);
      setSelectedTopic(null);
    }
  };

  const handleTopicClick = (topic: string) => {
    if (!selectedFolder) return;
    setSelectedTopic(topic);
    const filePath = `/${selectedFolder}/${topic}`;
    router.push(`/view-content?file=${encodeURIComponent(filePath)}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background font-body">
      <div className="w-full max-w-6xl space-y-12">
        <header className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <BookOpen className="h-8 w-8" />
            </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            EduExplorer
          </h1>
  
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Your gateway to interactive learning. Select a subject to begin your journey.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(Object.keys(FOLDERS_DATA) as FolderKey[]).map((key, index) => {
              const folder = FOLDERS_DATA[key];
              return (
                 <Card
                    key={key}
                    onClick={() => handleFolderClick(key)}
                    className={cn(
                      "cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2",
                       selectedFolder === key ? "ring-2 ring-primary shadow-2xl" : "shadow-lg"
                    )}
                    style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
                  >
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                         <folder.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-2xl">{folder.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{folder.description}</p>
                    </CardContent>
                  </Card>
              );
            })}
          </div>

        {selectedFolder && (
          <Card className="shadow-lg animate-in fade-in-50 duration-500 mt-12">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Topics in {FOLDERS_DATA[selectedFolder].name}
              </CardTitle>
              <CardDescription>
                Select a topic file to view its content.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              {FOLDERS_DATA[selectedFolder].topics.map((topic, index) => (
                <Button
                  key={topic}
                  variant={selectedTopic === topic ? "default" : "secondary"}
                  onClick={() => handleTopicClick(topic)}
                  className="transition-all duration-200 transform hover:scale-105 animate-in fade-in"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {topic.replace('.html', '')}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
