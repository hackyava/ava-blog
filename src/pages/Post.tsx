import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Tag } from 'lucide-react';
import '../index.css'; // Ensure tailwind styles are applied

const parseFrontMatter = (text: string) => {
  const match = text.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) return { attributes: {}, body: text };
  
  const frontMatter = match[1];
  const body = match[2];
  const attributes: Record<string, string> = {};
  
  frontMatter.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join(':').trim().replace(/^['"](.*)['"]$/, '$1'); // Strip quotes
      if (key && value) attributes[key] = value;
    }
  });
  
  return { attributes, body };
};

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}posts/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.text();
      })
      .then(text => {
        const { attributes, body } = parseFrontMatter(text);
        setMeta(attributes);
        setContent(body);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setContent('# 404 Not Found\nThis post does not exist... yet.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-indigo-400 font-mono text-sm animate-pulse">
        <span className="mr-2">⚡</span> Loading...
      </div>
    );
  }

  return (
    <div className="max-w-prose mx-auto">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-indigo-400 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <article className="animate-fade-in-up">
        <header className="mb-10 text-center">
           {meta.date && (
            <time className="block text-sm text-slate-500 mb-2 font-mono">
              {new Date(meta.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          )}
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            {meta.title || slug?.replace(/-/g, ' ')}
          </h1>
          
          {meta.tags && (
            <div className="flex justify-center gap-2 flex-wrap">
              {meta.tags.split(',').map(tag => (
                <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div className="markdown-body">
          <ReactMarkdown 
            components={{
              // Custom renderers if needed
              code({node, className, children, ...props}) {
                 // Check if it's inline code or block
                 const match = /language-(\w+)/.exec(className || '')
                 return match ? (
                   <div className="relative group">
                     <div className="absolute top-2 right-2 text-xs text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                       {match[1]}
                     </div>
                     <code className={className} {...props}>
                       {children}
                     </code>
                   </div>
                 ) : (
                   <code className={className} {...props}>
                     {children}
                   </code>
                 )
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
      
      <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between text-sm text-slate-500">
         <Link to="/" className="hover:text-indigo-400 transition-colors">← More Posts</Link>
         <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-indigo-400 transition-colors">Top ↑</a>
      </div>
    </div>
  );
};

export default Post;