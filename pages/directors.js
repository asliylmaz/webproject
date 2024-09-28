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
import { useMemo } from 'react';

const Directors = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const namesRef = useRef(null);
    const { t, i18n } = useTranslation();

    const handleDirectorClick = (director) => {
        dispatch(setVimeoLink(director.vimeo));
        router.push(`/director-details-${director.url}`);
    };

 
    const renderedDirectors = useMemo(() => {
        return directors.map((director, index) => (
            <span key={index}>
                <a onClick={() => handleDirectorClick(director)} className={styles.neonTextD}>
                    {director.name}
                </a>
                {index < directors.length - 1 && <span className={styles.slash}> / </span>}
            </span>
        ));
    }, [directors, handleDirectorClick, styles]);



    return (
        <Layout>
            <Head>
                <title>3Bölü2 | {t('menuContent.directors')} </title>
            </Head>

            <div className={styles.container}>
            <div className={styles.names}>
                {renderedDirectors}
            </div>
        </div>


            <NextPage className="section-padding border-top background-section" />
            <Footer className="background-section" />
        </Layout>
    );
};

export default Directors;
