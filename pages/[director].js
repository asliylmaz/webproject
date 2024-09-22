import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Layout from "../layout/Layout";
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import ModalContact from "../components/model-right/ModalContact";
import Head from "next/head";
import styles from '../styles/gallery.module.scss';
import Player from '@vimeo/player';
import { gsap } from 'gsap';
import directors from '../data/directors'; // Yönetmen verilerini import ediyoruz
import DirectorHeader
    from "../components/header/DirectorHeader";
const headerContent = {
    video: "/img/directorbg.mp4",
};
// Vimeo kullanıcı ID'sini çekmek için fonksiyon
function getUserIdFromVimeoURL(vimeoURL) {
    const username = vimeoURL.split("vimeo.com/")[1];
    return axios({
        method: 'get',
        url: `https://api.vimeo.com/users/${username}`,
        headers: {
            Authorization: `Bearer 5078123016df2258c9b1ad437081e971`,
        },
    })
        .then((response) => {
            if (response.data && response.data.uri) {
                const userId = response.data.uri.split("/users/")[1];
                return userId;
            } else {
                console.error("Kullanıcı bilgileri alınamadı.");
                return null;
            }
        })
        .catch((error) => {
            console.error("API çağrısında hata oluştu:", error);
            return null;
        });
}

function DirectorDetails({ director }) {
    const [videos, setVideos] = useState([]); // Videoları tutacak state
    const [selectedVideo, setSelectedVideo] = useState(null); // Seçilen video
    const [showModal, setShowModal] = useState(false); // Modal'ı kontrol etmek için state
    const modalRef = useRef(null); // Modal referansı
    const directorsRef = useRef(null);
    useEffect(() => {
        if (director && director.vimeo) {
            getUserIdFromVimeoURL(director.vimeo).then(userId => {
                if (userId) {
                    axios({
                        method: 'get',
                        url: `https://api.vimeo.com/users/${userId}/videos`,
                        headers: {
                            Authorization: `Bearer 5078123016df2258c9b1ad437081e971`,
                        },
                    })
                        .then((response) => {
                            if (response.data && response.data.data) {
                                setVideos(response.data.data); // Videoları state'e kaydediyoruz
                            } else {
                                console.error("Beklenen formatta video listesi bulunamadı.");
                            }
                        })
                        .catch((error) => {
                            console.error("Videolar alınırken bir hata oluştu:", error);
                        });
                }
            });
        } else {
            console.error("Vimeo linki bulunamadı.");
        }
    }, [director]);

    const closeModal = () => {
        setSelectedVideo(null);
        setShowModal(false);
    };
    useEffect(() => {
        if (selectedVideo && modalRef.current) {
            const iframe = modalRef.current.querySelector('iframe');
            const player = new Player(iframe);

            // Remove or comment out the fullscreen request to prevent it from opening automatically
            // player.requestFullscreen().catch(error => {
            //     console.error("Tam ekran hatası:", error);
            // });
        }
    }, [selectedVideo]);
    //video geçiş efekti
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
        <Layout modelRight={{ children: <ModalContact />, propsModal: { textBtn: "Contact" } }}>
            <Head>
                <title>3Bölü2 | {director.name}</title>
            </Head>
            <DirectorHeader 
            className="dsn-container" 
            fullWidth 
            heroContent={headerContent} 
            overlay={6}
            director={director}>
            </DirectorHeader>
            {/* Video galerisi */}
            {/* <div ref={directorsRef} className={styles['gallery-container']}>
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                        <div
                            key={index}
                            className={`${styles['gallery-item']} ${index % 5 === 0 ? styles['full-width'] : ''}`}
                            onClick={() => handleImageClick(video.embed.html.match(/src="([^"]+)"/)[1])}
                        >
                            <img
                                src={video.pictures.sizes[3].link}
                                alt={`Video ${index + 1}`}
                                className={styles['video-thumbnail']}
                            />
                        </div>
                    ))
                )   : (
                    <div className={styles['no-videos']}>
                        <video autoPlay muted loop className={styles['background-video']}>
                            <source src="/img/LOADING.mp4" type="video/mp4" />
                            Tarayıcınız video oynatmayı desteklemiyor.
                        </video>
                    </div>
                )}
            </div> */}
            {/* Video galerisi */}
            <div ref={directorsRef} className={styles['gallery-container']}>
                {videos.length > 0 && (
                    videos.map((video, index) => (
                        <div
                            key={index}
                            className={`${styles['gallery-item']} ${index % 5 === 0 ? styles['full-width'] : ''}`}
                            onClick={() => handleImageClick(video.embed.html.match(/src="([^"]+)"/)[1])}
                        >
                            <img
                                src={video.pictures.sizes[3].link}
                                alt={`Video ${index + 1}`}
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
                                      }, 100); // 1 saniye bekleme süresi
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    const target = e.currentTarget;
                                    // target'ın varlığını kontrol et
                                    if (target) {
                                      clearTimeout(target.hoverTimeout);
                                      target.style.transform = 'scale(1.0)'; // Eski boyuta dön
                                    }
                                  }}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* <HeaderFull
                className="dsn-container"
                fullWidth
                heroContent={headerContent}
                overlay={6}
            >

            </HeaderFull> */}
            {showModal && selectedVideo && (
                <div className={styles['video-modal']} ref={modalRef} onClick={closeModal}>
                    <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                        {/* Kapatma Butonu */}
                        <button className={styles['close-button']} onClick={closeModal}>X</button>

                        <iframe
                            src={`${selectedVideo.embed.html.match(/src="([^"]+)"/)[1]}`}
                            width="640"
                            height="360"
                            frameBorder="0"
                            allow="autoplay; picture-in-picture"
                            allowFullScreen
                            title={`Video ${selectedVideo.name}`}
                        ></iframe>
                    </div>
                </div>
            )}

            <NextPage className="section-padding border-top background-section" />
            <Footer className="background-section" />
        </Layout>
    );
}

export default DirectorDetails;


// getServerSideProps ile URL'yi kontrol edip yönetmen verisini buluyoruz
export async function getServerSideProps(context) {
    const { director } = context.params;

    // URL'nin "director-details-" ile başladığından emin olun
    if (!director.startsWith("director-details-")) {
        return {
            notFound: true,
        };
    }

    // URL'deki "director-details-" kısmını temizleyip yönetmen adını elde ediyoruz
    const directorUrl = director.replace("director-details-", "");

    // Yönetmen verisini bul
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