import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import { getDataFromContent } from "@lib/contentParser";
import useTranslation from "@hooks/useTranslation";
import Base from "@layouts/Baseof";
import BannerAbout from "@layouts/components/banner/BannerAbout";

import { useEffect, useState } from "react";

const About = ({ data }) => {
  const { locale, setLocale } = useTranslation();
  const [frontmatter, setFrontmatter] = useState(
    data.filter((dt) => dt.lang === locale)[0]
  );
  const { banner, content, content1, content2 } = frontmatter;

  useEffect(() => {
    const ctx = gsap.context(() => {
      //frontmatter
      setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5 }
      );
    });

    return () => ctx.revert();
  }, [locale, data]);

  return (
    <Base>
      <section className="section">
        <div className="banner-bg absolute h-[450px] w-full overflow-hidden">
          <div className="relative left-[-350px] flex sm:left-[-300px] md:left-[-100px] lg:left-0">
            <BannerAbout />
          </div>
        </div>
        <div className="container z-10 flex flex-col justify-center px-0">
          <div className="col-12 mb-12 mt-12">
            <div className="banner-title mx-5 mb-12 text-[#070c13] opacity-0">
              {banner.title}
            </div>
            <div className="container-main">
              {content.map((c, i) => (
                <div className="div-about" key={i}>
                  {markdownify(c.subtitle, "h5", "about-subtitle")}
                  {markdownify(c.description, "", "about-content")}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default About;

// for homepage data
export const getStaticProps = async () => {
  const data = await getDataFromContent("content/about");
  return {
    props: {
      data,
    },
  };
};
