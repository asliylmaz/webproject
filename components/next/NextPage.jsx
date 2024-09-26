import {dsnCN} from "../../hooks/helper";
import Button from "../button/Button";
import BgDot from "../header/BgDot";
import { useTranslation } from 'react-i18next';

// const NextContent = {
//     title: "Would you like more information \nor do you have a question?",
    
//     buttonText: "Contact Us"
// };

function NextPage({className, ...restProps}) {
    const { t, i18n } = useTranslation();
    return (
        <section className={dsnCN("next-page p-relative d-flex align-items-center", className)}
                 {...restProps}
        >
            {/* <BgDot/>
            <BgDot rightPosition/> */}
            <div className="container w-100">
                <div className="c-wrapper d-flex justify-content-between">
                    <div className="d-flex flex-column">
                       
                        <h2 className="section-title max-w750 mt-15">
                        {t('nextContent.title')}
                        </h2>
                    </div>

                    <div className="button-box d-flex justify-content-end align-items-center">
                        <Button
                            href={"/contact"}
                            className="mr-15 line-head"
                            borderStyle={"border-color-heading-color"}
                            borderRadius
                            transitionPage={t('nextContent.title')}
                        >
                            {t('nextContent.buttonText')}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NextPage;
