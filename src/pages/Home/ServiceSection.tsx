// src/pages/Home/ServiceSection.tsx

import React from "react";
import { Service } from "../../types/types.ts";
import { TFunction } from "i18next";

interface ServiceSectionProps {
  serviceList: Service[];
  t: TFunction;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ serviceList, t }) => {
  return (
    <div className="flex justify-center border-y-2 border-black container gap-5 !my-7 py-7 text-center mx-auto">
      {serviceList.map((service) => (
        <div
          key={service.id}
          className="p-[3px] border-black border-2 cursor-pointer h-auto hover:opacity-80"
        >
          <img
            src={service.image}
            alt={t("home.service_image_alt", { title: service.title })}
          />
        </div>
      ))}
    </div>
  );
};

export default ServiceSection;
