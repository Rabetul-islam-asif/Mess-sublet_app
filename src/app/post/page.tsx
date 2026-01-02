"use client";

import { PostForm } from '@/components/post/PostForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/auth/login?message=You must login to create a post');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <PostForm />
    </div>
  );
}
