import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/gallery.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const GalleryOne = () => {
  const galleryRef = useRef(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch videos from API
    axios.get('/api/portfolio/bigvideos')
      .then((response) => {
        if (response.data?.data && Array.isArray(response.data.data)) {
          setVideos(response.data.data); // Save videos to state
        } else {
          console.error('Video list not found in expected format.');
        }
      })
      .catch((error) => {
        console.error('Error occurred in the API call:', error);
      });
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return; // Skip animations on mobile

    const items = galleryRef.current.querySelectorAll(`.${styles['full-width']}`);
    items.forEach((item, index) => {
      const directionX = index % 2 === 0 ? -300 : 300; // Slide direction

      gsap.fromTo(
        item,
        { opacity: 0, x: directionX },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
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
    // Apply blurred background on video click
    document.body.classList.add('blurred-background');

    // Create and style iframe container
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

    // Create and style iframe element
    const iframe = document.createElement('iframe');
    iframe.src = `${videoUrl}?autoplay=1&fullscreen=1`;
    iframe.style.width = '80vw';
    iframe.style.height = '80vh';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;

    // Create and style close button
    const closeButton = document.createElement('img');
    closeButton.src = '/img/close.png';
    closeButton.alt = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '15px';
    closeButton.style.right = '20px';
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.cursor = 'pointer';

    // Append elements to container
    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(closeButton);
    document.body.appendChild(iframeContainer);

    // Close video and remove iframe
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
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div
            key={index}
            className={styles['full-width']}
            onClick={() => handleImageClick(video.embed.html.match(/src="([^"]+)"/)[1])}
          >
            <img
              src={video.pictures.sizes[3].link} // Medium-sized thumbnail
              alt={`Video thumbnail ${index + 1}`}
              className={styles['video-thumbnailOne']}
              style={{
                transition: 'transform 0.3s ease-in-out', // Smooth hover effect
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.hoverTimeout = setTimeout(() => {
                  target.style.transform = 'scale(1.1)';
                }, 800); // Delay hover animation
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                clearTimeout(target.hoverTimeout);
                target.style.transform = 'scale(1)'; // Reset to original size
              }}
            />
             {/* Başlık için div */}
             <div className={styles['video-title']}>{video.name}</div>
            {/* Video açıklaması */}
            <div className={styles['video-description']}>{video.description}</div>
          </div>
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default GalleryOne;
