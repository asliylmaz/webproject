import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { dsnCN } from "../../hooks/helper";
import MetaPost from "../meta/MetaPost";
import { justifyContent } from "../../hooks/EremiaType";
import { useTranslation } from 'react-i18next';

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

// **Add the displayName to the BgImage component**
BgImage.displayName = 'BgImage';

interface HeaderFullProps {
    height?: string,
    className?: string,
    separate?: string,
    overlay?: number,
    parallax?: Object,
    parallaxContent?: Object,
    heroContent: { category?: [], title?: string, src?: string, video?: string, subtitle?: string },
    children?: any,
    justifyContent?: justifyContent,
    alignItems?: justifyContent,
    skin?: 'half-right' | 'half-left' | 'half-personal',
    fullWidth?: boolean
}

function HeaderFull({
    height,
    className,
    separate,
    overlay,
    parallax,
    heroContent,
    parallaxContent,
    justifyContent,
    alignItems = "center",
    skin,
    fullWidth,
    children
}: HeaderFullProps) {

    const header = useRef();
    const bg = useRef<HTMLDivElement>(null);
    const holder = useRef();
    const content = useRef();
    const animateText = useRef();
    const q = gsap.utils.selector(header);
    const { category, title, src, video, subtitle } = heroContent;

    useEffect(() => {
        gsap.fromTo(q('.post-info span'), { y: -15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1 });
        gsap.fromTo(q('.text-head , .dsn-description'), { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1 });

        const animate = gsap.timeline();
        (bg.current && parallax) && animate.to(bg.current.children, { ...parallax, ease: "none" }, 0);
        (content.current && parallaxContent) && animate.to(content.current, { ...parallaxContent, ease: "none" }, 0);
        (animateText.current) && animate.to(animateText.current, { clipPath: 'inset(-20% 0 -10px 0)', ease: "none" }, 0);
        animate.to(holder.current, { y: 70, autoAlpha: 0, ease: "none" }, 0);

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
    const { t, i18n } = useTranslation();

    return (
        <header
            className={dsnCN("header-page overflow", ((src || video) && !skin) && 'v-dark-head', skin, skin && "v-dark-head-mobile", fullWidth && "full-width")}
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
                src && <BgImage src={src} height={height} alt={title?.replace(/<[^>]+>/g, '') ?? ""} overlay={overlay} ref={bg} />
            )}

            {heroContent && (
                <div
                    className={dsnCN("hero-content d-flex", className, justifyContent && 'justify-content-' + justifyContent, alignItems && 'align-items-' + alignItems)}
                    ref={content}>
                    <div className="content p-relative">
                        {subtitle && <div className="subtitle mb-20" dangerouslySetInnerHTML={{ __html: subtitle }} />}
                        {category && <MetaPost category={category} separate={separate} />}
                        {title && (
                            <div className="text-head">
                                <h1 className="title" dangerouslySetInnerHTML={{ __html: t('headerContentTitle') }} />
                            </div>
                        )}
                        {children && <div className="dsn-description mt-30">{children}</div>}
                    </div>
                </div>
            )}
        </header>
    );
}

HeaderFull.defaultProps = {
    height: "100%",
    parallax: {
        yPercent: 30,
    },
    parallaxContent: {
        yPercent: 50,
        autoAlpha: 0
    }
}

export default HeaderFull;
