import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import Reveal from '../../components/Reveal';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="max-w-3xl mx-auto px-6 py-24 text-slate">Loading…</div>;
  if (!blog)
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-slate">Post not found.</p>
        <Link to="/blogs" className="text-brass underline mt-4 inline-block">
          Back to Insights
        </Link>
      </div>
    );

  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      <Reveal>
        <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">
          {new Date(blog.createdAt).toLocaleDateString()} · {blog.author}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink mb-8">{blog.title}</h1>
        <img src={blog.coverImage} alt={blog.title} className="w-full h-80 object-cover rounded-2xl mb-10" />
        <div className="prose prose-slate max-w-none text-slate leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </Reveal>
    </article>
  );
};

export default BlogDetail;
