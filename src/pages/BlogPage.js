import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { getAllPosts } from '../data/blogPosts';
import Navbar from '../components/navigation/Navbar';
import Footer from '../sections/Footer';
import SEO from '../components/common/SEO';

const BlogPage = () => {
  const { isDark } = useTheme();
  const posts = getAllPosts();

  return (
    <>
      <SEO
        title="Blog | Pedro Varela"
        description="Artículos sobre desarrollo de software, arquitectura y tecnología"
      />
      <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-slate-900'}`}>
        <Navbar />

        <main className="pt-32 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Back to home */}
            <Link
              to="/"
              className={`inline-flex items-center gap-2 mb-8 text-sm font-medium hover:text-emerald-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </Link>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Blog
              </h1>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Reflexiones y aprendizajes sobre desarrollo de software, arquitectura y tecnología.
              </p>
            </motion.div>

            {/* Posts Grid */}
            <div className="space-y-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className={`group rounded-lg overflow-hidden border-2 transition-all hover:border-emerald-400 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                      {/* Image */}
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs font-medium bg-emerald-400/10 text-emerald-500 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-emerald-500 transition-colors">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime}
                          </span>
                        </div>

                        {/* Read more */}
                        <div className="mt-4 flex items-center gap-2 text-emerald-500 font-medium">
                          Leer más <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {posts.length === 0 && (
              <div className={`text-center py-20 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>No hay artículos publicados todavía.</p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
