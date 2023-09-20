import Social from "@components/Social";
import config from "@config/config.json";
import social from "@config/social.json";
import Logo from "@layouts/components/Logo";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="bg-white">
      <div className="container">
        <div className="row  py-12">
          <div className="animate md:col-12 lg:col-4">
            <Logo />
          </div>
          <div className="animate flex sm:items-center sm:justify-center md:col-12 lg:items-start lg:justify-start lg:col-8">
            <Image
              alt="f"
              src="/images/Footer_mark.png"
              width={429}
              height={72}
            />
          </div>
        </div>
        <div className="animate mt-8 md:col-12 lg:col-12 lg:mt-0">
          <div className="flex items-center">
            <div className="flex grow h-[2px] bg-border" />
            <h2 className="h3 text-center font-sans font-medium mx-4">分享给朋友</h2>
            <div className="flex grow h-[2px] bg-border" />
          </div>
          <div className="mt-5">
            {/* social icons */}
            <Social
              source={social}
              className="flex justify-center social-icons mt-5"
            />
          </div>
        </div>
        {/* copyright */}
        <div className=" py-6 text-center">
          © Copyright 2014-{new Date().getFullYear()}{" "}
          <Link href="https://www.staticfile.org" className="footer-copy-write">
            Staticfile.org
          </Link>{" "}
          Built upon love
        </div>
      </div>
    </footer>
  );
};

export default Footer;
