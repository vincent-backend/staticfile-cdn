import Image from "next/image";
import { SiteNames } from "constant";


const NetworkIcon = ({sitename}) => {
    return(
        <>
            {sitename == SiteNames.Bunny && 
            <Image src="images/statistics/network/bunny.svg" width={24} height={24} alt="Bunny" />
            }
            {sitename == SiteNames.Cloudflare && 
            <Image src="images/statistics/network/cloudflare.svg" width={24} height={24} alt="Cloudflare" />
            }
            {sitename == SiteNames.Fastly && 
            <Image src="images/statistics/network/fastly.svg" width={24} height={24} alt="Fastly" />
            }
            {sitename == SiteNames.GCore && 
            <Image src="images/statistics/network/g-core.svg" width={24} height={24} alt="GCore" />
            }
            {sitename == SiteNames.Quantil && 
            <Image src="images/statistics/network/quantil.ico" width={36} height={36} alt="Quantil" />
            }
            {sitename == SiteNames.StackPath && 
            <Image src="images/statistics/network/stackpath.svg" width={24} height={24} alt="StackPath" />
            }
        </>
    );
}

export default NetworkIcon;