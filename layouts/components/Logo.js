import ImageFallback from "@components/ImageFallback";
import config from "@config/config.json";
import Link from "next/link";

const Logo = ({ src }) => {
  // destructuring items from config object
  const { logo, width, height, logo_width, logo_height, logo_text, title } =
    config.site;

  return (
    <Link href="/" className="navbar-brand block">
      <div className="flex flex-row items-center h-[60px]">
        <ImageFallback
          width={logo_width.replace("px", "")}
          height={logo_height.replace("px", "")}
          src={src ? src : logo}
          alt={title}
          priority
          style={{
            height: logo_height.replace("px", "") + "px",
            width: logo_width.replace("px", "") + "px",
          }}
        />
        <span className="font-primary font-bold text-[18px] text-black inline ml-3">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default Logo;
