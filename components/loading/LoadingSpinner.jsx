// components/LoadingSpinner.js
import React from 'react';
import styles from '../../styles/LoadingSpinner.module.scss' //CSS modülünü ekleyin

const LoadingSpinner = () => {
    return (
        <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default LoadingSpinner;
