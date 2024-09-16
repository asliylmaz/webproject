import React from 'react';
import {dsnCN} from "../../hooks/helper";

function InfoBoxTwo({className}) {
    return (

        <div className={dsnCN('box-info-contact', className)}>
            <ul>
                <li>
                <h5 className="title-block">Our Producers</h5>
                <br></br>
                <p className="text-p ">Zeynep Kesken​</p>
                <p className="text-p ">zeynep@3bölü2.com​</p>
                <br></br>
                <p className="text-p ">Süleyman Derebaşı​</p>
                <p className="text-p ">suleyman@3bölü2.com​</p>
                </li>
               
            </ul>
        </div>

    );
}

export default InfoBoxTwo;