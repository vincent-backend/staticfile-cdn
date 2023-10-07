import clsx from "clsx";
import config from "@config/config.json";
import social from "@config/social.json";
import Logo from "@layouts/components/Logo";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "@hooks/useTranslation";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const { title_cn, title_en, support_cn, support_en } = config.footer;
  const { locale, setLocale } = useTranslation();

  const [title, setTitle] = useState(locale === "cn" ? title_cn : title_en);
  const [support, setSupport] = useState(
    locale === "cn" ? support_cn : support_en,
  );

  const [isWHover, setWHover] = useState(false);

  const handleWHover = () => {
    if (isWHover == false) {
      setWHover(true);
    }
  };

  const handleWHoverLeave = () => {
    if (isWHover == true) {
      setWHover(false);
    }
  };

  useEffect(() => {
    if (locale === "cn") {
      setTitle(title_cn);
    } else {
      setTitle(title_en);
    }
  }, [locale]);

  return (
    <footer className="bg-white font-primary text-base">
      <div className="container">
        <div className="row pt-[30px] pb-[50px]">
          <div className="col-12 md:col-4">
            <Logo />
          </div>
          <div className="flex items-center justify-center md:items-start md:justify-start md:col-8">
            <div className="flex-col justify-center">
              <div className="flex flex-row items-center justify-center space-x-6">
                <Image
                  alt="f"
                  src="/images/footer/thumb1.png"
                  width={132}
                  height={46}
                  className="w-[132px] h-auto"
                />
                <Image
                  alt="f"
                  src="/images/footer/thumb2.png"
                  width={15}
                  height={15}
                />
                <Image
                  alt="f"
                  src="/images/footer/thumb3.png"
                  width={102}
                  height={33}
                />
              </div>

              <p className="text-center font-primary font-bold pt-5">
                {support}
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-12 lg:col-12">
          <div className="flex items-center">
            <div className="flex grow h-[1px] bg-border" />
            <div className="text-center text-h6 font-primary font-bold text-dark mx-5">
              {title}
            </div>
            <div className="flex grow h-[1px] bg-border" />
          </div>
          <div className="mt-[12px] flex justify-center space-x-[30px]">
            {/* social icons */}
            <div className="social-icon">
              <a
                href={social.webio}
                className="bg-[url('/images/footer/bot_ic_1_nor.svg')] active:bg-[url('/images/footer/bot_ic_1_sel.svg')] hover:bg-[url('/images/footer/bot_ic_1_sel.svg')]"
              ></a>
            </div>
            <div className="social-icon relative">
              <a
                className="bg-[url('/images/footer/bot_ic_2_nor.svg')] active:bg-[url('/images/footer/bot_ic_2_sel.svg')] hover:bg-[url('/images/footer/bot_ic_2_sel.svg')]"
                onMouseMove={() => handleWHover()}
                onMouseLeave={() => handleWHoverLeave()}
              />
              <div
                className={clsx(
                  "absolute w-[76px] h-[76px] bg-[url('/images/footer/bot_weixin.png')] top-[32px] scale-0",
                  isWHover && "qrcode-hover",
                )}
                onClick={() => handleWHoverLeave()}
              />
            </div>
            <div className="social-icon">
              <a
                href={social.twitter}
                className="bg-[url('/images/footer/bot_ic_3_nor.svg')] active:bg-[url('/images/footer/bot_ic_3_sel.svg')] hover:bg-[url('/images/footer/bot_ic_3_sel.svg')]"
              />
            </div>
            <div className="social-icon">
              <a
                href={social.github}
                className="bg-[url('/images/footer/bot_ic_4_nor.svg')] active:bg-[url('/images/footer/bot_ic_4_sel.svg')] hover:bg-[url('/images/footer/bot_ic_4_sel.svg')]"
              />
            </div>
          </div>
        </div>
        {/* copyright */}
        <div className="py-10 flex-col justify-between text-center">
          <span className="footer-description">
            备案号 沪ICP备11037377号-26
          </span>
          <div className="text-center break-words">
            <span className="text-copyright">
              © Copyright 2014-{new Date().getFullYear()}{" "}
            </span>
            <span className="text-copyright">
              <Link href="https://www.staticfile.org" className="footer-link">
                Staticfile.org.
              </Link>
            </span>
            <span className="text-copyright block md:inline-block">
              &nbsp;Built upon love.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
