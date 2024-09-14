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



function Corporate() {
    TitleSection.defaultProps = {
        classDesc: "line-shape line-shape-before",
        classDesInner: "line-bg-right",
    };
    return (

        <Layout>
            <Head>
                <title>Works | 3Bölü2</title>
            </Head>

            <div className={styles.container}>
                {filters.map((filter, index) => (
                    <span key={index}>
                        <Link href={filter.link} className={styles.Filter}>
                            {filter.name}
                        </Link>
                    </span>
                ))}
            </div>

            <Gallery images={images} />

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



