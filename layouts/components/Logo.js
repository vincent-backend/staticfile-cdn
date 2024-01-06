import ImageFallback from "@components/ImageFallback";
import config from "@config/config.json";
import Link from "next/link";

const Logo = ({ src }) => {
  // destructuring items from config object
  const { logo, width, height, logo_text, title } = config.site;

  return (
    <Link href="https://www.staticfile.net" className="navbar-brand block">
      <div className="flex flex-row items-center h-[60px]">
        <ImageFallback
          width={166}
          height={38}
          src={src ? src : logo}
          alt={title}
          priority
          style={{
            height: "38px",
            width: "166px",
            layout: "fixed"
          }}
        />
      </div>
    </Link>
  );
};

export default Logo;
