import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Tag, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import { getAllPosts, getPostBySlug, Post } from '@/lib/posts';

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <Layout>
      <div className="max-w-prose mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-indigo-400 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <article className="animate-fade-in-up">
          <header className="mb-10 text-center">
             {post.date && (
              <time className="block text-sm text-slate-500 mb-2 font-mono flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            )}
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.tags && (
              <div className="flex justify-center gap-2 flex-wrap">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          
          <div className="markdown-body">
            <ReactMarkdown 
              components={{
                code({node, className, children, ...props}) {
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
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
        
        <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between text-sm text-slate-500">
           <Link href="/" className="hover:text-indigo-400 transition-colors">← More Posts</Link>
           <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-400 transition-colors">Top ↑</a>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  return {
    props: {
      post,
    },
  };
}