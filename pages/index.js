import React from "react";
import Layout from "../layout/Layout";
import TitleSection from "../components/heading/TitleSection";
import SwiperPagination from "../components/swiper-pagination/SwiperPagination";
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import ModalContact from "../components/model-right/ModalContact";
import Gallery from '../components/gallery/Gallery';
import styles from '../styles/directors.module.scss';
import filters from '../data/filters';
import Link from 'next/link';
import Head from "next/head";
import HeaderFull from "../components/header/HeaderFull";
import Button from "../components/button/Button";
import {getServiceData} from "../data/service";
import ServiceSwiper from "../components/services/ServiceSwiper";


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
const headerContent = {
    title: `Every Story is a Masterpiece!`,
    video: "/img/bg.mp4",
};
function Corporate() {
    TitleSection.defaultProps = {
        classDesc: "line-shape line-shape-before",
        classDesInner: "line-bg-right",
    };
    return (

        <Layout>
            {/* <Layout modelRight={{ children: <ModalContact />, propsModal: { textBtn: "Contact" } }}></Layout> */}
            <Head>
                <title>3Bölü2</title>
            </Head>

            <HeaderFull
                className="dsn-container mty-10"
                fullWidth
                heroContent={headerContent}
                overlay={6}
            >
                <p className="mt-30 pb-30 border-bottom max-w570">
                Guided by our core values, we strive to provide you with the best service. For more details, visit our About page.
                </p>

                <div className="d-flex align-items-center mt-30">
                    <Button
                        href={"/about"}
                        className="mr-15 line-head"
                        borderStyle={"border-color-theme-color"}
                        borderRadius
                    >
                        About Us
                    </Button>
                    
                </div>
            </HeaderFull>

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



