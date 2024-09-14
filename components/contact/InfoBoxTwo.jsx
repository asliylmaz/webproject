import React from 'react';
import {dsnCN} from "../../hooks/helper";

function InfoBoxTwo({className}) {
    return (

        <div className={dsnCN('box-info-contact', className)}>
            <ul>
                <li>
                <h5 className="title-block">Our Producers</h5>
                <br></br>
                <p className="text-p ">Lorem Ipsum</p>
                <p className="text-p ">info@pixelpostpro.com</p>
                <br></br>
                <p className="text-p ">Lorem Ipsum</p>
                <p className="text-p ">info@pixelpostpro.com</p>
                <br></br>
                <p className="text-p ">Lorem Ipsum</p>
                <p className="text-p ">info@pixelpostpro.com</p>
                <br></br>
                <p className="text-p ">Lorem Ipsum</p>
                <p className="text-p ">info@pixelpostpro.com</p>
                <br></br>
                <p className="text-p ">Lorem Ipsum</p>
                <p className="text-p ">info@pixelpostpro.com</p>
                <br></br>
                <p className="text-p ">Lorem Ipsum</p>
                <p className="text-p ">info@pixelpostpro.com</p>
                </li>
               
            </ul>
        </div>

    );
}

export default InfoBoxTwo;