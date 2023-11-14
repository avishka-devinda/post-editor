import { CheckSquare, ShieldAlert } from 'lucide-react';
import React from 'react';

// Define individual icon components
const PostIcon: React.FC<IconProps> = ({ className }) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  className={className}
>
  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
  <polyline points="14 2 14 8 20 8" />
  <line x1="16" x2="8" y1="13" y2="13" />
  <line x1="16" x2="8" y1="17" y2="17" />
  <line x1="10" x2="8" y1="9" y2="9" />
</svg>
);
const DraftIcon: React.FC<IconProps> = ({ className }) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  className={className}
>
  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
  <polyline points="14 2 14 8 20 8" />
  <line x1="9" x2="15" y1="15" y2="15" />
</svg>
);

const UnsavedIcon: React.FC<IconProps> = ({ className }) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  className={className}
>
  <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
  <path d="M14 2v6h6" />
  <path d="m3 12.5 5 5" />
  <path d="m8 12.5-5 5" />
</svg>
);



const PublishedIcon: React.FC<IconProps> = ({ className }) => (
  <CheckSquare
  className={className} />
);

const UnPublished: React.FC<IconProps> = ({ className }) => (
  <ShieldAlert 
  className={className} />
);




interface IconProps {
  className?: string;
}

const iconComponents: { [key: string]: React.FC<IconProps> } = {
  post: PostIcon,
  draft: DraftIcon,
  unsaved: UnsavedIcon,
  published:PublishedIcon,
  unpublished:UnPublished
};

export const DynamicIcons: React.FC<{ title: string } & IconProps> = ({ title, className }) => {
  const IconComponent = iconComponents[title];

  return IconComponent ? <IconComponent className={className} /> : null;
};

export default DynamicIcons;
