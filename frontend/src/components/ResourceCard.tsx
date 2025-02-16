import React from 'react';

interface Field {
  name: string;
  value: string;
  inline: boolean;
}

interface FooterData {
  text: string;
}

interface ImageData {
  url: string;
}

export interface Resource {
  title: string;
  description: string;
  url?: string;
  color?: number;
  fields?: Field[];
  footer?: FooterData;
  image?: ImageData;
  thumbnail?: ImageData;
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const imageUrl = resource.thumbnail?.url || resource.image?.url || '';
  return (
    <div className="resource-card">
      {imageUrl && <img src={imageUrl} alt={resource.title} className="resource-image" />}
      <h3>{resource.title}</h3>
      <p>{resource.description.substring(0, 100)}...</p>
    </div>
  );
};

export default ResourceCard;
