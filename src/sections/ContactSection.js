import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_c27cauk';
const EMAILJS_TEMPLATE_ID = 'template_0l4scm6';
const EMAILJS_PUBLIC_KEY = 'xLahVHUVqfirF3JTp';

export const ContactSection = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    project_type: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateField = (name, value) => {
    switch (name) {
      case 'from_name':
        if (!value.trim()) return language === 'es' ? 'El nombre es requerido' : 'Name is required';
        const words = value.trim().split(/\s+/).filter(w => w.length > 0);
        if (words.length < 2) return language === 'es' ? 'Ingresa nombre y apellido' : 'Enter first and last name';
        if (value.trim().length > 50) return language === 'es' ? 'Máximo 50 caracteres' : 'Max 50 characters';
        return '';
      case 'from_email':
        if (!value.trim()) return language === 'es' ? 'El email es requerido' : 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return language === 'es' ? 'Email inválido' : 'Invalid email';
        return '';
      case 'project_type':
        if (!value.trim()) return language === 'es' ? 'El tipo de proyecto es requerido' : 'Project type is required';
        if (value.trim().length < 3) return language === 'es' ? 'Mínimo 3 caracteres' : 'Min 3 characters';
        return '';
      case 'message':
        if (!value.trim()) return language === 'es' ? 'El mensaje es requerido' : 'Message is required';
        if (value.trim().length < 20) return language === 'es' ? 'Mínimo 20 caracteres' : 'Min 20 characters';
        if (value.trim().length > 1000) return language === 'es' ? 'Máximo 1000 caracteres' : 'Max 1000 characters';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {
      from_name: validateField('from_name', formData.from_name),
      from_email: validateField('from_email', formData.from_email),
      project_type: validateField('project_type', formData.project_type),
      message: validateField('message', formData.message)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, value)
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      from_name: true,
      from_email: true,
      project_type: true,
      message: true
    });

    if (!validateForm()) {
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({
        from_name: '',
        from_email: '',
        project_type: '',
        message: ''
      });
      setTouched({});
      setErrors({});
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(language === 'es' ? 'Error al enviar. Intenta de nuevo o escríbeme directamente.' : 'Error sending. Try again or write me directly.');
      console.error('EmailJS Error:', error);
    }
  };

  const inputClasses = (fieldName) => {
    const base = "w-full bg-transparent border-b py-3 text-white focus:outline-none transition-colors placeholder:text-gray-600";
    if (touched[fieldName] && errors[fieldName]) {
      return `${base} border-red-500 focus:border-red-400`;
    }
    return `${base} border-gray-700 focus:border-emerald-400`;
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="contact"
      className={`py-24 px-6 md:px-12 text-white relative overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-black'}`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16">
        <div>
          <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">
            {language === 'es' ? 'Ponte en Contacto' : 'Get in Touch'}
          </h4>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            {language === 'es' ? 'Construyamos algo ' : "Let's build something "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              {language === 'es' ? 'escalable' : 'scalable'}
            </span>
            {language === 'es' ? ' juntos.' : ' together.'}
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            {language === 'es'
              ? '¿Buscas un desarrollador para unirte a tu equipo o construir tu MVP? Escribamos código limpio.'
              : 'Looking for a developer to join your team or build your MVP? Let\'s write clean code.'}
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-emerald-400">
                <Mail />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{language === 'es' ? 'Envíame un Email' : 'Send me an Email'}</p>
                <a href="mailto:consultorvarela@gmail.com" className="text-xl font-bold hover:text-emerald-400 transition-colors">consultorvarela@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-emerald-400">
                <Github />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{language === 'es' ? 'Revisa mi Código' : 'Check my Code'}</p>
                <a href="https://github.com/consultorvarela" target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-emerald-400 transition-colors">github.com/consultorvarela</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-emerald-400">
                <MapPin />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{language === 'es' ? 'Ubicación' : 'Location'}</p>
                <p className="text-xl font-bold">Honduras</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:border-emerald-400/50 transition-all"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
            >
              <CheckCircle className="w-16 h-16 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">{language === 'es' ? 'Mensaje Enviado' : 'Message Sent'}</h3>
              <p className="text-gray-400">{language === 'es' ? 'Te responderé lo antes posible.' : 'I\'ll get back to you as soon as possible.'}</p>
            </motion.div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold tracking-wide text-gray-400">{language === 'es' ? 'NOMBRE COMPLETO *' : 'FULL NAME *'}</label>
                  </div>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses('from_name')}
                    placeholder={language === 'es' ? 'Juan Pérez' : 'John Doe'}
                  />
                  {touched.from_name && errors.from_name ? (
                    <p className="text-red-400 text-xs mt-1">{errors.from_name}</p>
                  ) : (
                    <p className="text-gray-600 text-xs mt-1">{language === 'es' ? 'Nombre y apellido' : 'First and last name'}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold tracking-wide text-gray-400">EMAIL *</label>
                  </div>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses('from_email')}
                    placeholder={language === 'es' ? 'juan@empresa.com' : 'john@company.com'}
                  />
                  {touched.from_email && errors.from_email ? (
                    <p className="text-red-400 text-xs mt-1">{errors.from_email}</p>
                  ) : (
                    <p className="text-gray-600 text-xs mt-1">{language === 'es' ? 'Email válido para contactarte' : 'Valid email to contact you'}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold tracking-wide text-gray-400">{language === 'es' ? 'TIPO DE PROYECTO *' : 'PROJECT TYPE *'}</label>
                </div>
                <input
                  type="text"
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClasses('project_type')}
                  placeholder={language === 'es' ? 'Aplicación Web, API, Consultoría...' : 'Web App, API, Consulting...'}
                />
                {touched.project_type && errors.project_type ? (
                  <p className="text-red-400 text-xs mt-1">{errors.project_type}</p>
                ) : (
                  <p className="text-gray-600 text-xs mt-1">{language === 'es' ? 'Mín. 3 caracteres' : 'Min. 3 characters'}</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold tracking-wide text-gray-400">{language === 'es' ? 'MENSAJE *' : 'MESSAGE *'}</label>
                  <span className={`text-xs ${formData.message.length > 1000 ? 'text-red-400' : formData.message.length >= 20 ? 'text-emerald-500' : 'text-gray-500'}`}>
                    {formData.message.length}/1000
                  </span>
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClasses('message')} h-32 resize-none`}
                  placeholder={language === 'es' ? 'Cuéntame sobre tu proyecto, objetivos y timeline...' : 'Tell me about your project, goals and timeline...'}
                ></textarea>
                {touched.message && errors.message ? (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                ) : (
                  <p className="text-gray-600 text-xs mt-1">{language === 'es' ? 'Mín. 20 caracteres. Describe tu proyecto con detalle.' : 'Min. 20 characters. Describe your project in detail.'}</p>
                )}
              </div>

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm"
                >
                  <AlertCircle size={16} />
                  {errorMessage}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-emerald-400 text-black font-bold py-4 hover:bg-emerald-300 transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {language === 'es' ? 'Enviando...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    {language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
