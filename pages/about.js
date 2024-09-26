
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import HeaderNormal from "../components/header/HeaderNormal";
import TitleSection from "../components/heading/TitleSection";
import ParallaxImage from "../components/Image/ParallaxImage";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import List from "../components/list/List";
import DsnGrid from "../layout/DsnGrid";
import Layout from "../layout/Layout";
import BoxGallery, {
    BoxGalleryItem,
} from "../components/box-gallery/BoxGallery";
import { dsnCN } from "../hooks/helper";
import MoveTrigger from "../animation/MoveTrigger";
import FadeUpTrigger from "../animation/FadeUpTrigger";
import Team from "../components/Team/Team";
import Testimonial from "../components/testimonial/Testimonial";
import SwiperPagination from "../components/swiper-pagination/SwiperPagination";
import NextPage from "../components/next/NextPage";
import BrandClient from "../components/brand-client/BrandClient";
import Awards from "../components/awards/Awards";
import { getTeamData } from "../data/team";
import Service from "../components/services/Service";
import { getServiceData } from "../data/service";
import Image from "next/image";
import ModalContact from "../components/model-right/ModalContact";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import ImageWithTitles from "../components/Image/ImageWithTitles";
import { useTranslation } from 'react-i18next';

//import Error404 from "./error404";
const HeroContent = {
     heroImage: '/img/about.jpg',
}
function About({ className, ...restProps }) {
    TitleSection.defaultProps = {
        classDesc: "line-shape line-shape-before",
        classDesInner: "line-bg-right",
    };
    const { t, i18n } = useTranslation();
    const awards = [
        { number: 23, description: t('hero.awards.directors') },
        { number: 19, description: t('hero.awards.satisfiedCustomers') },
    ];
    // const isEnabled = false; // Sayfa görünürlüğünü kontrol eden değişken

    // if (!isEnabled) {
    //     return <Error404 />; 
    //   }


    return (
        <Layout modelRight={{ children: <ModalContact />, propsModal: { textBtn: t('contactU') } }}>
            <Head>
                <title>{t('menuContent.about')} | 3Bölü2</title>
            </Head>

            {/* <div className="image-container-a">
                <div
                    className="services-container-a"
                    style={{
                        backgroundImage: "url('/img/bg-2.jpg')",
                    }}

                />

                <ImageWithTitles />
            </div> */}
            {/* <div className="image-container-a">
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
                <ImageWithTitles />
            </div> */}

            {/*========== Header Normal ========== */}
            <HeaderNormal className="">

                <h1 className="title text-uppercase">
                    <br />
                </h1>
            </HeaderNormal>
            {/*========== End Header Normal ==========*/}
            {/*Start Parallax Img*/}
            <ParallaxImage alt={""} src={"/img/displacement/7.jpg"}
                parallaxFrom={{ scale: 1.3 }} parallax={{ scale: 1 }}
                overlay={5} />
            <ImageWithTitles />
            {/*End Parallax Img*/}

            <section className={dsnCN(`about-section p-relative`, className)} {...restProps}>
                <DsnGrid col={2} colTablet={1} colGap={50} rowGap={40}>
                    <div className="box-info pt-40 pb-60">

                        <FadeUpTrigger>
                            {(ref) => <>
                                <h6 className="title-block border-bottom pb-30 mb-30" ref={ref}>{t('hero.subtitle')}</h6>
                                <p className="mb-30" ref={ref} style={{ maxWidth: 570 }} dangerouslySetInnerHTML={{ __html: t('hero.description') }} />
                                {/* <h5 className="sm-title-block line-shape line-shape-after mb-10" ref={ref}>{HeroContent.authorTitle}</h5> */}
                                {/* <span className="sub-heading line-bg-left" ref={ref}>{HeroContent.authorJob}</span> */}
                                <DsnGrid className="box-awards pt-30" col={2} colTablet={2} colGap={15} rowGap={15}>
                                    {awards.map((item, index) => (
                                        <div className="box-awards_item has-border" key={index} ref={ref}>
                                            <div className="box-awards_inner background-section">
                                                <span className="has-animate-number title">{item.number}</span>
                                                <h5 className="sm-title-block" dangerouslySetInnerHTML={{ __html: item.description }} />
                                            </div>
                                        </div>
                                    ))}


                                </DsnGrid>
                            </>}
                        </FadeUpTrigger>


                    </div>

                    <div className="background-mask p-relative over-hidden">
                        <div className="p-absolute p-20 h-100 w-100">
                            <div className="line line-top" />
                            <div className="line line-bottom" />
                            <div className="line line-left" />
                            <div className="line line-right" />

                            <div className="img-box h-100">
                                <ParallaxImage src={HeroContent.heroImage} alt={"about"} height="100%" overlay={4}
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw" />
                            </div>


                            <div
                                className="box-awards-item p-absolute big-number v-dark-head left-0 bottom-0 ml-40 mb-40 z-index-1 border-style">
                                <h5 className="number p-20">
                                    <span className="has-animate-number title"
                                        style={{ fontSize: "110px", lineHeight: "120px" }}>
                                        {t('hero.experienceNumber')}
                                    </span>
                                    {t('hero.experienceDescription') && <span className="sm-title-block d-block" dangerouslySetInnerHTML={{ __html: t('hero.experienceDescription') }} />}

                                </h5>
                            </div>
                        </div>
                    </div>
                </DsnGrid>
            </section>

            {/*========== team Section ========== */}
            <section className="container section-margin " data-dsn-title="Team">
                {/* <TitleSection description={"Our Team"}>
                    The Best Team Ever!
                </TitleSection> */}

                <Team data={getTeamData().slice(0, 2)} col={2} colTablet={2} />
            </section>
            {/*========== End team Section ========== */}

            {/*========== Next Page ==========*/}
            <NextPage className="section-padding border-top background-section" />
            {/*========== End Next Page ==========*/}

            {/*========== Footer ==========*/}
            <Footer className="background-section" />
            {/*========== End Footer ==========*/}
            {/* End Image kısmı */}

            {/*========== Header Normal ========== */}
            {/* <HeaderNormal className="">
                <p className="subtitle p-relative line-shape line-shape-after mb-30">
                    <span className="pl-10 pr-10 background-section">DESIGN STUDIO</span>
                </p>
                <h1 className="title text-uppercase">
                    WE DIGITAL CREATIVE <br /> Agency
                </h1>
            </HeaderNormal> */}
            {/*========== End Header Normal ==========*/}



            {/*<!-- ========== About Section ========== */}
            {/* <div className="container section-margin" data-dsn-title="About">

                <TitleSection className="mb-15" description={"What We Do"} defaultSpace={false} />
                <DsnGrid col={2} colTablet={1}>
                    <div className="box-left">
                        <h4> Keep Your Business Safe & Ensure High Availability </h4>
                    </div>
                    <div className="box-right">
                        <p className="max-w570 dsn-up mb-15 ">
                            A business consulting agency is involved in the planning,
                            implementation, and education of businesses. We work directly with
                            business owners on developing a business plan, identifying
                            marketing needs and developing the necessary skills for business
                            ownership.
                        </p>

                        <p className="max-w570 dsn-up">
                            but deploy to production. C-suite. First-order optimal strategies
                            build on a culture of contribution and inclusion so those options
                        </p>
                    </div>
                </DsnGrid>
                <List className="pt-50 mt-50 border-top pt-md-30 mt-md-30" col={3} iconSize={"21px"}>
                    <List.item icon={<FontAwesomeIcon icon={faCheck} className="theme-color" />}
                        className="align-items-center"> Advanced Grid </List.item>
                    <List.item icon={<FontAwesomeIcon icon={faCheck} className="theme-color" />}
                        className="align-items-center"> Top Performance</List.item>
                    <List.item icon={<FontAwesomeIcon icon={faCheck} className="theme-color" />}
                        className="align-items-center"> Responsive Design</List.item>
                </List>
            </div> */}
            {/*<!-- ========== End About Section ========== */}

            {/*Start Gallery List*/}
            {/* <BoxGallery className="section-margin container" col={2}>
                <BoxGalleryItem src="/img/help-project.jpg" groupPopup="gallery" />
                <BoxGalleryItem src="/img/plan-project.jpg" groupPopup="gallery" />
            </BoxGallery> */}
            {/*End Gallery List*/}

            {/*Start awards Section*/}
            {/* <section className="section-padding background-section" data-dsn-title="Services">
                <div className="container">
                    <TitleSection description="Our Services">
                        We are delivering beautiful <br /> digital products for you.
                    </TitleSection>
                    <Service.grid className="icon-left" styleBox="list" data={getServiceData().slice(0, 3)} />
                </div>
            </section> */}
            {/*End awards Section*/}


            {/* <section className="awards-section section-margin" data-dsn-title="Awards">
                <div className="container">
                    <DsnGrid col={2} colTablet={1}>
                        <div className="box-left">
                            <TitleSection description={" Awards & Honors"} defaultSpace={false}>
                                The awards won by our project.
                            </TitleSection>
                            <Awards />
                        </div>

                        <div className="box-right">
                            <div className="container-img p-relative">
                                <Image className="cover-bg-img" alt={""} src={"/img/agency-1.jpg"} width={1280}
                                    height={840}
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 75vw,100vw"
                                />
                            </div>
                        </div>
                    </DsnGrid>
                </div>
            </section> */}



            {/*Start testimonial Section*/}
            {/* <div className="container section-margin" data-dsn-title="testimonials">
                <TitleSection description={" Feedback"}>What Clients Say</TitleSection>

                <Testimonial
                    className=" text-center"
                    styleBox={"corner"}
                    skin={["testimonials-personal", "box-line"]}
                    centeredSlides
                    desktop={{ slidesPerView: 3 }}
                    tablet={{ slidesPerView: 1 }}
                    mobile={{ slidesPerView: 1 }}
                    speed={1000}
                    grabCursor
                    loop
                    loopedSlides={2}
                    parallax
                    parallaxImage={{ "data-swiper-parallax-scale": 0.7 }}
                    parallaxContent={{
                        "data-swiper-parallax-opacity": 0,
                        "data-swiper-parallax": "30%",
                    }}
                >
                    <SwiperPagination
                        className={`justify-content-between dsn-container mt-30`}
                    />
                </Testimonial>
            </div> */}
            {/*End testimonial Section*/}

            {/*========== Start brand-client Section ==========*/}
            {/* <section className="container section-margin" data-dsn-title="Client">
                <TitleSection description={"Our clients"}>
                    Your successful, our <br />
                    reputation
                </TitleSection>

                <BrandClient col={4} colTablet={2} colGap={0} rowGap={0} />
            </section> */}
            {/*========== End brand-client Section ==========*/}

            {/*========== Start Next Page Section ==========*/}
            {/* <NextPage className={`background-section section-padding`} /> */}
            {/*========== End Next Page Section ==========*/}



        </Layout>
    );
}

export default About;
