import React from "react";
import { useTranslation } from 'react-i18next'; // Import the translation hook
import Navbar, { Nav } from "../../nav/Navbar";
import MenuContent from "./MenuContent";
import Logo from "../../logo/Logo";
import PageLogo from "../pageLogo/pageLogo";



const EremiaMenu = ({ hamburger }) => {
    const { t } = useTranslation(); // Use the translation hook
    const menuContent = [
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
                  <Logo width="500px" height="auto" href="/" />  
            </Navbar.Brand>

            <Navbar.Collapse cover="Menu">
                <Nav>
                    {menuContent.map(item => getSubMenu(item))}
                </Nav>
                <MenuContent className="section-margin"/>
            </Navbar.Collapse>
        </Navbar>
    );

}

EremiaMenu.defaultProps = {
    hamburger: false
}


export default EremiaMenu;