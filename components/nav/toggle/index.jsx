import React, { useEffect, useRef, useState } from "react";
import dsnSplitting from "../../../hooks/spltting";
import { dsnCN } from "../../../hooks/helper";
import SvgAnimate from "../../../animation/SvgAnimate";
import { useTranslation } from 'react-i18next';

function Toggle({
    textOpen,
    textMenu,
    textClose,
    targetNav,
    reserved,
    setReserved,
    removeOpenMenu,
    className,
    ...restProps
}) {
    const { t } = useTranslation();
    const splitMenu = useRef();
    const splitOpen = useRef();
    const splitClose = useRef();
    const navbarToggle = useRef();
    const svg = useRef();
    const backgroundMain = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const TransEnd = () => {
        if (!reserved) {
            targetNav.current.querySelector('.primary-nav')?.classList.add('open');
        }
    };

    const onCompleteAnimate = () => {
        targetNav.current?.classList.toggle('dsn-open');
        navbarToggle.current?.classList.toggle('open');
        document.body.classList.toggle('over-hidden');
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const toggleClick = (e) => {

        setReserved(!reserved)

        if (reserved)
            removeOpenMenu();



        if (!reserved) {
            SvgAnimate.up(svg.current, TransEnd)
                .to("#dsn-scrollbar", {y: -200, duration: 1, ease: 'power4.in',}, "top")
                .set(backgroundMain.current, {autoAlpha: 1}, "center");
            onCompleteAnimate(this);
        } else
            SvgAnimate.down(svg.current
                , () => onCompleteAnimate(this)
            )
                .to("#dsn-scrollbar", {y: 0, clearProps: "y", duration: 1, ease: 'power4',}, "-=1")
                .set(backgroundMain.current, {autoAlpha: 0}, "center");
    }


    useEffect(() => {
        if (splitMenu.current) {
            dsnSplitting.Char(splitMenu.current);
        }
        if (splitOpen.current) {
            dsnSplitting.Char(splitOpen.current);
        }
        if (splitClose.current) {
            dsnSplitting.Char(splitClose.current);
        }
    }, []);

    return (
        <>
            <div
                id="navbar_toggle"
                className={dsnCN('navbar-toggle', className)}
                {...restProps}
                onClick={toggleClick}
                ref={navbarToggle}
                aria-expanded={isOpen}
            >
                <div className="toggle-icon">
                    <div className="toggle-line" />
                    <div className="toggle-line" />
                    <div className="toggle-line" />
                </div>
                <div className="toggle-text">
                    <span className={`text-open ${!isOpen ? 'active' : ''}`}>{t('toggle.open')}</span>
                    <span className={`text-close ${isOpen ? 'active' : ''}`}>{t('toggle.close')}</span>
                </div>
            </div>
            <div className="bg-load background-main" ref={backgroundMain} />
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"
                className="bg-load dsn-svg-transition">
                <path vectorEffect="non-scaling-stroke" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" ref={svg} />
            </svg>
        </>
    );
}

export default React.memo(Toggle);
