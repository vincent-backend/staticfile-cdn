import ImageFallback from "@components/ImageFallback";
import config from "@config/config.json";
import Link from "next/link";

const Logo = ({ src }) => {
  // destructuring items from config object
  const { logo, width, height, logo_text, title } = config.site;

  return (
    <Link href="/" className="navbar-brand block">
      <div className="flex flex-row items-center h-[60px]">
        <ImageFallback
          width={width.replace("px", "")}
          height={height.replace("px", "")}
          src={src ? src : logo}
          alt={title}
          priority
          style={{
            height: height.replace("px", "") + "px",
            width: width.replace("px", "") + "px",
          }}
        />
      </div>
    </Link>
  );
};

export default Logo;
