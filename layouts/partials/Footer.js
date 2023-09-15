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
        <div className="row border-y border-border py-12">
          <div className="animate md:col-12 lg:col-4">
            <Logo />
          </div>
          <div className="animate flex sm:items-center sm:justify-center md:col-12 lg:items-start lg:justify-start lg:col-8">
            <Image alt="f" src="/images/Footer_mark.png" width={429} height={72} />
          </div>
        </div>
        <div className="animate mt-8 md:col-12 lg:col-12 lg:mt-0">
            <h2 className="h5 font-sans text-center">分享给朋友</h2>
            <div className="mt-5">
              {/* social icons */}
              <Social source={social} className="flex justify-center social-icons mt-5" />
            </div>
          </div>
        {/* copyright */}
        <div className=" py-6 text-center">
          Copyright 2014-2021 <Link href="/dd" className="footer-copy-write">Staticfile.org</Link> Built upon love
        </div>
      </div>
    </footer>
  );
};

export default Footer;
