import directors from '../data/directors';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/directors.module.scss';
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import Layout from "../layout/Layout";
import Head from "next/head";

const Directors = () => {
    return (
        <Layout>
            <Head>
                <title>Directors | 3Bölü2</title>
            </Head>
        
            {/* Arkaplan görseli ve yönetmen isimleri */}
            <div className="image-container-d">
                {/* Yönetmen listesi */}
                <div className={styles.container}>
                    {directors.map((director, index) => (
                        <span key={index}>
                            {/* Yönetmen bilgilerini query parametre olarak gönderiyoruz */}
                            <Link href={{
                                pathname: '/director-details',
                                query: { name: director.name, vimeo: director.vimeo }
                            }} className={styles.neonText}>
                                {director.name}
                            </Link>
                            {index < directors.length - 1 && <span className={styles.slash}> / </span>}
                        </span>
                    ))}
                </div>
            </div>

            {/* NextPage Bileşeni */}
            <NextPage className="section-padding border-top background-section" />

            {/* Footer Bileşeni */}
            <Footer className="background-section" />
        </Layout>
    );
}

export default Directors;
