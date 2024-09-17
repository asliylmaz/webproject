import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/gallery.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const galleryRef = useRef(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Vimeo API'den videoları alıyoruz
    axios({
      method: 'get',
      url: 'https://api.vimeo.com/me/videos',
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
    
    gsap.fromTo(
      items,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,  // Animasyonlar arasında gecikme
        ease: 'power2.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          markers: false,
        },
      }
    );
  }, [videos]);

  return (
    <div ref={galleryRef} className={styles['gallery-container']}>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <LazyVideoItem key={index} video={video} index={index} />
        ))
      ) : (
        <p>Videos not found.</p>
      )}
    </div>
  );
};

const LazyVideoItem = ({ video, index }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      className={`${styles['gallery-item']} ${index % 5 === 0 ? styles['full-width'] : ''}`}
      onClick={() => setShowVideo(true)}
    >
      {!showVideo ? (
        <img
          src={video.pictures.sizes[3].link}
          alt={`Thumbnail for ${video.name}`}
          className={styles['video-thumbnail']}
        />
      ) : (
        <iframe
          src={`${video.embed.html.match(/src="([^"]+)"/)[1]}`}
          width="640"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={`Video ${index + 1}`}
        ></iframe>
      )}
    </div>
  );
};

export default Gallery;
