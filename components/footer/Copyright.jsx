import { dsnCN } from "../../hooks/helper";
import styles from '../../styles/gallery.module.scss';

function Copyright({ className, ...restProps }) {
    return (
        <h5 className={dsnCN(className, styles['copyright-text'])} {...restProps}>
            ©{new Date().getFullYear()} 3BÖLÜ2
            <br />
            <a>ALL RIGHTS RESERVED</a>
        </h5>
    );
}

export default Copyright;
