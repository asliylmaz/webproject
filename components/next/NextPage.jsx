import { dsnCN } from "../../hooks/helper";
import Button from "../button/Button";
import BgDot from "../header/BgDot";
import { useTranslation } from 'react-i18next';

function NextPage({ className, ...restProps }) {
    const { t } = useTranslation();
    

    return (
        <section className={dsnCN("next-page p-relative d-flex align-items-center", className)}
                 {...restProps}
        >
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
