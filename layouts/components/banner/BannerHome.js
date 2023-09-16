import Image from "next/image";

const BannerHome = () => {
    return(
        <div className="relative w-[700px] h-[450px] overflow-hidden bg-[url('/images/banners/Home/b16@2x.png')]">
            <div className="absolute top-[40px] left-[235px] w-[255px] h-[357px]">
                <div className="absolute left-[0px] top-[190px] w-[311px] h-[206px] bg-[url('/images/banners/Home/4@2x.png')]" />
                <div className="absolute left-[38px] top-[146px] w-[187px] h-[174px] bg-[url('/images/banners/Home/1@2x.png')]" />
                <div className="absolute left-[38px] top-[73px] w-[187px] h-[174px] bg-[url('/images/banners/Home/1@2x.png')]" />
                <div className="absolute left-[38px] top-[0px] w-[187px] h-[174px] bg-[url('/images/banners/Home/1@2x.png')]" />
            </div>
        </div>
    );
}

export default BannerHome;