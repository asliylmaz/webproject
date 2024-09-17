import directors from '../data/directors';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setVimeoLink } from '../features/vimeoSlice';
import styles from '../styles/directors.module.scss';
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import Layout from "../layout/Layout";
import Head from "next/head";

const Directors = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleDirectorClick = (director) => {
        dispatch(setVimeoLink(director.vimeo));
        // Yönetmenin URL'sini kullanarak slug oluşturuyoruz
        router.push(`/director-details-${director.url}`); // Yeni URL yapısına göre yönlendirme
    };

    return (
        <Layout>
            <Head>
                <title>Directors | 3Bölü2</title>
            </Head>

            <div className={styles.container}>
                {directors.map((director, index) => (
                    <span key={index}>
                        <a onClick={() => handleDirectorClick(director)} className={styles.neonText}>
                            {director.name}
                        </a>
                        {index < directors.length - 1 && <span className={styles.slash}> / </span>}
                    </span>
                ))}
            </div>

            <NextPage className="section-padding border-top background-section" />
            <Footer className="background-section" />
        </Layout>
    );
};

export default Directors;
