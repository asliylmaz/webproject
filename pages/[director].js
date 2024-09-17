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
import directors from '../data/directors'; // Yönetmen verilerini import ediyoruz

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

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setShowModal(true); // Modal'ı açıyoruz
    };
    

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

    return (
        <Layout modelRight={{ children: <ModalContact />, propsModal: { textBtn: "Contact" } }}>
            <Head>
                <title>3Bölü2 | {director.name}</title>
            </Head>

            {/* Video galerisi */}
            <div className={styles['gallery-container']}>
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                        <div
                            key={index}
                            className={`${styles['gallery-item']} ${index % 5 === 0 ? styles['full-width'] : ''}`}
                            onClick={() => handleVideoClick(video)}
                        >
                            <img
                                src={video.pictures.sizes[3].link}
                                alt={`Video ${index + 1}`}
                                className={styles['video-thumbnail']}
                            />
                        </div>
                    ))
                ) : (
                    <div className={styles['no-videos']}>
                        <video autoPlay muted loop className={styles['background-video']}>
                            <source src="/img/LOADING.mp4" type="video/mp4" />
                            Tarayıcınız video oynatmayı desteklemiyor.
                        </video>
                    </div>
                )}
            </div>

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
