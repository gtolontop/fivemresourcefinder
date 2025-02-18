import React from "react";

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

function removeMarkdownSyntax(text: string): string {
  return text.replace(/\*/g, "").replace(/_/g, "");
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const imageUrl = resource.thumbnail?.url || resource.image?.url || "";

  const cleanedTitle = removeMarkdownSyntax(resource.title || "");
  const truncatedTitle = truncateText(cleanedTitle, 22);

  const cleanedDescription = removeMarkdownSyntax(resource.description || "");
  const truncatedDescription = truncateText(cleanedDescription, 100);

  return (
    <div className="resource-card">
      {imageUrl ? (
        <img src={imageUrl} alt={truncatedTitle} className="resource-image" />
      ) : (
        <div className="resource-image placeholder" />
      )}

      <h3>{truncatedTitle}</h3>
      <p>{truncatedDescription}</p>
    </div>
  );
};

export default ResourceCard;
