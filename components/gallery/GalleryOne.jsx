import React, { useEffect, useRef } from 'react';
import styles from '../../styles/gallery.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GalleryOne = () => {
  const galleryRef = useRef(null);

  const videoData = [
    {
      videoSrc: '/img/banners1.mp4',
      coverImg: '/img/fb1.png', // Kapak resmi
    },
    {
      videoSrc: '/img/banners2.mp4',
      coverImg: '/img/gs1.png', // Kapak resmi
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const items = galleryRef.current.querySelectorAll(`.${styles['full-width']}`);
    items.forEach((item, index) => {
      const directionX = index % 2 === 0 ? -300 : 300; // Çift index'ler soldan, tek index'ler sağdan gelecek

      gsap.fromTo(
        item,
        { opacity: 0, x: directionX }, // x ekseninde daha uzun mesafe
        {
          opacity: 1,
          x: 0,
          duration: 0.5, // Daha hızlı geçiş
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, [videoData]);

  const handleImageClick = (videoUrl) => {
    document.body.classList.add('blurred-background');

    const iframeContainer = document.createElement('div');
    iframeContainer.style.position = 'fixed';
    iframeContainer.style.top = '0';
    iframeContainer.style.left = '0';
    iframeContainer.style.width = '100vw';
    iframeContainer.style.height = '100vh';
    iframeContainer.style.zIndex = '9999';
    iframeContainer.style.display = 'flex';
    iframeContainer.style.justifyContent = 'center';
    iframeContainer.style.alignItems = 'center';
    iframeContainer.style.background = 'rgba(0, 0, 0, 0.9)';

    const iframe = document.createElement('iframe');
    iframe.src = `${videoUrl}?autoplay=1&fullscreen=1`;
    iframe.style.width = '80vw';
    iframe.style.height = '80vh';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;

    const closeButton = document.createElement('img');
    closeButton.src = '/img/close.png';
    closeButton.alt = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '15px';
    closeButton.style.right = '20px';
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.cursor = 'pointer';

    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(closeButton);
    document.body.appendChild(iframeContainer);

    closeButton.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      document.body.removeChild(iframeContainer);
      document.body.classList.remove('blurred-background');
    });
  };

  return (
    <div ref={galleryRef} className={styles['gallery-containerOne']}>
      {videoData.map((data, index) => (
        <div key={index} className={styles['full-width']}>
          <img
            src={data.coverImg}
            alt={`Thumbnail for video ${index + 1}`}
            className={styles['video-thumbnailOne']}
            onClick={() => handleImageClick(data.videoSrc)}
            style={{
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              if (target) {
                target.hoverTimeout = setTimeout(() => {
                  target.style.transform = 'scale(1.1)'; // Üzerine gelince büyüme
                }, 500); // 500ms sonra büyütme
              }
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              if (target) {
                clearTimeout(target.hoverTimeout);
                target.style.transform = 'scale(1)'; // Fare uzaklaşınca eski boyutuna dön
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryOne;
