import {dsnCN} from "../../hooks/helper";

function Copyright({className, ...restProps}) {
    return (
        <h5 className={dsnCN(className)} {...restProps}>
            ©{new Date().getFullYear()} 3 BOLU 2
            <br></br>
            <a className="link-hover" target="_blank"
               rel="nofollow"
               href="https://themeforest.net/user/design_grid/portfolio/">ALL RIGHTS RESERVED</a>
        </h5>
        
    );
}


export default Copyright;