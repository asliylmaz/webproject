import React from "react";
import Layout from "../layout/Layout";
import TitleSection from "../components/heading/TitleSection";
import SliderPortfolio from "../components/slider-portfolio/SliderPortfolio";
import HeroSection2 from "../components/hero-section/HeroSection2";
import ServiceSwiperOne from "../components/services/swiper/ServiceSwiperOne";
import PortfolioSwiper from "../components/portfolio/PortfolioSwiper";
import Facts from "../components/facts/Facts";
import BgDot from "../components/header/BgDot";
import BlogSwiper from "../components/bolg/BlogSwiper";
import SwiperPagination from "../components/swiper-pagination/SwiperPagination";
import BrandClient from "../components/brand-client/BrandClient";
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import ModalContact from "../components/model-right/ModalContact";
import Gallery from '../components/gallery/Gallery';
import ImageSection from "../components/Image/ImageSection";
import styles from '../styles/directors.module.scss';
import filters from '../data/filters';
import Link from 'next/link';
import Head from "next/head";
import PageLogo from "../components/header/pageLogo/pageLogo";

//import Error404 from "./error404";
const images = [
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    '/img/unconstruction.png',
    // Buraya daha fazla fotoğraf URL'si ekleyebilirsiniz
];

const dataSlider = [{
    id: 1,
    title: `Craft Elegant <br /> Solutions`,
    href: {
        href: "#0",
        target: "_blank",
        rel: "nofollow"
    },
    buttonText: "LEARN MORE",
    subtitle: `We're a design studio that believe in the ideas`,
    src: '/img/agency.jpg',
    overlay: 6,

},
{
    id: 2,
    title: `Crafting Digital <br/> Experiences`,

    href: {
        href: "#0",
        target: "_blank",
        rel: "nofollow"
    },
    buttonText: "LEARN MORE",
    src: '/img/header.jpg',
    subtitle: `we combine design, thinking and technical craft`,
    overlay: 6,

},
{
    id: 3,
    title: `Creative <br/> Solutions`,
    href: {
        href: "#0",
        target: "_blank",
        rel: "nofollow"
    },
    buttonText: "LEARN MORE",
    src: '/img/corporate.jpg',
    subtitle: `We're a design studio that believe in the ideas`,
    overlay: 6
},
]

function Corporate() {

    {/*TitleSection.defaultProps = {
        className: "align-items-center text-center",
        classDesc: "line-shape line-shape-after",
        classDesInner: "line-bg-left"
    }*/}
    // const isEnabled = false; // Sayfa görünürlüğünü kontrol eden değişken

    // if (!isEnabled) {
    //     return <Error404 />;
    // }

    return (

        <Layout modelRight={{ children: <ModalContact />, propsModal: { textBtn: "Contact" } }}>
            <Head>
                <title>3Bölü2</title>
            </Head>

            <div className="image-container-a">
                <div className="services-container-a">
                    <video
                        className="background-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/img/homeBanner.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
           
            <div className={styles.containerD}>
                {filters.map((filter, index) => (
                    <span key={index}>
                        <p  className={styles.neonTextD}>
                            {filter.name}
                        </p>
                    </span>
                ))}
            </div>
            <h1 className="font-size-left">Featured Works</h1>
            <Gallery />

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



