import { Listing } from './data';

export const getRecommendedPosts = (allPosts: Listing[], likedPostIds: number[]): Listing[] => {
  if (likedPostIds.length === 0) return allPosts;

  const likedPosts = allPosts.filter(p => likedPostIds.includes(p.id));
  if (likedPosts.length === 0) return allPosts;

  // 1. Analyze preferences
  const locations = likedPosts.map(p => p.location.split(',')[0].trim());
  const types = likedPosts.map(p => p.type);
  const avgRent = likedPosts.reduce((acc, p) => acc + p.rent, 0) / likedPosts.length;

  // 2. Score Data
  const scoredPosts = allPosts.map(post => {
    // If already liked, move to bottom or keep? Let's keep them but maybe lower priority if we want 'new' suggestions.
    // User usually wants to see what they liked too. But "Suggestions" implies new things.
    // Let's filter out liked posts from suggestions if we had a separate "Liked" view.
    // For now, let's just score everything.
    
    let score = 0;
    const postLocation = post.location.split(',')[0].trim();

    // Location Match (High weight)
    if (locations.includes(postLocation)) score += 30;

    // Type Match (Medium weight)
    if (types.includes(post.type)) score += 15;

    // Price Range Match (Medium weight) - within 20%
    if (post.rent >= avgRent * 0.8 && post.rent <= avgRent * 1.2) score += 20;

    // Facilties overlap (Small weight)
    // could analyze preferred facilities too

    return { ...post, score };
  });

  // 3. Sort by score descending
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .map(({ score, ...post }) => post);
};
