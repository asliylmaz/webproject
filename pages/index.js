import React from "react";
import Layout from "../layout/Layout";
import TitleSection from "../components/heading/TitleSection";
import DsnGrid from "../layout/DsnGrid";
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import List from "../components/list/List";
import GalleryHome from '../components/gallery/GalleryHome';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import filters from '../data/filters';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import HeaderFull from "../components/header/HeaderFull";
import Button from "../components/button/Button";
import {getServiceData} from "../data/service";
import ServiceSwiper from "../components/services/ServiceSwiper";
import { useTranslation } from 'react-i18next';
import GalleryOne from '../components/gallery/GalleryOne';
import GalleryHome from '../components/gallery/GalleryHome';

const videos = [
    {
      src: '/img/banners1.mp4', // Vimeo or YouTube video URL
    },
    {
      src: '/img/banners2.mp4', // Local video file path
    },
  ];

const headerContent = {
    title: `Every Story is a Masterpiece!`,
    video: "/img/deneme.mp4",
};
function Corporate() {
    TitleSection.defaultProps = {
        classDesc: "line-shape line-shape-before",
        classDesInner: "line-bg-right",
    };
    const { t, i18n } = useTranslation();

    return (

        <Layout>
            {/* <Layout modelRight={{ children: <ModalContact />, propsModal: { textBtn: t('contactU') } }}></Layout> */}
            <Head>
                <title>3Bölü2</title>
            </Head>

            <HeaderFull
                className="dsn-container"
                fullWidth
                heroContent={headerContent}
                overlay={6}
            >
                <p className="mt-30 pb-30 border-bottom max-w570">
                {t('headerContentSubtitle')}
                </p>

                <div className="d-flex align-items-center mt-30">
                    <Button
                        href={"/about"}
                        className="mr-15 line-head"
                        borderStyle={"border-color-theme-color"}
                        borderRadius
                    >
                        {t('aboutus')}
                    </Button>
                    
                </div>
            </HeaderFull>



           
            {/* <div className={styles.containerD}>
                {filters.map((filter, index) => (
                    <span key={index}>
                        <p  className={styles.neonTextD}>
                            {filter.name}
                        </p>
                    </span>
                ))}
            </div> */}
            <h1 className="font-size-left">{t('feature')}</h1>
            <GalleryOne videos={videos} />
            <GalleryHome />

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


