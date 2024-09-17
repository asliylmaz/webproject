import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import ModalContact from "../components/model-right/ModalContact";
import { useRouter } from 'next/router';
import Head from "next/head";
import styles from '../styles/gallery.module.scss';
import Player from '@vimeo/player'; // Vimeo Player SDK'yı import edin

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

function DirectorDetails() {
    const galleryRef = useRef(null);
    const modalRef = useRef(null); // Modal referansı
    const playerRef = useRef(null); // Player referansı
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const router = useRouter();
    const { name, vimeo } = router.query;

    useEffect(() => {
        if (vimeo) {
            getUserIdFromVimeoURL(vimeo).then(userId => {
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
                            setVideos(response.data.data);
                        } else {
                            console.error("Beklenen formatta video listesi bulunamadı.");
                        }
                    })
                    .catch((error) => {
                        console.error("Videolar alınırken bir hata oluştu:", error);
                    });
                }
            });
        }
    }, [vimeo]);

    useEffect(() => {
        // Eğer seçilen video varsa, player oluştur
        if (selectedVideo && modalRef.current) {
            const iframe = modalRef.current.querySelector('iframe');
            const player = new Player(iframe); // Vimeo Player SDK ile Player oluştur

            // Player referansını sakla
            playerRef.current = player;

            // Tam ekran moduna geçiş
            player.requestFullscreen().catch(error => {
                console.error("dull screen errorı:", error);
            });
        }
    }, [selectedVideo]);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    return (
        <Layout modelRight={{ children: <ModalContact />, propsModal: { textBtn: "Contact" } }}>
            <Head>
                <title>3Bölü2 | {name}</title>
            </Head>

            <div ref={galleryRef} className={styles['gallery-container']}>
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                        <div
                            key={index}
                            className={`${styles['gallery-item']} ${index % 5 === 0 ? styles['full-width'] : ''}`}
                            onClick={() => handleVideoClick(video)} // Videoya tıklanınca video seçiliyor
                        >
                            <img
                                src={video.pictures.sizes[3].link} // Küçük resim
                                alt={`Video ${index + 1}`}
                                className={styles['video-thumbnail']}
                            />
                        </div>
                    ))
                ) : (
                    <div className={styles['no-videos']}>
                        {/* Arka plan videosu */}
                        <video autoPlay muted loop className={styles['background-video']}>
                            <source src="/img/LOADING.mp4" type="video/mp4" />
                            Tarayıcınız video oynatmayı desteklemiyor.
                        </video>
                    </div>
                )}
            </div>

            {selectedVideo && (
                <div className={styles['video-modal']} ref={modalRef} onClick={() => setSelectedVideo(null)}>
                    <div className={styles['modal-content']}>
                        <iframe
                            src={`${selectedVideo.embed.html.match(/src="([^"]+)"/)[1]}`}
                            width="640"
                            height="360"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title={`Video ${selectedVideo.name}`}
                        ></iframe>
                    </div>
                </div>
            )}

            {/*========== Next Page ==========*/}
            <NextPage className="section-padding border-top background-section" />
            {/*========== End Next Page ==========*/}

            {/*========== Footer ==========*/}
            <Footer className="background-section" />
            {/*========== End Footer ==========*/}
        </Layout>
    );
}

export default DirectorDetails;
