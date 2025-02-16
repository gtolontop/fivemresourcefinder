import React from 'react';

interface PartnerLogoProps {
  logoUrl: string;
  altText?: string;
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({ logoUrl, altText = 'Partner Logo' }) => {
  return (
    <div className="partner-logo">
      <img src={logoUrl} alt={altText} />
    </div>
  );
};

export default PartnerLogo;
