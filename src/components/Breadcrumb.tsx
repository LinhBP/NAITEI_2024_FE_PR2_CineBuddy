import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  items: {
    title: React.ReactNode;
    path?: string;
  }[];
  separator?: React.ReactNode; 
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = ">" }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.path ? (
              <Link to={item.path}>
                {item.title}
              </Link>
            ) : (
              <span className="text-gray-500">{item.title}</span>
            )}
            {index < items.length - 1 && <span className="mx-2">{separator}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

interface BreadcrumbSectionProps {
  items: {
    title: React.ReactNode;
    path?: string;
  }[];
  separator?: React.ReactNode;
}

export const BreadcrumbSection: React.FC<BreadcrumbSectionProps> = ({ items, separator = ">" }) => {
  return (
    <div className="bg-[#f1f0e5] border-b-[#cacac0] border-2">
      <div className="container center py-2 pl-40">
        <Breadcrumb items={items} separator={separator} />
      </div>
    </div>
  );
};

export default Breadcrumb;
