import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import style from "../../styles/LanguageSwitcher.module.scss";

const LanguageSwitcher = () => {
    const router = useRouter();
    const { i18n } = useTranslation(); // useTranslation hook'u ile dil kontrolü

    const changeLanguage = (lng) => {
        router.push(router.pathname, router.asPath, { locale: lng });
        i18n.changeLanguage(lng); // i18n üzerinden dil değişimi
    };

    return (
        <div className={style.languageSwitcher}>
            <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>
                EN
            </button>
            <button onClick={() => changeLanguage('tr')} disabled={i18n.language === 'tr'}>
                TR
            </button>
        </div>
    );
};

export default LanguageSwitcher;
