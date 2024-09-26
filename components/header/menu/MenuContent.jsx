import React from 'react';
import {dsnCN} from "../../../hooks/helper";
import { useTranslation } from 'react-i18next';

function MenuContent({className}) {
    const socialData = [
        {link: "https://www.instagram.com/3_bolu_2?igsh=dDJybDI0c2VoZnc2", name: "Instagram"},
        // {link: "#0", name: "Behance."},
        // {link: "#0", name: "Linkedin."},
        // {link: "#0", name: "Twitter."}
    ];
    const { t, i18n } = useTranslation();

    return (
        <div className={dsnCN('container-content  d-flex flex-column justify-content-center', className)}>
            <div className="nav__info">
                <div className="nav-content">
                    <h5 className="sm-title-block mb-10">{t('studio')}</h5>
                    <p>
                    Esentepe, Mithat Ulu Ünlü Sk No:16A ​ <br/> 34394 Şişli/İstanbul
                    </p>

                </div>
                <div className="nav-content mt-30">
                    <h5 className="sm-title-block mb-10">{t('contact')}</h5>
                    <p className="links over-hidden mb-1">
                        <a className="link-hover" href="tel:+00 (2)012 3321" data-hover-text="+90 212 273 30 02​">
                        +90 212 273 30 02​
                        </a>
                    </p>
                    <p className="links over-hidden">
                        <a className="link-hover" href="mailto:info@3bölü2.com"
                           data-hover-text="info@3bölü2.com">info@3bölü2.com</a>
                    </p>
                </div>
            </div>
            <div className="nav-social nav-content mt-30">
                <div className="nav-social-inner p-relative">
                    <h5 className="sm-title-block mb-10">{t('followus')}</h5>
                    <ul>
                        {socialData.map((item, index) =>
                            <li key={index}>
                                <a href={item.link} target="_blank" rel="nofollow noopener noreferrer">{item.name}</a>
                            </li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MenuContent;