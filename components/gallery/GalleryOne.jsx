import React, { useEffect, useRef } from 'react';
import styles from '../../styles/gallery.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const GalleryOne = () => {
  const galleryRef = useRef(null);
  const [videos, setVideos] = React.useState([]);
 const folderId="22254145"; // Klasör ID'si
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
    // Vimeo API'den klasör içerisindeki videoları alıyoruz
    axios({
      method: 'get',
      url: `https://api.vimeo.com/me/projects/${folderId}/videos`,  // folderId ile çağrıyı özelleştiriyoruz
      headers: {
        Authorization: 'Bearer 5078123016df2258c9b1ad437081e971', // Access token'ı buraya ekleyin
      },
    })
      .then((response) => {
        // API'den gelen videoları setVideos ile state'e kaydediyoruz
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setVideos(response.data.data); // Dizi olarak video verilerini ayarla
        } else {
          console.error("Video list not found in expected format.");
        }
      })
      .catch((error) => {
        console.error("An error occurred in the API call:", error);
      });
  }, [folderId]); // folderId'yi bağımlılığa ekliyoruz

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
    <div ref={galleryRef} className={styles['gallery-container']}>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div
            key={index}
            className={styles['full-width']}
            onClick={() => handleImageClick(video.embed.html.match(/src="([^"]+)"/)[1])}
          >
            <img
              src={video.pictures.sizes[3].link} // Orta boyutlu bir thumbnail seçiyoruz
              alt={`Video thumbnail ${index + 1}`}
              className={styles['video-thumbnailOne']}
              style={{
                transition: 'transform 0.3s ease-in-out', // Yumuşak geçiş efekti
              }}              
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                // target'ın varlığını kontrol et
                if (target) {
                  target.hoverTimeout = setTimeout(() => {
                    if (target) {
                      target.style.transform = 'scale(1.1)';
                    }
                  }, 500); // 1 saniye bekleme süresi
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                // target'ın varlığını kontrol et
                if (target) {
                  clearTimeout(target.hoverTimeout);
                  target.style.transform = 'scale(1)'; // Eski boyuta dön
                }
              }}
            />
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default GalleryOne;
