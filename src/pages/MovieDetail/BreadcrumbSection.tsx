import React from 'react';
import { BreadcrumbSection } from '../../components/Breadcrumb.tsx'; // Ensure .tsx extension is correct
import { movieDetailBreadcrumbItems } from '../../constants/breadcrumbItems.tsx'; // Ensure .tsx extension is correct
import { useTranslation } from 'react-i18next';

interface BreadcrumbSectionProps {
  movieTitle: string;
}

const MovieDetailBreadcrumb: React.FC<BreadcrumbSectionProps> = ({ movieTitle }) => {
  const { t } = useTranslation(); // Get translation function

  // Generate breadcrumb items and map through to translate
  const breadcrumbItems = movieDetailBreadcrumbItems(movieTitle).map((item) => ({
    ...item,
    title: item.titleKey ? t(item.titleKey) : item.title, // Translate if key exists
  }));

  return <BreadcrumbSection items={breadcrumbItems} separator=">" />;
};

export default MovieDetailBreadcrumb;
