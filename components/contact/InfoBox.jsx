import React from 'react';
import { dsnCN } from "../../hooks/helper";

function InfoBox({ className }) {
    return (

        <div className={dsnCN('box-info-contact', className)}>
            <ul>
                <li>
                    <h1 className="neon-text">Get in Touch </h1>
                </li>
                <li>
                    <h5 className="title-block mt-15">Contact</h5>
                    <p className="text-p ">+90 212 273 30 02​</p>
                    <p className="text-p ">info@3bölü2.com</p>
                    {/* <div className="over-hidden mt-5">
                        <a className="link-hover" data-hover-text="info@example.com"
                           href="#"> info@.com</a>
                    </div> */}

                </li>
                <li>
                    <h5 className="title-block mb-15">Address</h5>
                    <p className="text-p">Esentepe, Mithat Ulu Ünlü Sk No:16A<br /> 34394 Şişli/İstanbul</p>
                </li>
                <li>
                    <h5 className="title-block mb-15"> Follow Us</h5>
                    <div className="social-item over-hidden">
                        <a className="link-hover" data-hover-text="Instagram" href="#"
                            target="_blank" rel="nofollow">Instagram</a>
                    </div>
                    <div className="social-item over-hidden">
                        <a className="link-hover" data-hover-text="Facebook" href="#"
                            target="_blank" rel="nofollow">Facebook</a>
                    </div>
                    <div className="social-item over-hidden">
                        <a className="link-hover" data-hover-text="X" href="#"
                            target="_blank" rel="nofollow">X</a>
                    </div>
                </li>
            </ul>
        </div>

    );
}

export default InfoBox;