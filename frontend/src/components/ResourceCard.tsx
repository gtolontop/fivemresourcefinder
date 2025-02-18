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

function removeDescriptionPrefix(str: string): string {
  return str.replace(/Description:\s*/gi, ''); // Retire "Description:"
}

function removeDescriptionPrefix2(str: string): string {
  return str.replace(/Description :\s*/gi, ''); // Retire "Description :"
  return str.replace(/Note:\s*/gi, '');
  return str.replace(/Note :\s*/gi, '');
}

function removeDescriptionPrefix3(str: string): string {
  return str.replace(/Note:\s*/gi, ''); // Retire "Note:"
  return str.replace(/Note :\s*/gi, '');
}

function removeDescriptionPrefix4(str: string): string {
  return str.replace(/Note :\s*/gi, ''); // Retire "Note :"
}


// Retire les emojis
function removeEmojis(str: string): string {
  return str.replace(
    /([\u{1F300}-\u{1F5FF}]|[\u{1F600}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{2600}-\u{26FF}])/gu,
    ''
  );
}

// Retire les syntaxes markdown telles que ** et __
function removeMarkdownSyntax(text: string): string {
  return text.replace(/\*/g, '').replace(/_/g, '');
}

// Tronque le texte à maxLength caractères, en ajoutant "..." si nécessaire
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Fonction complète de nettoyage du texte
function cleanText(str: string): string {
  let cleaned = removeDescriptionPrefix(str);
  cleaned = removeDescriptionPrefix2(cleaned);
  cleaned = removeDescriptionPrefix3(cleaned);
  cleaned = removeDescriptionPrefix4(cleaned);
  cleaned = removeEmojis(cleaned);
  cleaned = removeMarkdownSyntax(cleaned);
  return cleaned;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const imageUrl = resource.thumbnail?.url || resource.image?.url || '';

  const rawTitle = resource.title || '';
  const cleanedTitle = truncateText(cleanText(rawTitle), 22);

  const rawDescription = resource.description || '';
  const cleanedDescription = truncateText(cleanText(rawDescription), 70);

  return (
    <div className="resource-card">
      {imageUrl ? (
        <img src={imageUrl} alt={cleanedTitle} className="resource-image" />
      ) : (
        <div className="resource-image placeholder" />
      )}
      <h3>{cleanedTitle}</h3>
      <p>{cleanedDescription}</p>
    </div>
  );
};

export default ResourceCard;
