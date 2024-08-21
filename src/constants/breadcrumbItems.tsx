import React from 'react';
import { Link } from 'react-router-dom';

// Define common breadcrumb items that are reused across different pages
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
    titleKey: 'breadcrumbs.movies', // Use a key for translation later
  },
];

// Exporting breadcrumb items for different pages
export const comingSoonBreadcrumbItems = [
  ...commonBreadcrumbItems,
  {
    key: 'coming_soon',
    titleKey: 'breadcrumbs.coming_soon', // Use a key for translation later
  },
];

export const nowShowingBreadcrumbItems = [
  ...commonBreadcrumbItems,
  {
    key: 'now_showing',
    titleKey: 'breadcrumbs.now_showing', // Use a key for translation later
  },
];

export const movieDetailBreadcrumbItems = (movieTitle: string) => [
  ...commonBreadcrumbItems,
  {
    key: 'movie_detail',
    titleKey: `movies.${movieTitle.split('.')[1]}.title`, // Dynamic key for translation later
  },
];
