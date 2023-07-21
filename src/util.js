import { getCollection } from "astro:content";
export function formatDate(date) {  
	return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
		.format(
			new Date(date)
		)
}

export function slugify(string) {
  return string
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters
    .replace(/\s+/g, '-') // Replace whitespace with hyphens
    .replace(/--+/g, '-') // Remove consecutive hyphens
    .trim(); // Remove leading/trailing hyphens
}

export async function getBlogPosts() {
	return (await getCollection("blog")).sort((a, b) => {
		return  b.data.pubDate.valueOf() - a.data.pubDate.valueOf() ;
	}).slice(0,5);
}

export async function getRecentBlogPosts() {
	const posts = await getBlogPosts();
	return posts.slice(0, 4);
}

