import React from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  tag?: string;
  bgClass: string;
  textClass: string;
  badgeClass?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  tag, 
  bgClass, 
  textClass, 
  badgeClass 
}) => {
  return (
    <div 
      className={`group relative p-8 md:p-10 rounded-[30px] shadow-[rgba(14,15,12,0.12)_0px_0px_0px_1px] hover:shadow-[rgba(14,15,12,0.18)_0px_0px_0px_2px] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer ${bgClass}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`text-4xl md:text-5xl ${textClass}`}>
          {icon}
        </div>
        
        {tag && (
          <span className={`px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider rounded-full shadow-sm ${badgeClass}`}>
            {tag}
          </span>
        )}
      </div>

      <h3 className={`font-body text-2xl font-bold mb-3 ${textClass}`}>
        {title}
      </h3>
      
      <p className={`text-[16px] leading-relaxed opacity-90 ${textClass}`}>
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
