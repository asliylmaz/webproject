import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/gallery.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const galleryRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // Seçilen video için state
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Modal pozisyonu için state

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

    items.forEach((item, index) => {
      const direction = index % 2 === 0 ? 'left' : 'right';
      const fromX = direction === 'left' ? '-100%' : '100%';

      gsap.fromTo(
        item,
        { opacity: 0, x: fromX },
        {
          opacity: 1,
          x: '0%',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: false,
            onEnter: () => {
              gsap.to(item, { opacity: 1, x: '0%', duration: 0.8 });
            },
            onLeaveBack: () => {
              gsap.to(item, { opacity: 0, x: fromX, duration: 0.8 });
            },
          },
        }
      );
    });
  }, [videos]);

  // Modal'ı kapatma fonksiyonu
  const closeModal = () => {
    setSelectedVideo(null); // Seçilen videoyu sıfırlıyoruz, modal kapanır
  };

  const handleVideoClick = (video, event) => {
    const modalWidth = window.innerWidth * 0.8; // Ekranın %80'ini kaplayacak genişlik
    const modalHeight = window.innerHeight * 0.8; // Genişliğe göre %80 yüksekliği
  
    const windowWidth = window.innerWidth;
  
    // Tıklanan öğenin pozisyonunu alıyoruz
    const elementRect = event.target.getBoundingClientRect();
    
    // Tıklanan öğenin konumuna göre modal pozisyonunu ayarla
    const top = elementRect.top;
    const left = (windowWidth - modalWidth) / 2; // Yatayda tam ortala
    
    setModalPosition({ top, left });
    setSelectedVideo(video);
  };
  
  


  return (
    <div ref={galleryRef} className={styles['gallery-container']}>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <LazyVideoItem
            key={index}
            video={video}
            index={index}
            onClick={(event) => handleVideoClick(video, event)} // Videoya tıklandığında modal pozisyonu ayarlanır
          />
        ))
      ) : (
        <p>Videos not found.</p>
      )}

      {selectedVideo && (
        <div
          className={styles['video-modal']}
          style={{ top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }} // Modal pozisyonunu dinamik olarak ayarla
        >
          <div className={styles['modal-content']}>
            <iframe
              src={`${selectedVideo.embed.html.match(/src="([^"]+)"/)[1]}`}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Selected Video"
            ></iframe>
            <button className={styles['close-button']} onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const LazyVideoItem = ({ video, index, onClick }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      className={`${styles['gallery-item']} ${index % 5 === 0 ? styles['full-width'] : ''}`}
      onClick={onClick} // Tıklanıldığında modal açılması için onClick event'i ekleniyor
    >
      <img
        src={video.pictures.sizes[3].link}
        alt={`Thumbnail for ${video.name}`}
        className={styles['video-thumbnail']}
      />
    </div>
    
  );
  
};

export default Gallery;
