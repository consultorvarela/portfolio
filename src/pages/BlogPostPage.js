import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Linkedin, Twitter, Volume2, VolumeX, Pause } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { getPostBySlug } from '../data/blogPosts';
import Navbar from '../components/navigation/Navbar';
import Footer from '../sections/Footer';
import SEO from '../components/common/SEO';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const post = getPostBySlug(slug);
  const [speechState, setSpeechState] = useState('idle'); // idle, playing, paused

  // Limpiar speech cuando se desmonte el componente
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Función para limpiar el contenido markdown para lectura
  const getPlainText = (content) => {
    return content
      .replace(/#{1,3}\s/g, '') // Quitar headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Quitar bold
      .replace(/`(.*?)`/g, '$1') // Quitar code
      .replace(/>\s/g, '') // Quitar blockquotes
      .replace(/-\s/g, '') // Quitar bullets
      .replace(/\n+/g, '. ') // Reemplazar saltos de línea con pausas
      .trim();
  };

  const handleSpeech = () => {
    const synth = window.speechSynthesis;

    if (speechState === 'idle') {
      // Iniciar lectura
      const text = `${post.title}. ${getPlainText(post.content)}`;
      const utterance = new SpeechSynthesisUtterance(text);

      // Buscar voz en español
      const voices = synth.getVoices();
      const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.lang = 'es-ES';
      utterance.rate = 0.9;

      utterance.onend = () => setSpeechState('idle');
      utterance.onerror = () => setSpeechState('idle');

      synth.speak(utterance);
      setSpeechState('playing');
    } else if (speechState === 'playing') {
      // Pausar
      synth.pause();
      setSpeechState('paused');
    } else if (speechState === 'paused') {
      // Continuar
      synth.resume();
      setSpeechState('playing');
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setSpeechState('idle');
  };

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const shareUrl = `https://consultorvarela.com/blog/${post.id}`;

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
      '_blank'
    );
  };

  // Simple markdown-like rendering
  const renderContent = (content) => {
    const lines = content.trim().split('\n');
    const elements = [];
    let currentList = [];
    let inList = false;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className={isDark ? 'text-gray-300' : 'text-gray-700'}>{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
      inList = false;
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Headers
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl md:text-3xl font-bold mt-10 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      // Blockquote
      else if (trimmed.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote
            key={index}
            className={`border-l-4 border-emerald-400 pl-4 py-2 my-6 italic ${isDark ? 'text-gray-300 bg-gray-800' : 'text-gray-700 bg-gray-50'} rounded-r`}
          >
            {trimmed.replace('> ', '').replace(/"/g, '')}
          </blockquote>
        );
      }
      // List items
      else if (trimmed.startsWith('- **')) {
        inList = true;
        const text = trimmed.replace('- ', '');
        // Parse bold text
        const parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        currentList.push(<span dangerouslySetInnerHTML={{ __html: parsed }} />);
      }
      else if (trimmed.startsWith('- ')) {
        inList = true;
        currentList.push(trimmed.replace('- ', ''));
      }
      // Numbered list
      else if (/^\d+\.\s/.test(trimmed)) {
        flushList();
        const text = trimmed.replace(/^\d+\.\s/, '');
        elements.push(
          <p key={index} className={`mb-2 ml-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="font-bold text-emerald-500 mr-2">{trimmed.match(/^\d+/)[0]}.</span>
            {text}
          </p>
        );
      }
      // Regular paragraph
      else if (trimmed.length > 0) {
        flushList();
        // Parse bold and inline code
        let parsed = trimmed
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm font-mono">$1</code>');

        elements.push(
          <p
            key={index}
            className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            dangerouslySetInnerHTML={{ __html: parsed }}
          />
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <>
      <SEO
        title={`${post.title} | Pedro Varela`}
        description={post.excerpt}
      />
      <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-slate-900'}`}>
        <Navbar />

        <main className="pt-32 pb-20 px-6 md:px-12">
          <article className="max-w-3xl mx-auto">
            {/* Back to blog */}
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 mb-8 text-sm font-medium hover:text-emerald-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <ArrowLeft size={16} />
              Volver al blog
            </Link>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-medium bg-emerald-400/10 text-emerald-500 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className={`flex flex-wrap items-center gap-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(post.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {post.readTime} de lectura
                </span>
              </div>

              {/* Botón de lectura */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={handleSpeech}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    speechState !== 'idle'
                      ? 'bg-emerald-500 text-white'
                      : isDark
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {speechState === 'idle' && <><Volume2 size={16} /> Escuchar artículo</>}
                  {speechState === 'playing' && <><Pause size={16} /> Pausar</>}
                  {speechState === 'paused' && <><Volume2 size={16} /> Continuar</>}
                </button>
                {speechState !== 'idle' && (
                  <button
                    onClick={stopSpeech}
                    className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                    aria-label="Detener lectura"
                  >
                    <VolumeX size={16} className="text-red-500" />
                  </button>
                )}
              </div>
            </motion.header>

            {/* Botón flotante de audio */}
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
              {speechState !== 'idle' && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={stopSpeech}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                  aria-label="Detener lectura"
                >
                  <VolumeX size={18} />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSpeech}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  speechState !== 'idle'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
                aria-label={speechState === 'idle' ? 'Escuchar artículo' : speechState === 'playing' ? 'Pausar' : 'Continuar'}
              >
                {/* Ondas de sonido animadas */}
                {speechState === 'playing' && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
                    <span className="absolute inset-[-4px] rounded-full border-2 border-emerald-400 animate-pulse opacity-50" />
                    <span className="absolute inset-[-8px] rounded-full border border-emerald-400 animate-pulse opacity-30" style={{ animationDelay: '0.2s' }} />
                  </>
                )}

                {/* Icono */}
                <span className="relative z-10">
                  {speechState === 'idle' && <Volume2 size={22} />}
                  {speechState === 'playing' && (
                    <div className="flex items-end gap-[2px] h-5">
                      <span className="w-[3px] bg-white rounded-full animate-sound-wave-1" style={{ height: '60%' }} />
                      <span className="w-[3px] bg-white rounded-full animate-sound-wave-2" style={{ height: '100%' }} />
                      <span className="w-[3px] bg-white rounded-full animate-sound-wave-3" style={{ height: '40%' }} />
                      <span className="w-[3px] bg-white rounded-full animate-sound-wave-1" style={{ height: '80%' }} />
                    </div>
                  )}
                  {speechState === 'paused' && <Volume2 size={22} />}
                </span>
              </motion.button>
            </div>

            {/* Estilos para las ondas de sonido */}
            <style>{`
              @keyframes sound-wave-1 {
                0%, 100% { height: 40%; }
                50% { height: 100%; }
              }
              @keyframes sound-wave-2 {
                0%, 100% { height: 100%; }
                50% { height: 40%; }
              }
              @keyframes sound-wave-3 {
                0%, 100% { height: 60%; }
                50% { height: 20%; }
              }
              .animate-sound-wave-1 {
                animation: sound-wave-1 0.5s ease-in-out infinite;
              }
              .animate-sound-wave-2 {
                animation: sound-wave-2 0.5s ease-in-out infinite;
                animation-delay: 0.1s;
              }
              .animate-sound-wave-3 {
                animation: sound-wave-3 0.5s ease-in-out infinite;
                animation-delay: 0.2s;
              }
            `}</style>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10 rounded-lg overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              {renderContent(post.content)}
            </motion.div>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`mt-12 pt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-center gap-4">
                <span className={`flex items-center gap-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Share2 size={18} />
                  Compartir:
                </span>
                <button
                  onClick={shareOnLinkedIn}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  aria-label="Compartir en LinkedIn"
                >
                  <Linkedin size={20} className="text-[#0077B5]" />
                </button>
                <button
                  onClick={shareOnTwitter}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  aria-label="Compartir en Twitter"
                >
                  <Twitter size={20} className="text-[#1DA1F2]" />
                </button>
              </div>
            </motion.div>

            {/* Author */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`mt-8 p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
            >
              <div className="flex items-center gap-4">
                <img
                  src="./img/herovarela.png"
                  alt="Pedro Varela"
                  className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400"
                />
                <div>
                  <h3 className="font-bold text-lg">Pedro Varela</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Desarrollador Fullstack
                  </p>
                </div>
              </div>
            </motion.div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
