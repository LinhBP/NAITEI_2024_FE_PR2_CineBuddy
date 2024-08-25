import React from "react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  //Array
  const cgvVietnamItems = [
    t("footer.intro"),
    t("footer.online_services"),
    t("footer.gift_card"),
    t("footer.recruitment"),
    t("footer.ad_contact"),
    t("footer.partner"),
  ];

  const termsOfUseItems = [
    t("footer.general_terms"),
    t("footer.transaction_terms"),
    t("footer.payment_policy"),
    t("footer.privacy_policy"),
    t("footer.faq"),
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/cgvcinemavietnam",
      imgSrc: "/images/logo-facebookpng-32204.png",
      alt: "Facebook",
      height: "35px",
    },
    {
      href: "https://www.youtube.com/cgvvietnam",
      imgSrc: "/images/youtube-logo-png-2082.png",
      alt: "YouTube",
      height: "37px",
    },
    {
      href: "http://instagram.com/cgvcinemasvietnam",
      imgSrc: "/images/logo-instagram-2441.png",
      alt: "Instagram",
      height: "37px",
    },
    {
      href: "http://zalo.me/1884424922722396289",
      imgSrc: "/images/zalo_logo.png",
      alt: "Zalo",
      height: "37px",
    },
  ];

  const customerServiceItems = [
    t("footer.hotline"),
    t("footer.working_hours"),
    t("footer.support_email"),
  ];

  const companyInfo = [
    t("footer.business_registration"),
    t("footer.address"),
    t("footer.hotline"),
    t("footer.copyright"),
  ];

  const logos = [
    {
      src: "/images/CI_logo_press_20220328_cgv_W-removebg-preview.png",
      width: "160px",
      height: "150px",
    },
  ];

  return (
    <div className="mt-5 bg-[url('/public/images/bg-bottom-footer.jpg')] bg-bottom bg-repeat-x pb-[120px]">
      <div className="hidden sm:block">
        <div className="border-t-2 border-black"></div>
        <div className="container mx-auto px-[160px]">
          <div className="footer-top py-1">
            <ul className="flex justify-start flex-wrap gap-0.5">
              {[...Array(12)].map((_, index) => (
                <li key={index}>
                  <a
                    className={`block h-[28px] w-[${
                      index % 2 === 0 ? "40px" : "70px"
                    }] bg-brand-footer bg-no-repeat bg-cover bg-brand-${index + 1}`}
                  ></a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t-2 border-black"></div>
        <div className="container mx-auto px-[160px] py-5">
          <div className="flex justify-between">
            <div className="w-[22%]">
              <h3 className="font-bold text-custom-gray mb-2">
                {t("footer.cgv_vietnam")}
              </h3>
              <ul className="leading-6">
                {cgvVietnamItems.map((item, i) => (
                  <li key={i} className="cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[22%]">
              <h3 className="font-bold text-custom-gray mb-2">
                {t("footer.terms_of_use")}
              </h3>
              <ul className="leading-6">
                {termsOfUseItems.map((item, i) => (
                  <li key={i} className="cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[22%]">
              <h3 className="font-bold text-custom-gray mb-2">
                {t("footer.connect_with_us")}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={link.imgSrc}
                      alt={link.alt}
                      className={`h-[${link.height}]`}
                    />
                  </a>
                ))}
              </div>
              <a
                href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=30278"
                target="_blank"
                rel="noreferrer"
                className="block mt-3"
              >
                <img
                  src="/images/cong-thuong.png"
                  className="mx-auto"
                />
              </a>
            </div>
            <div className="w-[22%]">
              <h3 className="font-bold text-custom-gray mb-2">
                {t("footer.customer_service")}
              </h3>
              <ul className="leading-6">
                {customerServiceItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-black"></div>
        <div className="container mx-auto px-[160px] flex items-center gap-4 py-3">
          {logos.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              className={`w-[${logo.width}] h-[${logo.height}]`}
            />
          ))}
          <div className="text-custom-gray leading-6">
            <h3 className="font-bold">{t("footer.cgv_company_name")}</h3>
            <p className="text-sm">
              {companyInfo.map((info, i) => (
                <>
                  {info}
                  <br />
                </>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile footer */}
      <div className="sm:hidden text-custom-gray">
        <ul className="border-t border-custom-border">
          {[...cgvVietnamItems, ...termsOfUseItems].map((item, i) => (
            <li key={i} className="border-b border-custom-border py-2 text-sm">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-center gap-4">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noreferrer">
              <img src={link.imgSrc} alt={link.alt} className={`h-[${link.height}]`} />
            </a>
          ))}
        </div>
        <a
          className="block mt-3 text-center"
          href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=30278"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/images/cong-thuong.png"
            className="mx-auto"
          />
        </a>
        <div className="text-center bg-[#e7e2e2] mt-5 p-4">
          <h3 className="font-bold">{t("footer.customer_service")}</h3>
          <ul className="text-sm leading-6">
            {customerServiceItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="text-center mb-5 mt-4">
          <div className="flex justify-center">
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                className={`w-[${logo.width}] h-[${logo.height}]`}
              />
            ))}
          </div>
          <div className="leading-snug">
            <h3 className="font-bold">{t("footer.cgv_company_name")}</h3>
            <p className="text-sm leading-5">
              {companyInfo.map((info, i) => (
                <>
                  {info}
                  <br />
                </>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
