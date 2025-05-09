export default function Blog() {
  const posts = [
    {
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js",
      date: "2024-01-20",
    },
    {
      title: "The Power of TypeScript",
      excerpt: "Why TypeScript is essential for large-scale applications",
      date: "2024-01-15",
    },
  ];

  return (
    <div className="py-20">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>
      <div className="grid gap-8">
        {posts.map((post, index) => (
          <article key={index} className="border-b pb-8">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <time className="text-sm text-gray-500">{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  );
}
