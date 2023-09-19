import Image from "next/image";

const BannerHome = () => {
    return(
        <div className="relative w-[700px] h-[450px] bg-[url('/images/banners/Home/b16@2x.png')]">
            {/*Left Topr*/}
            <div className="index-left-top">
                <div className="absolute left-[0px] top-[13px] w-[152px] h-[113px] bg-[url('/images/banners/Home/6@2x.png')]" />
                <div className="absolute left-[57px] top-[10px] w-[37px] h-[42px] bg-[url('/images/banners/Home/5@2x.png')]" />
            </div>
            {/*Left Bottom*/}
            <div className="absolute top-[221px] left-[37px] w-[185px] h-[162px]">
                <div className="absolute left-[0px] top-[0px] w-[185px] h-[108px] bg-[url('/images/banners/Home/9@2x.png')]" />
                <div className="absolute left-[26px] top-[33px] w-[132px] h-[129px] bg-[url('/images/banners/Home/10@2x.png')]" />
            </div>
            {/*Middle Tower*/}
            <div className="index-middle-tower">
                <div className="tower-base" />
                <div className="tower-1" />
                <div className="tower-2" />
                <div className="tower-3" />
            </div>
            {/*Right Middle*/}
            <div className="absolute top-[179px] left-[487px] w-[185px] h-[142px]">
                <div className="absolute left-[0px] top-[13px] w-[202px] h-[143px] bg-[url('/images/banners/Home/8@2x.png')]" />
                <div className="absolute left-[61px] top-[10px] w-[56px] h-[64px] bg-[url('/images/banners/Home/7@2x.png')]" />
            </div>
        </div>
    );
}

export default BannerHome;