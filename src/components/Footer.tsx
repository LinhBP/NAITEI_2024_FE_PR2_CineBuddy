import React from "react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="mt-5 bg-[url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-bottom-footer.jpg')] bg-bottom bg-repeat-x pb-[120px]">
            <div className="hidden sm:block">
                <div className="border-t-2 border-black"></div>
                <div className="container mx-auto px-[160px]">
                    <div className="footer-top py-1">
                        <ul className="flex justify-start flex-wrap gap-0.5">
                            <li>
                                <a className="block h-[28px] w-[40px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-391px 5px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[70px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-160px 5px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[50px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-236px 5px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[100px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-292px 5px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[80px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-82px 5px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[81px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "2px 3px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[40px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-572px 3px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[110px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-435px 2px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[70px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-604px 2px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[110px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-675px 3px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[100px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-785px 3px" }}></a>
                            </li>
                            <li>
                                <a className="block h-[28px] w-[70px] bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png')", backgroundPosition: "-891px 2px" }}></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t-2 border-black"></div>
                <div className="container mx-auto px-[160px] py-5">
                    <div className="flex justify-between">
                        <div className="w-[22%]">
                            <h3 className="font-bold text-[#636363] mb-2">{t('footer.cgv_vietnam')}</h3>
                            <ul className="leading-6">
                                <li className="cursor-pointer">{t('footer.intro')}</li>
                                <li className="cursor-pointer">{t('footer.online_services')}</li>
                                <li className="cursor-pointer">{t('footer.gift_card')}</li>
                                <li className="cursor-pointer">{t('footer.recruitment')}</li>
                                <li className="cursor-pointer">{t('footer.ad_contact')}</li>
                                <li className="cursor-pointer">{t('footer.partner')}</li>
                            </ul>
                        </div>
                        <div className="w-[22%]">
                            <h3 className="font-bold text-[#636363] mb-2">{t('footer.terms_of_use')}</h3>
                            <ul className="leading-6">
                                <li className="cursor-pointer">{t('footer.general_terms')}</li>
                                <li className="cursor-pointer">{t('footer.transaction_terms')}</li>
                                <li className="cursor-pointer">{t('footer.payment_policy')}</li>
                                <li className="cursor-pointer">{t('footer.privacy_policy')}</li>
                                <li className="cursor-pointer">{t('footer.faq')}</li>
                            </ul>
                        </div>
                        <div className="w-[22%]">
                            <h3 className="font-bold text-[#636363] mb-2">{t('footer.connect_with_us')}</h3>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.facebook.com/cgvcinemavietnam"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src="/images/logo-facebookpng-32204.png"
                                        className="h-[35px]"
                                    />
                                </a>
                                <a
                                    href="https://www.youtube.com/cgvvietnam"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src="/images/youtube-logo-png-2082.png"
                                        className="h-[37px]"
                                    />
                                </a>
                                <a
                                    href="http://instagram.com/cgvcinemasvietnam"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src="/images/logo-instagram-2441.png"
                                        className="h-[37px]"
                                    />
                                </a>
                                <a
                                    href="http://zalo.me/1884424922722396289"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src="/images/zalo_logo.png"
                                        className="h-[37px]"
                                    />
                                </a>
                            </div>
                            <a
                                href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=30278"
                                target="_blank"
                                rel="noreferrer"
                                className="block mt-3"
                            >
                                <img
                                    src="https://www.cgv.vn/skin/frontend/cgv/default/images/cong-thuong.PNG"
                                    className="mx-auto"
                                />
                            </a>
                        </div>
                        <div className="w-[22%]">
                            <h3 className="font-bold text-[#636363] mb-2">{t('footer.customer_service')}</h3>
                            <ul className="leading-6">
                                <li>{t('footer.hotline')}</li>
                                <li>
                                    {t('footer.working_hours')}
                                </li>
                                <li>{t('footer.support_email')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 border-black"></div>
                <div className="container mx-auto px-[160px] flex items-center gap-4 py-3">
                    <img
                        src="/images/CI_logo_press_20220328_cgv_W-removebg-preview.png"
                        className="w-[160px] h-[150px]"
                    />
                    <div className="text-[#636363] leading-6">
                        <h3 className="font-bold">{t('footer.cgv_company_name')}</h3>
                        <p className="text-sm">
                            {t('footer.business_registration')}
                            <br />
                            {t('footer.address')}
                            <br />
                            {t('footer.hotline')}
                            <br />
                            {t('footer.copyright')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile footer */}
            <div className="sm:hidden text-[#636363]">
                <ul className="border-t border-[#e1e1e1]">
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.intro')}</li>
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.online_services')}</li>
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.gift_card')}</li>
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.recruitment')}</li>
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.ad_contact')}</li>
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.partner')}</li>
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.general_terms')}</li>
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.transaction_terms')}</li>
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.payment_policy')}</li>
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.privacy_policy')}</li>
                    <li className="border-b border-[#e1e1e1] py-2 text-sm">{t('footer.faq')}</li>
                </ul>
                <div className="mt-5 flex justify-center gap-4">
                    <a
                        href="https://www.facebook.com/cgvcinemavietnam"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="/images/logo-facebookpng-32204.png"
                            className="h-[35px]"
                        />
                    </a>
                    <a
                        href="https://www.youtube.com/cgvvietnam"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="/images/youtube-logo-png-2082.png"
                            className="h-[37px]"
                        />
                    </a>
                    <a
                        href="http://instagram.com/cgvcinemasvietnam"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="/images/logo-instagram-2441.png"
                            className="h-[37px]"
                        />
                    </a>
                    <a
                        href="http://zalo.me/1884424922722396289"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="/images/zalo_logo.png"
                            className="h-[37px]"
                        />
                    </a>
                </div>
                <a
                    className="block mt-3 text-center"
                    href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=30278"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src="https://www.cgv.vn/skin/frontend/cgv/default/images/cong-thuong.PNG"
                        className="mx-auto"
                    />
                </a>
                <div className="text-center bg-[#e7e2e2] mt-5 p-4">
                    <h3 className="font-bold">{t('footer.customer_service')}</h3>
                    <ul className="text-sm leading-6">
                        <li>{t('footer.hotline')}</li>
                        <li>
                            {t('footer.working_hours')}
                        </li>
                        <li>{t('footer.support_email')}</li>
                    </ul>
                </div>
                <div className="text-center mb-5 mt-4">
                    <div className="flex justify-center">
                        <img
                            src="/images/CI_logo_press_20220328_cgv_W-removebg-preview.png"
                            className="w-[150px] h-[120px]"
                        />
                    </div>
                    <div className="leading-snug">
                        <h3 className="font-bold">{t('footer.cgv_company_name')}</h3>
                        <p className="text-sm leading-5">
                            {t('footer.business_registration')}
                            <br />
                            {t('footer.address')}
                            <br />
                            {t('footer.hotline')}
                            <br />
                            {t('footer.copyright')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
