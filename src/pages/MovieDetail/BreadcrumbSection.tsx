import React from 'react';
import { BreadcrumbSection } from '../../components/Breadcrumb.tsx'; 
import { movieDetailBreadcrumbItems } from '../../constants/breadcrumbItems.tsx'; 
import { useTranslation } from 'react-i18next';

interface BreadcrumbSectionProps {
  movieTitle: string;
}

const MovieDetailBreadcrumb: React.FC<BreadcrumbSectionProps> = ({ movieTitle }) => {
  const { t } = useTranslation(); 

  // tao breadcrumb items and map
  const breadcrumbItems = movieDetailBreadcrumbItems(movieTitle).map((item) => ({
    ...item,
    title: item.titleKey ? t(item.titleKey) : item.title, 
  }));

  return <BreadcrumbSection items={breadcrumbItems} separator=">" />;
};

export default MovieDetailBreadcrumb;
