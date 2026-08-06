"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DatasetBookmarkManagerProps {
  datasetId: string;
}

export function DatasetBookmarkManager({ datasetId }: DatasetBookmarkManagerProps) {
  const { toast } = useToast();
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);
    toast({
      title: next ? "Bookmarked! ⭐" : "Bookmark Removed",
      description: next ? `Dataset ${datasetId} saved to favorites.` : `Dataset removed from favorites.`,
    });
  };

  return (
    <Button onClick={toggleBookmark} variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-semibold">
      {bookmarked ? <BookmarkCheck className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> : <Bookmark className="h-3.5 w-3.5" />}
      {bookmarked ? "Bookmarked" : "Favorite"}
    </Button>
  );
}
