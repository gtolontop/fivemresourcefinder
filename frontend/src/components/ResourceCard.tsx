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

function cleanText(str: string): string {
  return str
    .replace(/(Description\s*:?|Note\s*:?)/gi, '')
    .replace(
      /([\u{1F300}-\u{1F5FF}]|[\u{1F600}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{2600}-\u{26FF}])/gu,
      ''
    )
    .replace(/\*|_/g, '');
}

function truncateText(text: string, maxLength: number): string {
  return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const imageUrl = resource.thumbnail?.url || resource.image?.url || '';
  const cleanedTitle = truncateText(cleanText(resource.title || ''), 50);
  const cleanedDescription = truncateText(cleanText(resource.description || ''), 70);

  return (
    <div className="resource-card">
      <div
        className={`resource-image ${!imageUrl ? 'placeholder' : ''}`}
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
      />
      <h3>{cleanedTitle}</h3>
      <p>{cleanedDescription}</p>
    </div>
  );
};

export default ResourceCard;
