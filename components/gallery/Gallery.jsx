import React, { useEffect, useRef } from 'react';
import styles from '../../styles/gallery.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery = ({ images }) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const items = galleryRef.current.querySelectorAll(`.${styles['gallery-item']}`);
    let i=0;
    items.forEach((item, index) => {
      const isFullWidth = index % 5 === 0; // 0, 5, 10 gibi indexler tam genişlikte olacak
      let directionX = 0;
      let directionY = 0;
      if (isFullWidth) {
        i=i+1;
        directionY = index % 5 === 0 ? 100 : -100; // Tam genişlikte olanlar yukarıdan/aşağıdan gelir
      } else if (i % 2 === 0) {
        directionX = index % 2 === 0 ? -100 : 100; // Çift sütun düzenindekiler sağdan/sola gelir
      }
      else{
        directionX = index % 2 ==! 0 ? -100 : 100;
      }

      gsap.fromTo(
        item,
        { opacity: 0, x: directionX, y: directionY }, // Başlangıç durumu
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom', // Animasyon sayfa kaydırıldığında başlar
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, [images]);

  return (
    <div ref={galleryRef} className={styles['gallery-container']}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles['gallery-item']} ${index % 5 === 0 ? styles['full-width'] : ''}`}
        >
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
