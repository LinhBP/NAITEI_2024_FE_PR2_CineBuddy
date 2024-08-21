// src/pages/Home/HomeMenu.tsx

import React from "react";

interface HomeMenuProps {
  menuItems: { className: string }[];
}

const HomeMenu: React.FC<HomeMenuProps> = ({ menuItems }) => {
  return (
    <div className="container py-4 border-b border-black hidden lg:block">
      <ul className="py-4 border-b border-black flex justify-center">
        {menuItems.map((menuItem, index) => (
          <li key={index}>
            <a
              className={`h-[90px] w-[139px] inline-block cursor-pointer border-r border-black bg-home-menu ${menuItem.className}`}
            ></a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeMenu;
