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
      //url: url,
      headers: {
        Authorization: `Bearer 5078123016df2258c9b1ad437081e971`, // Access token'ı buraya ekleyin
      },
    })
      .then((response) => {
        // API'den gelen videoları setVideos ile state'e kaydediyoruz
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setVideos(response.data.data); // Dizi olarak video verilerini ayarla
        } else {
          console.error("Beklenen formatta video listesi bulunamadı.");
        }
      })
      .catch((error) => {
        console.error("API çağrısında bir hata oluştu:", error);
      });
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const items = galleryRef.current.querySelectorAll(`.${styles['gallery-item']}`);
    let i = 0;
    items.forEach((item, index) => {
      const isFullWidth = index % 5 === 0;
      let directionX = 0;
      let directionY = 0;
      if (isFullWidth) {
        i = i + 1;
        directionY = index % 5 === 0 ? 100 : -100;
      } else if (i % 2 === 0) {
        directionX = index % 2 === 0 ? -100 : 100;
      } else {
        directionX = index % 2 === 1 ? -100 : 100;
      }

      gsap.fromTo(
        item,
        { opacity: 0, x: directionX, y: directionY },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, [videos]);

  return (
    <div ref={galleryRef} className={styles['gallery-container']}>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div
            key={index}
            className={`${styles['gallery-item']} ${index % 5 === 0 ? styles['full-width'] : ''}`}
          >
            <iframe key={index}
               className={`${styles['gallery-item']} ${index % 5 === 0 ? styles['full-width'] : ''}`}
              src={`${video.embed.html.match(/src="([^"]+)"/)[1]}`}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={`Video ${index + 1}`}
            ></iframe>
          </div>
        ))
      ) : (
        <p>Videos not found.</p>
      )}
    </div>
  );
};

export default Gallery;
