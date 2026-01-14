import { useEffect } from 'react';

export const SEO = ({
  title = "Pedro Varela - Desarrollador Fullstack | React, Python, Node.js",
  description = "Portafolio de Pedro Varela, desarrollador fullstack especializado en React, Python, Node.js y AWS. 10+ proyectos en producción, 8+ años de experiencia.",
  keywords = "desarrollador fullstack, react developer, python developer, nodejs, aws, desarrollador web, programador honduras, fullstack engineer, web development",
  author = "Pedro Varela",
  image = "/og-image.jpg",
  url = "https://www.consultorvarela.com/",
  type = "website"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (property, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Primary Meta Tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('language', 'Spanish');
    updateMetaTag('revisit-after', '7 days');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('bingbot', 'index, follow');
    updateMetaTag('rating', 'general');
    updateMetaTag('distribution', 'global');
    updateMetaTag('HandheldFriendly', 'True');
    updateMetaTag('MobileOptimized', '320');
    updateMetaTag('geo.region', 'HN');
    updateMetaTag('geo.placename', 'Honduras');
    updateMetaTag('coverage', 'Worldwide');

    // Open Graph / Facebook
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'Pedro Varela Portfolio', true);
    updateMetaTag('og:locale', 'es_HN', true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', url, true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:creator', '@consultorvarela', true);

    // Additional SEO
    updateMetaTag('theme-color', '#10b981');
    updateMetaTag('msapplication-TileColor', '#10b981');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Add JSON-LD structured data
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Pedro Varela",
      "url": url,
      "image": "https://www.consultorvarela.com/img/herovarela.png",
      "jobTitle": "Desarrollador Fullstack",
      "description": "Desarrollador fullstack especializado en React, Python, Node.js y AWS con 8+ años de experiencia en proyectos gubernamentales y empresariales",
      "email": "consultorvarela@gmail.com",
      "worksFor": {
        "@type": "Organization",
        "name": "Consultor Independiente"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "HN",
        "addressRegion": "Honduras"
      },
      "sameAs": [
        "https://github.com/consultorvarela",
        "https://www.linkedin.com/in/consultorvarela/",
        "https://www.consultorvarela.com/"
      ],
      "knowsAbout": [
        "React",
        "Next.js",
        "Python",
        "Django",
        "Flask",
        "Node.js",
        "Express",
        "AWS",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "Full Stack Development",
        "Web Development",
        "Mobile Development",
        "React Native",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Universidad Nacional Autónoma de Honduras"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Certification",
          "name": "AWS Certified Developer"
        }
      ],
      "seeks": {
        "@type": "Demand",
        "name": "Oportunidades de desarrollo fullstack y consultoría tecnológica"
      }
    };

    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, author, image, url, type]);

  return null; // This component doesn't render anything
};

export default SEO;
