import React from 'react';
import { dsnCN } from "../../hooks/helper";
import { useTranslation } from 'react-i18next';

function InfoBoxTwo({ className }) {
    const { t, i18n } = useTranslation();

    return (

        <div className={dsnCN('box-info-contact', className)}>
            <ul>
                <li>
                    <h5 className="title-block">{t('ourproducers')}</h5>
                    <br></br>
                    <p className="text-p ">Zeynep Kesken​</p>
                    <p className="links over-hidden text-p">
                        <a className="link-hover" href="mailto:zeynep@3bölü2.com"
                            data-hover-text="zeynep@3bölü2.com">zeynep@3bölü2.com</a>
                    </p>
                    <br></br>
                    <p className="text-p ">Süleyman Derebaşı​</p>
                    <p className="links over-hidden text-p">
                        <a className="link-hover" href="mailto:süleyman@3bölü2.com"
                            data-hover-text="süleyman@3bölü2.com">süleyman@3bölü2.com</a>
                    </p>
                </li>

            </ul>
        </div>

    );
}

export default InfoBoxTwo;