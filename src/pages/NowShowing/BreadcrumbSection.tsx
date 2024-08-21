import React from 'react';
import { BreadcrumbSection } from '../../components/Breadcrumb.tsx'; // Ensure .tsx extension is correct
import { nowShowingBreadcrumbItems } from '../../constants/breadcrumbItems.tsx'; // Ensure .tsx extension is correct
import { useTranslation } from 'react-i18next';

const NowShowingBreadcrumb: React.FC = () => {
  const { t } = useTranslation(); // Get translation function

  // Map through the items and translate them
  const breadcrumbItems = nowShowingBreadcrumbItems.map((item) => ({
    ...item,
    title: item.titleKey ? t(item.titleKey) : item.title, // Translate if key exists
  }));

  return <BreadcrumbSection items={breadcrumbItems} separator=">" />;
};

export default NowShowingBreadcrumb;
