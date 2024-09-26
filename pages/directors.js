import directors from '../data/directors';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setVimeoLink } from '../features/vimeoSlice';
import styles from '../styles/directors.module.scss';
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import Layout from "../layout/Layout";
import Head from "next/head";
import { useTranslation } from 'react-i18next';

const Directors = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const namesRef = useRef(null);

    const handleDirectorClick = (director) => {
        dispatch(setVimeoLink(director.vimeo));
        router.push(`/director-details-${director.url}`);
    };

    // Her satırın sonundaki slash'ı gizle
    const hideLastSlashInRow = () => {
        const container = namesRef.current;
        if (!container) return;
    
        const items = Array.from(container.children);
    
        // İlk başta tüm slash'ları görünür yapıyoruz
        items.forEach((item) => {
            const slash = item.querySelector(`.${styles.slash}`);
            if (slash) slash.style.display = 'inline';
        });
    
        let lastOffsetTop = items[0].offsetTop; // İlk satırın başlama noktası
        let lastItem = items[0]; // İlk satırdaki ilk öğe
    
        items.forEach((item, index) => {
            const currentOffsetTop = item.offsetTop;
            const slash = item.querySelector(`.${styles.slash}`);
    
            // Yeni bir satıra geçilmiş mi kontrol ediyoruz
            if (currentOffsetTop !== lastOffsetTop) {
                // Önceki satırdaki son slash'ı gizle
                const previousSlash = lastItem.querySelector(`.${styles.slash}`);
                if (previousSlash) previousSlash.style.display = 'none';
    
                // Yeni satıra geçildiği için, bu satırın başlangıcı
                lastOffsetTop = currentOffsetTop;
            }
            lastItem = item; // Son öğeyi güncelliyoruz
        });
    
        // Son satırın son slash'ını gizle
        const lastSlash = lastItem.querySelector(`.${styles.slash}`);
        if (lastSlash) lastSlash.style.display = 'none';
    };    


    useEffect(() => {
        hideLastSlashInRow();
        // Window yeniden boyutlandırıldığında yeniden çalıştır
        window.addEventListener('resize', hideLastSlashInRow);

        // Cleanup işlemi
        return () => {
            window.removeEventListener('resize', hideLastSlashInRow);
        };
    }, []);
    const { t, i18n } = useTranslation();

    return (
        <Layout>
            <Head>
                <title>{t('menuContent.directors')} | 3Bölü2</title>
            </Head>

            <div className={styles.container}>
                {/*<video autoPlay loop muted className={styles.backgroundVideo}>
                    <source src="/img/bg7.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>*/}

                <div className={styles.names} ref={namesRef}>
                    {directors.map((director, index) => (
                        <span key={index}>
                            <a onClick={() => handleDirectorClick(director)} className={styles.neonTextD}>
                                {director.name}
                            </a>
                            {index < directors.length - 1 && <span className={styles.slash}> / </span>}
                        </span>
                    ))}
                </div>
            </div>

            <NextPage className="section-padding border-top background-section" />
            <Footer className="background-section" />
        </Layout>
    );
};

export default Directors;
