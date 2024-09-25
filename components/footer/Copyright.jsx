import { dsnCN } from "../../hooks/helper";
import styles from '../../styles/gallery.module.scss';
import { useTranslation } from 'react-i18next';

function Copyright({ className, ...restProps }) {
    const { t, i18n } = useTranslation();
    return (
        <h5 className={dsnCN(className, styles['copyright-text'])} {...restProps}>
            ©{new Date().getFullYear()} 3BÖLÜ2
            <br />
            <a>{t('allrightreserved')}</a>
        </h5>
    );
}

export default Copyright;
