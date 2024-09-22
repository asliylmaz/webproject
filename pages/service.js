import Layout from "../layout/Layout";
import HeaderNormal from "../components/header/HeaderNormal";
import DsnGrid from "../layout/DsnGrid";
import TitleSection from "../components/heading/TitleSection";
import BgDot from "../components/header/BgDot";
import Facts from "../components/facts/Facts";
import TitleCover from "../components/heading/TitleCover";
import List from "../components/list/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { ServiceGrid } from "../components/services/Service";
import { IdeaIcon } from "../components/svg";
import ButtonProject from "../components/button/ButtonProject";
import { getServiceData } from "../data/service";
import { getServiceData2 } from "../data/service";
import { getServiceData3 } from "../data/service";
import Team from "../components/Team/Team";
import React, { useEffect, useRef } from 'react';
import { getTeamData } from "../data/team";
import Image from "next/image";
import NextPage from "../components/next/NextPage";
import Footer from "../components/footer/Footer";
import ModalContact from "../components/model-right/ModalContact";
import Head from "next/head";
import ParallaxImage from "../components/Image/ParallaxImage";
import ImageSection from "../components/Image/ImageSection";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
//import Error404 from "./error404";
gsap.registerPlugin(ScrollTrigger);
function Service() {
    const services = getServiceData();
    const services2 = getServiceData2();
    const services3 = getServiceData3();
    const servicedata = {
        titleCover: `3BÖLÜ2`,
    };
    const whatWeDoRef1 = useRef(null); // "What We Do" bölümü için ref
    TitleSection.defaultProps = {
        classDesInner: "line-bg-left",
    };
    const whatWeDoRef2 = useRef(null); // "What We Do" bölümü için ref
    TitleSection.defaultProps = {
        classDesInner: "line-bg-left",
    };
    const whatWeDoRef3 = useRef(null); // "What We Do" bölümü için ref
    TitleSection.defaultProps = {
        classDesInner: "line-bg-left",
    };
    // const isEnabled = false; // Sayfa görünürlüğünü kontrol eden değişken

    // if (!isEnabled) {
    //     return <Error404 />;
    //   }
    useEffect(() => {
        const items1 = whatWeDoRef1.current.querySelectorAll('.service-item');
    const items2 = whatWeDoRef2.current.querySelectorAll('.service-item');
    const items3 = whatWeDoRef3.current.querySelectorAll('.service-item');

    // Animasyonları ayarlayın
    items1.forEach((item, index) => {
        gsap.fromTo(
            item,
            { opacity: 0, x: -200 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });

    items2.forEach((item, index) => {
        gsap.fromTo(
            item,
            { opacity: 0, x: -200 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });

    items3.forEach((item, index) => {
        gsap.fromTo(
            item,
            { opacity: 0, x: -200 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });
}, []);
    return (
        <Layout modelRight={{ children: <ModalContact />, propsModal: { textBtn: "Contact" } }}>
            <Head>
                <title>Service  | 3Bölü2</title>
            </Head>
            {/*========== Header Normal ========== */}
            <HeaderNormal backgroundColor="background-section" className="text-center">
                <p className="subtitle p-relative line-shape">
                    <span className="pl-10 pr-10 background-main">OUR SERVICES</span>
                </p>
                {/* <h1 className="title">
                    We are delivering beautiful <br/> digital products for you.
                </h1> */}
            </HeaderNormal>
            {/*========== End Header Normal ==========*/}

            {/*Start Parallax Img*/}
            {/* <ParallaxImage 
                parallaxFrom={{ scale: 1.3 }} parallax={{ scale: 1 }}
                overlay={5} /> */}
            {/*End Parallax Img*/}

            <div className="image-container-s">
                <div className="services-container-s">
                    <video
                        className="background-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/img/banners1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>


            {/*========== About Section  ==========*/}
            <DsnGrid className="container section-margin" customGrid={{ desktop: '70% 30%' }} rowGapTablet={50} data-dsn-title="What We Do" ref={whatWeDoRef1}>
                <div>
                    <TitleCover>{servicedata.titleCover}</TitleCover>
                    <TitleSection defaultSpace={false} description="What We Do" />
                    {services.map((service, index) => (
                        <div key={index} className="service-item">
                            <br></br>
                            <br></br>
                            <h1 className="services neon-text">{service.title}</h1>
                            <p className="services sub-neon-text">{service.description}</p>
                        </div>
                    ))}
                    <br></br>
                    <br></br>
                </div>
            </DsnGrid>

            {/*========== End About Section  ==========*/}

            <div className="image-container-s">
                <div className="services-container-s">
                    <video
                        className="background-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/img/banners2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            {/*========== About Section 2 ==========*/}
            <DsnGrid className="container section-margin" customGrid={{ desktop: "70% 30%" }} rowGapTablet={50} data-dsn-title="Where We Do"  ref={whatWeDoRef2}>
                <div className="services-container">
                    <TitleCover>{servicedata.titleCover}</TitleCover>
                    <TitleSection defaultSpace={false} description="Where We Do" />
                    <br></br>
                    <br></br>
                    {services2.map((service, index) => (
                        <div key={index} className="service-item">
                            <h1 className="services neon-text">{service.title}</h1>
                            <p className="services sub-neon-text">{service.description}</p>
                            <br></br>
                            <br></br>
                        </div>
                    ))}
                </div>
            </DsnGrid>
            <DsnGrid className="container section-margin" customGrid={{ desktop: "70% 30%" }} rowGapTablet={50} data-dsn-title="How We Do"  ref={whatWeDoRef3}>
                <div className="services-container">
                    <TitleCover>{servicedata.titleCover}</TitleCover>
                    <TitleSection defaultSpace={false} description="How We Do" />
                    <br></br>
                    <br></br>
                    {services3.map((service, index) => (
                        <div key={index} className="service-item">
                            <h1 className="services neon-text">{service.title}</h1>
                            <p className="services sub-neon-text">{service.description}</p>
                            <br></br>
                            <br></br>
                        </div>
                    ))}
                </div>
            </DsnGrid>
            {/*========== End About Section 2 ==========*/}

            {/*<!-- ========== facts-section ==========*/}
            {/* <div className="section-margin p-relative" >
                <BgDot />
                <BgDot rightPosition />
                <div className="container">
                    <Facts className="text-center" col={4} colTablet={2} />
                </div>
            </div> */}
            {/*<!-- ========== end facts-section ========== */}


            {/*<!-- ========== About section ========== */}
            {/* <div className="p-relative background-section section-padding" data-dsn-title="products better">
                <DsnGrid className="container" col={2} colTablet={1}>
                    <div className="p-relative box-left">
                        <div className="box-im h-100 ">
                            <Image className="cover-bg-img " src="/img/rachel-claire.jpg" alt="" fill sizes="(max-width: 768px) 100vw,(max-width: 1200px) 75vw,100vw" />
                        </div>
                    </div>

                    <div className="p-relative box-right">
                        <TitleCover>Diesel</TitleCover>
                        <TitleSection className="mb-30" description="We make digital" defaultSpace={false}>
                            Make better products make products better
                        </TitleSection>
                        <List className="border-top  pt-30 mb-30" col={2} iconSize={"15px"}>
                            <List.item icon={<FontAwesomeIcon icon={faCheckCircle} className="theme-color" />}
                                headingTag="span"> Proin gravida nibh vel </List.item>
                            <List.item icon={<FontAwesomeIcon icon={faCheckCircle} className="theme-color" />}
                                headingTag="span"> Proin gravida nibh vel </List.item>
                            <List.item icon={<FontAwesomeIcon icon={faCheckCircle} className="theme-color" />}
                                headingTag="span"> Auctor aliquet aenean quis </List.item>
                            <List.item icon={<FontAwesomeIcon icon={faCheckCircle} className="theme-color" />}
                                headingTag="span"> Auctor aliquet aenean quis </List.item>
                        </List>
                        <ServiceGrid className="icon-left p-0 border-top  pt-30 align-items-center"

                            iconOption={{ className: "background-main p-15 align-self-center" }}
                            data={[{
                                icon: IdeaIcon,
                                title: "Best Practices from Industry Experts ",
                                description: "We’ve designed a culture that allows our stewards to assimilate with our clients and bring."
                            }]} />

                    </div>
                </DsnGrid>
            </div> */}
            {/*<!-- ========== End About section ========== */}


            {/*<!-- ========== About section ========== */}
            {/* <div className="p-relative section-margin" data-dsn-title="BUSINESS CONSULTING">
                <DsnGrid className="container" col={2} colTablet={1}>
                    <div className="p-relative box-left order-md-2">
                        <TitleCover>Diesel</TitleCover>
                        <TitleSection className="mb-30" description="Some Feature" defaultSpace={false}>
                            BUSINESS CONSULTING
                        </TitleSection>
                        <p className="max-w570 dsn-up mb-10 border-top pt-30">
                            Founded in 2000, Dsn Grid has become one of the best Digital Agency in
                            ThemeForest Blue money going forward.
                        </p>
                        <p className="max-w570 dsn-up border-bottom pb-30">
                            but deploy to production. C-suite. First-order optimal
                            strategies build on a culture of contribution and inclusion so those
                            options
                        </p>
                        <ButtonProject href="#0" className="mt-30"> Visit Website </ButtonProject>

                    </div>
                    <div className="p-relative box-right order-md-1">
                        <div className="box-im h-100 ">
                            <Image className="cover-bg-img " src="/img/help-project.jpg" alt="" fill sizes="(max-width: 768px) 100vw,(max-width: 1200px) 75vw" />
                        </div>
                    </div>


                </DsnGrid>
            </div> */}
            {/*<!-- ========== End About section ========== */}


            {/*<!-- ========== About section ========== */}
            {/* <div className="p-relative background-section section-padding" data-dsn-title="Project Manager">

                <div className="container">
                    <TitleSection className="text-center" description="Most have theme" defaultSpace={false}>
                        BUSINESS CONSULTING
                    </TitleSection>
                    <TitleSection className="text-center mt-15" tag="p" dirDescription="after" classDesInner="max-w570"
                        description="Get Essentials today and start building next-generation websites,
                              create awesome pages with unlimited possibilities."/>


                    <DsnGrid className="background-main" col={2} colTablet={1} rowGapTablet={0} rowGapMobile={0}>
                        <div className="p-relative box-padding box-left order-md-2">
                            <TitleCover>Diesel</TitleCover>
                            <TitleSection className="mb-15" defaultSpace={false} description="Project Manager" />
                            <h4 className="mb-50">Get Dsn Grid today and start building
                                next-generation websites in minutes!</h4>
                            <ServiceGrid className="icon-left p-0" rowGapTablet={30} rowGapMobile={30}
                                data={[
                                    {
                                        icon: <Image src="/img/team/1.jpg" alt="" width={70} height={70} />,
                                        title: "Build powerful websites with Essentials",
                                        description: Start building next-level websites using Essentials WordPress theme. 
                                    }, {
                                        icon: <Image src="/img/team/2.jpg" alt="" width={70} height={70} />,
                                        title: "Build powerful websites with Essentials",
                                        description: Start building next-level websites using Essentials WordPress theme. 
                                    }, {
                                        icon: <Image src="/img/team/3.jpg" alt="" width={70} height={70} />,
                                        title: "Build powerful websites with Essentials",
                                        description: Start building next-level websites using Essentials WordPress theme. 
                                    }
                                ]}
                            />
                        </div>
                        <div className="p-relative box-right order-md-1">
                            <div className="box-im h-100 ">
                                <Image className="cover-bg-img " src="/img/corporate.jpg" alt="" fill sizes="(max-width: 768px) 100vw,(max-width: 1200px) 75vw" />
                            </div>
                        </div>
                    </DsnGrid>
                    <ServiceGrid className="mt-50 p-0 text-center" data={getServiceData().slice(0, 3)} col={3} colTablet={2}
                        colGap={50} />
                </div>


            </div> */}
            {/*<!-- ========== End About section ========== */}

            {/*========== team Section ========== */}
            {/* <section className="container section-margin " data-dsn-title="Best Team Ever">
                <TitleSection description={"Our Team"}>
                    The Best Team Ever!
                </TitleSection>

                <Team data={getTeamData().slice(0, 3)} className={"team-classic"} col={3} colTablet={2} />
            </section> */}
            {/*========== End team Section ========== */}

            {/*========== Next Page ==========*/}
            <NextPage className="section-padding border-top background-section" />
            {/*========== End Next Page ==========*/}

            {/*========== Footer ==========*/}
            <Footer className="background-section" />
            {/*========== End Footer ==========*/}

        </Layout>
    )
        ;
}


export default Service;
