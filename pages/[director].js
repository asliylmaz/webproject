import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import ModalContact from "../components/model-right/ModalContact";
import Head from "next/head";
import styles from '../styles/gallery.module.scss';
import Player from '@vimeo/player';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from "../components/loading/LoadingSpinner";
import directors from '../data/directors'; // Yönetmen verilerini import ediyoruz
import DirectorHeader from "../components/header/DirectorHeader";
const headerContent = {
    video: "/img/directorbg.mp4",
};

// Kapak fotoğraflarını video URL'leriyle eşleştiren bir nesne
const customThumbnails = {
    "https://vimeo.com/575363426": "/img/burcu1.png",
    "https://vimeo.com/575361777": "/img/burcu2.png",
    "https://vimeo.com/574395611": "/img/burcu3.png",
    "https://vimeo.com/574394742": "/img/burcu4.png"
};

function DirectorDetails({ director }) {
    const [loading, setLoading] = useState(true); // Loading durumu
    const [videos, setVideos] = useState([]); // Videoları tutacak state
    const [selectedVideo, setSelectedVideo] = useState(null); // Seçilen video
    const [showModal, setShowModal] = useState(false); // Modal'ı kontrol etmek için state
    const modalRef = useRef(null); // Modal referansı
    const directorsRef = useRef(null);

    useEffect(() => {
        if (director && director.vimeo) {
          // Sunucu tarafındaki API'yi çağırıp videoları alıyoruz
          axios.get(`/api/portfolio/directorvideos?vimeoURL=${director.vimeo}`)
            .then((response) => {
              if (response.data && response.data.data && Array.isArray(response.data.data)) {
                setVideos(response.data.data); // Videoları state'e kaydet
              } else {
                console.error('Beklenen formatta video listesi bulunamadı.');
              }
            })
            .catch((error) => {
              console.error('API çağrısında bir hata oluştu:', error);
            })
            .finally(() => {
              setLoading(false); // Yüklenme durumu kapat
            });
        } else {
          console.error('Yönetmenin Vimeo URL\'si bulunamadı.');
          setLoading(false); // Eğer URL yoksa yüklenme durumu kapat
        }
      }, [director]);
    
    const closeModal = () => {
        setSelectedVideo(null);
        setShowModal(false);
    };

    useEffect(() => {
        if (window.innerWidth < 768) return;

        const items = directorsRef.current.querySelectorAll(`.${styles['gallery-item']}`);
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

    const { t } = useTranslation();

    return (
        <Layout modelRight={{ children: <ModalContact />, propsModal: { textBtn: t('contactU') } }}>
            <Head>
                <title>3Bölü2 | {director.name}</title>
            </Head>
            <DirectorHeader 
                className="dsn-container" 
                fullWidth 
                heroContent={headerContent} 
                overlay={6}
                director={director}
            />

            <div ref={directorsRef} className={styles['gallery-containerD']}>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    videos.length > 0 && (
                        videos.map((video, index) => (
                            <div
                                key={index}
                                className={styles['gallery-item']}
                                onClick={() => handleImageClick(video.embed.html.match(/src="([^"]+)"/)[1])}
                            >
                                <img
                                    src={
                                        customThumbnails[video.link] || video.pictures.sizes[3].link
                                    } // Özel kapak fotoğrafı veya Vimeo'dan gelen küçük resim
                                    alt={`Video ${index + 1}`}
                                    className={styles['video-thumbnail']}
                                    style={{
                                        transition: 'transform 0.3s ease-in-out',
                                    }}
                                    onMouseEnter={(e) => {
                                        const target = e.currentTarget;
                                        if (target) {
                                            target.hoverTimeout = setTimeout(() => {
                                                if (target) {
                                                    target.style.transform = 'scale(1.1)';
                                                }
                                            }, 500);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        const target = e.currentTarget;
                                        if (target) {
                                            clearTimeout(target.hoverTimeout);
                                            target.style.transform = 'scale(1.0)';
                                        }
                                    }}
                                />
                            </div>
                        ))
                    )
                )}
            </div>

            <NextPage className="section-padding border-top background-section" />
            <Footer className="background-section" />
        </Layout>
    );
}

export default DirectorDetails;

// getServerSideProps ile URL'yi kontrol edip yönetmen verisini buluyoruz
export async function getServerSideProps(context) {
    const { director } = context.params;

    if (!director.startsWith("director-details-")) {
        return {
            notFound: true,
        };
    }

    const directorUrl = director.replace("director-details-", "");
    const directorData = directors.find(d => d.url === directorUrl);

    if (!directorData) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            director: directorData,
        },
    };
}
