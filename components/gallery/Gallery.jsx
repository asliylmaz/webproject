import React, { useEffect, useRef } from 'react';
import styles from '../../styles/gallery.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const galleryRef = useRef(null);
  const [videos, setVideos] = React.useState([]);

  useEffect(() => {
    // Vimeo API'den videoları alıyoruz
    axios({
      method: 'get',
      url: 'https://api.vimeo.com/me/videos',
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
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return;
  
    const items = galleryRef.current.querySelectorAll(`.${styles['gallery-item']}`);
    items.forEach((item, index) => {
      // Daha uzun bir mesafe için directionX değerini artırıyoruz
      const directionX = index % 2 === 0 ? -300 : 300; // Çift index'ler soldan, tek index'ler sağdan gelecek
  
      gsap.fromTo(
        item,
        { opacity: 0, x: directionX }, // Daha uzun mesafede x ekseninde hareket
        {
          opacity: 1,
          x: 0,
          duration: 0.5, // Daha hızlı geçiş için süreyi kısalttık
          ease: 'power3.out', // Daha hızlı bir easing kullanıyoruz
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, [videos]);
  

  const handleImageClick = (videoUrl) => {
    // Arka planı bulanıklaştırmak için body'ye blur class'ı ekle
    document.body.classList.add('blurred-background');

    // Resme tıklanınca video tam ekran oynat
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
    iframeContainer.style.background = 'rgba(0, 0, 0, 0.9)'; // Arka planı hafif karartmak için

    const iframe = document.createElement('iframe');
    iframe.src = `${videoUrl}?autoplay=1&fullscreen=1`;
    iframe.style.width = '80vw';
    iframe.style.height = '80vh';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;

    // Kapatma butonu oluştur
    const closeButton = document.createElement('img');
    closeButton.src = '/img/close.png'; // close.png dosyasının yolunu buraya ekleyin
    closeButton.alt = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '15px';  // Üstten 10px boşluk bırak
    closeButton.style.right = '20px'; // Soldan 10px boşluk bırak
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.zIndex = '10000';
    closeButton.style.cursor = 'pointer';

    // iframe ve butonu div içine ekle
    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(closeButton);
    document.body.appendChild(iframeContainer);

    // Kapatma butonuna tıklanınca iframe ve butonu kaldır
    closeButton.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      document.body.removeChild(iframeContainer);
      document.body.classList.remove('blurred-background'); // Bulanıklığı kaldır
    });
  };

  return (
    <div ref={galleryRef} className={styles['gallery-container']}>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div
            key={index}
            className={styles['gallery-item']}
            onClick={() => handleImageClick(video.embed.html.match(/src="([^"]+)"/)[1])}
          >
            <img
              src={video.pictures.sizes[3].link} // Orta boyutlu bir thumbnail seçiyoruz
              alt={`Video thumbnail ${index + 1}`}
              className={styles['video-thumbnail']}
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
                  }, 800); // 1 saniye bekleme süresi
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
export default Gallery;
