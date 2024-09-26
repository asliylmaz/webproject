import React from 'react';
import { dsnCN } from "../../hooks/helper";
import { useTranslation } from 'react-i18next';

function InfoBox({ className }) {
    const { t, i18n } = useTranslation();

    return (

        <div className={dsnCN('box-info-contact', className)}>
            <ul>
                <li>
                    <h1 className="neon-textC">{t('getintouch')} </h1>
                </li>
                <li>
                    <h5 className="title-block mt-15 mb-10">{t('contact')}</h5>
                    <p className="links over-hidden mb-1 text-p">
                        <a className="link-hover" href="tel:+00 (2)012 3321" data-hover-text="+90 212 273 30 02​">
                        +90 212 273 30 02​
                        </a>
                    </p>
                    <p className="links over-hidden text-p">
                        <a className="link-hover" href="mailto:info@3bölü2.com"
                            data-hover-text="info@3bölü2.com">info@3bölü2.com</a>
                    </p>
                    {/* <div className="over-hidden mt-5">
                        <a className="link-hover" data-hover-text="info@example.com"
                           href="#"> info@.com</a>
                    </div> */}

                </li>
                <li>
                    <h5 className="title-block mb-15">{t('address')}</h5>
                    <p className="text-p">Esentepe, Mithat Ulu Ünlü Sk No:16A<br /> 34394 Şişli/İstanbul</p>
                </li>
                <li>
                    <h5 className="title-block mb-15">{t('followus')}</h5>
                    <div className="social-item over-hidden">
                        <a className="link-hover" data-hover-text="Instagram" href="https://www.instagram.com/3_bolu_2?igsh=dDJybDI0c2VoZnc2"
                            target="_blank" rel="nofollow">Instagram</a>
                    </div>
                    {/* <div className="social-item over-hidden">
                        <a className="link-hover" data-hover-text="Facebook" href="#"
                            target="_blank" rel="nofollow">Facebook</a>
                    </div>
                    <div className="social-item over-hidden">
                        <a className="link-hover" data-hover-text="X" href="#"
                            target="_blank" rel="nofollow">X</a>
                    </div> */}
                </li>
            </ul>
        </div>

    );
}

export default InfoBox;