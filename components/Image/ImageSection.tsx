import React from 'react';

interface ImageSectionProps {
    imageUrl: string;
    altText: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({ imageUrl, altText }) => {
    return (
        <div className="image-container-s">
            <div
                className="services-container-s-2"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
                role="img" // Resmi temsil etmesi için
                aria-label={altText} // Erişilebilirlik için alt metni ekler
            />
        </div>
    );
};

export default ImageSection;
