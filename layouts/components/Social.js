import {
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoWhatsapp,
  IoLogoPinterest
} from "react-icons/io5";

const Social = ({ source, className }) => {
  const {
    pinterest,
    whatsapp,
    twitter,
    github
  } = source;
  return (
    <ul className={className}>
      {pinterest && (
        <li className="inline-block">
          <a
            aria-label="whatsapp"
            href={pinterest}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoPinterest />
          </a>
        </li>
      )}
      {whatsapp && (
        <li className="inline-block">
          <a
            aria-label="whatsapp"
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoWhatsapp />
          </a>
        </li>
      )}
      {twitter && (
        <li className="inline-block">
          <a
            aria-label="twitter"
            href={twitter}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoTwitter />
          </a>
        </li>
      )}
      {github && (
        <li className="inline-block">
          <a
            aria-label="github"
            href={github}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoGithub />
          </a>
        </li>
      )}
    </ul>
  );
};

export default Social;
