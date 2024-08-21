import React from 'react';
import { Link } from 'react-router-dom';

export const commonBreadcrumbItems = [
  {
    key: 'home',
    title: (
      <Link to="/">
        <img
          src="/images/bg-cgv-bread-home.png"
          alt="Home"
        />
      </Link>
    ),
  },
  {
    key: 'movies',
    titleKey: 'breadcrumbs.movies', 
  },
];

// Exporting 
export const comingSoonBreadcrumbItems = [
  ...commonBreadcrumbItems,
  {
    key: 'coming_soon',
    titleKey: 'breadcrumbs.coming_soon', 
  },
];

export const nowShowingBreadcrumbItems = [
  ...commonBreadcrumbItems,
  {
    key: 'now_showing',
    titleKey: 'breadcrumbs.now_showing', 
  },
];

export const movieDetailBreadcrumbItems = (movieTitle: string) => [
  ...commonBreadcrumbItems,
  {
    key: 'movie_detail',
    titleKey: `movies.${movieTitle.split('.')[1]}.title`, // Dynamic key
  },
];
