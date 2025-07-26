"use client";

import { useState } from "react";
import { Folder, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

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
      <div className="w-full max-w-5xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold font-headline text-primary tracking-tight">
            EduExplorer
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Select a subject to explore its topics.
          </p>
        </header>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Subjects</CardTitle>
            <CardDescription>
              Choose a subject folder to view its files.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(Object.keys(FOLDERS_DATA) as FolderKey[]).map((key) => {
              const folder = FOLDERS_DATA[key];
              return (
                <Button
                  key={key}
                  variant={selectedFolder === key ? "default" : "outline"}
                  onClick={() => handleFolderClick(key)}
                  className="h-auto justify-start p-6 flex flex-col items-start text-left transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <folder.icon className="h-8 w-8 text-accent" />
                    <span className="font-semibold text-xl">{folder.name}</span>
                  </div>
                  <span className="text-sm font-normal text-muted-foreground whitespace-normal">
                    {folder.description}
                  </span>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {selectedFolder && (
          <Card className="shadow-lg animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="text-2xl">
                Topics in {FOLDERS_DATA[selectedFolder].name}
              </CardTitle>
              <CardDescription>
                Select a topic file to view its content.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              {FOLDERS_DATA[selectedFolder].topics.map((topic) => (
                <Button
                  key={topic}
                  variant={selectedTopic === topic ? "default" : "secondary"}
                  onClick={() => handleTopicClick(topic)}
                  className="transition-colors duration-200"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {topic}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
