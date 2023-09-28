import Social from "@components/Social";
import config from "@config/config.json";
import social from "@config/social.json";
import Logo from "@layouts/components/Logo";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "@hooks/useTranslation";
import { useEffect, useState } from "react";

const Footer = () => {
  const { title_cn, title_en, support_cn, support_en } = config.footer;
  const { locale, setLocale } = useTranslation();

  const [title, setTitle] = useState(locale === "cn" ? title_cn : title_en);
  const [support, setSupport] = useState(
    locale === "cn" ? support_cn : support_en,
  );

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
        <div className="row py-12 pt-8">
          <div className="animate col-12 md:col-4">
            <Logo />
          </div>
          <div className="animate flex items-center justify-center md:items-start md:justify-start md:col-8">
            <div className="flex-col justify-center">
              <div className="flex flex-row items-center justify-center space-x-6">
                <Image
                  alt="f"
                  src="/images/footer/thumb1.png"
                  width={132}
                  height={46}
                  className="w-[102px] h-auto"
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
        <div className="animate mt-8 md:col-12 lg:col-12 lg:mt-0">
          <div className="flex items-center">
            <div className="flex grow h-[1px] bg-border" />
            <div className="text-center text-base font-primary font-bold text-dark mx-5">
              {title}
            </div>
            <div className="flex grow h-[1px] bg-border" />
          </div>
          <div className="mt-5">
            {/* social icons */}
            <Social
              source={social}
              className="flex justify-center social-icons mt-3"
            />
          </div>
        </div>
        {/* copyright */}
        <div className="py-10 flex-col justify-between text-center">
          <span className="break-word">备案号 沪ICP备11037377号-26</span>
          <div className="">
            <span className="text_24">
              © Copyright 2014-{new Date().getFullYear()}{" "}
            </span>
            <span className="break-word"></span>
            <span className="break-word">
              <Link
                href="https://www.staticfile.org"
                className="footer-copy-write"
              >
                Staticfile.org.
              </Link>
            </span>
            <span className="text_27">&nbsp;Built upon love.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
