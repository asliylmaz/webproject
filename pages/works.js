import React from "react";
import Layout from "../layout/Layout";
import TitleSection from "../components/heading/TitleSection";
import Facts from "../components/facts/Facts";
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import ModalContact from "../components/model-right/ModalContact";
import Gallery from '../components/gallery/Gallery';
import ImageSection from "../components/Image/ImageSection";
import styles from '../styles/directors.module.scss';
import filters from '../data/filters';
import Link from 'next/link';
import Head from "next/head";
import HeaderFull from "../components/header/HeaderFull";
import { useTranslation } from 'react-i18next';
import GalleryOne from '../components/gallery/GalleryOne';

const images = [
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    '/img/underco.jpg',
    // Buraya daha fazla fotoğraf URL'si ekleyebilirsiniz
];

// const videos = [
//     {
//       src: '/img/banners1.mp4', // Vimeo or YouTube video URL
//     },
//     {
//       src: '/img/banners2.mp4', // Local video file path
//     },
//   ];
const headerContent = {
    
    video: "/img/bg7.mp4",
};

function Corporate() {
    const { t, i18n } = useTranslation();

    TitleSection.defaultProps = {
        classDesc: "line-shape line-shape-before",
        classDesInner: "line-bg-right",
    };
    return (

        <Layout>
            <Head>
                <title>{t('menuContent.works')} | 3Bölü2</title>
            </Head>

            {/* <div className={styles.container}>
                {filters.map((filter, index) => (
                    <span key={index}>
                        <Link href={filter.link} className={styles.filter}>
                            {filter.name}
                        </Link>
                    </span>
                ))}
            </div> */}
            <HeaderFull
                className="dsn-container"
                fullWidth
                heroContent={headerContent}
                overlay={6}
            >

            </HeaderFull>
            {/* <GalleryOne className="mt-15" videos={videos} /> */}
            <Gallery  images={images} />

            {/*========== Next Page ==========*/}
            <NextPage className="section-padding border-top background-section" />
            {/*========== End Next Page ==========*/}

            {/*========== Footer ==========*/}
            <Footer className="background-section" />
            {/*========== End Footer ==========*/}

        </Layout>

    );



}

export default Corporate;



