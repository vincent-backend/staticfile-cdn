import useTranslation from "@hooks/useTranslation";
import Base from "@layouts/Baseof";
import { getDataFromContent } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import BannerAPI from "@layouts/components/banner/BannerAPI";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

const Apis = ({ data }) => {
  const { locale, setLocale } = useTranslation();
  const [frontmatter, setFrontmatter] = useState(
    data.filter((dt) => dt.lang === locale)[0],
  );
  const { banner, api, faq } = frontmatter;

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5 },
      )
        .fromTo(
          ".banner-text",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          ">-0.4",
        )
        .fromTo(
          ".banner-img",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          ">-.5",
        );
    });

    return () => ctx.revert();
  }, [locale, data]);

  return (
    <Base>
      <section className="section bg-primary">
        <div className="container z-10 overflow-hidden">
          <div className="banner-bg md:h-[300px]">
            <div className="row">
              <div className="col-12 md:col-6">
                <div className="pt-20">
                  {markdownify(banner.title, "h3", "banner-title opacity-0")}
                  {markdownify(
                    banner.content,
                    "h5",
                    "banner-text text-justify opacity-0",
                  )}
                </div>
              </div>
              <div className="banner-img flex col-12 md:col-6 opacity-0 justify-center items-center px-0 lg:right-0">
                <div className="md:absolute md:mt-24">
                  <BannerAPI />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* API */}
      <section className="section">
        <div className="flex justify-center container px-0">
          <div className="col-12 -mt-16 mb-5">
            <div className="container-main">
              <div className="api-background flex-row">
                <Image className="image_6"
                src="/images/api/image_6.png"
                alt="image_6"
                width={24}
                height={68}
                />
                <Image className="image_7"
                  alt="image_7"
                  src="/images/api/image_7.png"
                  width={25}
                  height={15}
                 />
                 <Image className="label_2"
                 alt="label_2"
                 src="/images/api/label_2.png"
                 width={44}
                 height={39}
                 />
                 <Image className="image_8"
                 alt="image_8"
                 src="/images/api/image_8.png"
                 width={64}
                 height={91}
                 />
                 <div className="image-wrapper_4 flex-col">
                  <Image className="image_9"
                  alt="image_9"
                  src="/images/api/image_9.png"
                  width={42}
                  height={67}
                  />
                 </div>
                 <span className="text_16">{api.title}</span>
              </div>
              <div className="div-api">
                <div className="">
                  {markdownify(
                    api.content,
                    "h4",
                    "pt-4 text-primary font-medium leading-normal",
                  )}
                </div>
                <h3 className="py-5">Comming soon</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ  */}
      <section className="section">
        <div className="flex justify-center container px-0">
          <div className="col-12 mb-12">
            <div className="container-main">
              <div className="div-api">
                <div className="">
                  {markdownify(faq.title, "h3", "text-primary")}
                </div>
                <div className="">
                  {markdownify(
                    api.content,
                    "h4",
                    "pt-4 text-primary font-medium leading-normal",
                  )}
                </div>
                <h3 className="py-5">Comming soon</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Apis;

// for homepage data
export const getStaticProps = async () => {
  const data = await getDataFromContent("content/apis");

  return {
    props: {
      data,
    },
  };
};
