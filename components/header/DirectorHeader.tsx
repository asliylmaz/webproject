import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { dsnCN } from "../../hooks/helper";
import styles from '../../styles/directors.module.scss';

interface BgImageProps {
    src: string;
    height?: string;
    alt?: string;
    overlay?: number;
}

const BgImage = React.forwardRef<HTMLDivElement, BgImageProps>(({ src, height = "100%", alt = "", overlay = 0 }, ref) => {
    return (
        <div ref={ref} style={{ position: 'relative', height: height }}>
            <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {overlay > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: `rgba(0, 0, 0, ${overlay})`
                    }}
                />
            )}
        </div>
    );
});

BgImage.displayName = 'BgImage';

interface DirectorHeaderProps {
    height?: string,
    className?: string,
    overlay?: number,
    parallax?: Object,
    parallaxContent?: Object,
    heroContent: { src?: string, video?: string },
    director?: { name: string }
}

function DirectorHeader({
    height,
    className,
    overlay,
    parallax,
    heroContent,
    parallaxContent,
    director
}: DirectorHeaderProps) {

    const header = useRef();
    const bg = useRef<HTMLDivElement>(null);
    const q = gsap.utils.selector(header);
    const { src, video } = heroContent;

    useEffect(() => {
        const animate = gsap.timeline();
        (bg.current && parallax) && animate.to(bg.current.children, { ...parallax, ease: "none" }, 0);
        ScrollTrigger.create({
            animation: animate,
            trigger: header.current,
            start: "top top",
            scrub: true
        });

        return () => {
            if (animate.scrollTrigger)
                animate.scrollTrigger.kill();
            animate.kill();
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <header
            className={dsnCN("header-page overflow", ((src || video)) && 'v-dark-head' , video,video && "v-dark-head-mobile")}
            ref={header}>
                 {/* Inline CSS for Video Background */}
            <style jsx>{`
                .bg-video-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: -1;
                }

                .bg-video {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                }
            `}</style>

            {/* Video or Image */}
            {video ? (
                <div ref={bg} className="bg-video-wrapper">
                    <video autoPlay muted loop playsInline className="bg-video">
                        <source src={video} type="video/mp4" />
                        Tarayıcınız video etiketini desteklemiyor.
                    </video>
                </div>
            ) : (
                src && <BgImage src={src} height={height} alt="" overlay={overlay} ref={bg} />
            )}

            {/* Director Name (Centered on Video) */}
            {director && (
                <div className={styles['director-name-container']}>
                    <h1 data-text={director.name} className={styles['director-name']}>
                        <span>{director.name}</span>
                    </h1>
                </div>
            )}
        </header>
    );
}

DirectorHeader.defaultProps = {
    height: "100%",
    parallax: {
        yPercent: 30,
    },
    parallaxContent: {
        yPercent: 50,
        autoAlpha: 0
    }
}

export default DirectorHeader;