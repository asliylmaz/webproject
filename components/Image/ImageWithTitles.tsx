import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ImageWithTitles: React.FC = () => {
  const { t, i18n } = useTranslation();
  const titles = t('titles', { returnObjects: true }); // Diziyi çeviriden al

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false); // Mevcut yazıyı gizle

      setTimeout(() => {
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length); // Bir sonraki yazıya geç
        setIsVisible(true); // Yeni yazıyı göster
      }, 450); // Mevcut yazının gizlenmesi için 500ms bekle
    }, 3000); // Her 3 saniyede bir geçiş yap

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1 className="about-title-a">{t('aboutus')}</h1>
      <h1 className={`about-title-i ${isVisible ? 'show' : ''}`}>
        {titles[currentTitleIndex]}
      </h1>
    </div>
  );
};

export default ImageWithTitles;
