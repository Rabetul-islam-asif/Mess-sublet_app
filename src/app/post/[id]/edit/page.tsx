"use client";

import { use, useEffect, useState } from "react";
import { PostForm } from "@/components/post/PostForm";
import { MOCK_LISTINGS } from "@/lib/data";
import { Listing } from "@/lib/data";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<Listing | null>(null);

  useEffect(() => {
    // In a real app, fetch from API. Here, find in mock data.
    const foundPost = MOCK_LISTINGS.find(p => p.id === parseInt(resolvedParams.id));
    if (foundPost) {
        setPost(foundPost);
    }
  }, [resolvedParams.id]);

  if (!post) {
      return <div className="p-8 text-center">Loading post data...</div>;
  }

  // Transform Listing to PostForm initial data format
  // Note: MOCK_LISTINGS structure might differ slightly from PostForm's internal state
  // We map what we can.
  const initialData = {
      tenantType: post.type || 'Bachelor Male', // Map 'Mess'/'Sublet' to tenant type if possible, or use defaults
      rent: post.rent.toString(),
      availableFrom: '2025-01-01', // Mock date as it is not in Listing interface usually
      area: post.location.split(',')[0], // Simple heuristic
      address: post.location,
      floor: '2nd Floor', // Mock
      facilities: post.amenities || [],
      restrictions: [], // Mock
      description: post.title, // Use title as description placeholder
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <PostForm initialData={initialData} isEditing={true} />
    </div>
  );
}
