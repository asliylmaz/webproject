import React from "react";
import { useTranslation } from 'react-i18next'; // Import the translation hook
import Navbar, { Nav } from "../../nav/Navbar";
import MenuContent from "./MenuContent";
import Logo from "../../logo/Logo";
import PageLogo from "../pageLogo/pageLogo";
import style from "../../../styles/LanguageSwitcher.module.scss";
import { useRouter } from 'next/router';



const EremiaMenu = ({ hamburger }) => {
    const router = useRouter();
    const { t,i18n } = useTranslation(); // useTranslation hook'u ile dil kontrolü

    const changeLanguage = (lng) => {
        router.push(router.pathname, router.asPath, { locale: lng });
        i18n.changeLanguage(lng); // i18n üzerinden dil değişimi
    };    const menuContent = [
        { name: t('menuContent.home'), href: "/" },
        { name: t('menuContent.service'), href: "/service" },
        { name: t('menuContent.works'), href: "/works" },
        { name: t('menuContent.directors'), href: "/directors" },
        { name: t('menuContent.about'), href: "/about" },
        { name: t('menuContent.contact'), href: "/contact" },
    ];
    let $key = 0;
    const getSubMenu = (items) => {
        $key++;
        if (items.dropdownMenu) {
            return (<Nav.Dropdown name={t(items.name)}
                                  key={$key}>{items.dropdownMenu.map(item => getSubMenu(item))}</Nav.Dropdown>);
        }
        return (
            <Nav.Link href={items.href} key={$key}>{t(items.name)}</Nav.Link>
        );
    }
    //yukarda ; vardı(ilk halinde yoktu kaldırdım)


    return (
        <Navbar hamburger={hamburger}>
            <Navbar.Brand href={"/"} >
                  <Logo width="100px" height="auto" href="/" />  
            </Navbar.Brand>

            <Navbar.Collapse cover="Menu">
                <Nav>
                    {menuContent.map(item => getSubMenu(item))}
                </Nav>
                <MenuContent className="section-margin"/>
                {/* Butonlar en alta ekleniyor */}
                <div className={style.languageSwitcher}>
            <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>
                EN
            </button>
            <button onClick={() => changeLanguage('tr')} disabled={i18n.language === 'tr'}>
                TR
            </button>
        </div>
            </Navbar.Collapse>
        </Navbar>
    );

}

EremiaMenu.defaultProps = {
    hamburger: false
}


export default EremiaMenu;