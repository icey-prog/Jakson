import React from 'react';
import { Check } from 'lucide-react';

interface ProfileCardProps {
  image: string;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  title,
  description,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative text-left w-full bg-white dark:bg-slate-800 rounded-card p-6 md:p-8 transition-all duration-250 cursor-pointer ${
        isSelected
          ? 'border-2 border-jackson-vivid shadow-glow bg-jackson-vivid/[0.04]'
          : 'border-2 border-transparent shadow-card hover:shadow-card-hover hover:-translate-y-1'
      }`}
    >
      {isSelected && (
        <span className="absolute top-3 right-3 w-6 h-6 bg-jackson-vivid rounded-full flex items-center justify-center">
          <Check size={14} className="text-white" />
        </span>
      )}
      <img
        src={image}
        alt={title}
        className="h-[100px] md:h-[120px] w-auto object-contain mx-auto mb-4"
        loading="lazy"
      />
      <h3 className="text-lg md:text-xl font-semibold text-jackson-night dark:text-white text-center mb-2">
        {title}
      </h3>
      <p className="text-sm text-jackson-slate dark:text-white/60 text-center leading-relaxed">
        {description}
      </p>
    </button>
  );
};

export default ProfileCard;
