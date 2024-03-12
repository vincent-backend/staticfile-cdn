import { useEffect, useState } from "react";

import Tabs from "@layouts/shortcodes/Tabs";
import Tab from "@layouts/shortcodes/Tab";

import { getFileList, getLibraryData, getLibraryList } from "@lib/data-load";
import useTranslation from "@hooks/useTranslation";
import { notify } from "@hooks/useNotify";
import CopyToClipboard from "@hooks/useClipboard";
import clsx from "clsx";

import Image from "next/image";

const LibraryView = ({ libData, section }) => {
  const { locale, setLocale } = useTranslation();

  const [isFilesLoading, setFilesLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(libData.rslt);

  const [fileList, setFileList] = useState(libData.files);
  const [currentVersion, setVersion] = useState(libData.version);
  const [libname, setLibName] = useState(libData.name);
  const [copyMode, setCopyMode] = useState(1);

  const handleVersionChange = async (version) => {
    setVersion(version);
    setFilesLoading(true);
    const { rslt, ...res } = await getFileList(libname, version);
    setLoaded(rslt);
    if (rslt == true) {
      setFileList(res.files);
    }
    setFilesLoading(false);
  };

  const handleCopyMode = (mode) => {
    setCopyMode(mode);
  }

  const handleCopy =(urls) => {
    if (copyMode == 1) {
      CopyToClipboard(urls, locale);
    } else {
      var tUrls = "<script src='" + urls + "'></script>"
      CopyToClipboard(tUrls, locale);
    }
  }

  const renderListItem = (http, filename, i) => {
    const urls = http + "://cdn.staticfile.net/" + filename;
    return (
      <li
        className="list-item"
        key={i}
        onClick={() => handleCopy(urls)}
      >
        {urls}
      </li>
    );
  };

  useEffect(() => {
    setLibName(libData.name);
    setVersion(libData.version);
    setFileList(libData.files);
  }, [libData]);

  return (
    <div className="container flex justify-center pb-[50px]">
      <div className="col-12 px-1">
        <div className="section_title">
          {isLoaded && libData.name.toUpperCase()}
        </div>
        <div className="section_description">
          {isLoaded && libData.description}
        </div>
        <div className="relative mt-[10px] flex flex-col sm:mt-[30px]">
          <div className="mb-[10px] h-8 sm:hidden">
          </div>
          <div className="flex-col">
            {isFilesLoading ? (
              <div className="flex h-[160px] w-full items-center justify-center md:mt-[40px]">
                <Image
                  alt="loading"
                  src="/images/loading.gif"
                  width={150}
                  height={150}
                />
              </div>
            ) : (
              <>
                <Tabs>
                  <Tab name="HTTPS">
                    <ul role="list" className="home-tab-ul">
                      {fileList &&
                        fileList.map((file, index) => renderListItem("https", file, index)
                        )}
                    </ul>
                  </Tab>
                  <Tab name="HTTP">
                    <ul role="list" className="home-tab-ul">
                      {fileList &&
                        fileList.map((file, index) =>
                          renderListItem("http", file, index)
                        )}
                    </ul>
                  </Tab>
                </Tabs>
                <div className="online-store">
                  <a href={isLoaded ? libData.homepage : "#"}>
                    {section.homepage}
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="absolute right-0 top-0 flex flex-row-reverse items-center justify-end gap-4">
            <div className="dropdown">
              <select
                className="dropbtn"
                value={currentVersion}
                onChange={(e) => handleVersionChange(e.target.value)}
              >
                {isLoaded &&
                  libData.versions.map((version) => (
                    <option key={version} value={version}>
                      {version}
                    </option>
                  ))}
              </select>
            </div>
            <div className="copy-buttons">
              <div className={clsx("copy-button", copyMode==1 && "active")} onClick={()=>handleCopyMode(1)}>
                <svg className="copy-button-icon" width="20" height="20" viewBox="0 0 35.033 35.033">
                  <g>
                    <path d="M11.811,10.535l-6.983,6.984l6.983,6.981c0.78,0.781,0.78,2.048,0,2.828c-0.392,0.392-0.901,0.586-1.414,0.586
		c-0.513,0-1.022-0.194-1.414-0.586l-8.397-8.396C0.211,18.558,0,18.049,0,17.519c0-0.529,0.211-1.039,0.586-1.414l8.397-8.398
		c0.781-0.78,2.047-0.78,2.828,0C12.591,8.488,12.591,9.752,11.811,10.535z M34.447,16.104l-8.396-8.398
		c-0.781-0.78-2.047-0.78-2.828,0c-0.781,0.781-0.781,2.047,0,2.828l6.982,6.984L23.223,24.5c-0.781,0.781-0.781,2.048,0,2.828
		c0.392,0.392,0.902,0.586,1.414,0.586s1.023-0.194,1.414-0.586l8.396-8.396c0.375-0.375,0.586-0.884,0.586-1.414
		C35.033,16.99,34.822,16.479,34.447,16.104z M21.012,3.831c-1.076-0.277-2.161,0.373-2.435,1.441l-6,23.498
		c-0.272,1.07,0.373,2.16,1.442,2.434c0.167,0.043,0.334,0.063,0.497,0.063c0.894,0,1.706-0.603,1.937-1.505l6-23.498
		C22.727,5.193,22.081,4.104,21.012,3.831z"/>
                  </g>
                </svg>
              </div>
              <div className={clsx("copy-button", copyMode==2 && "active")}  onClick={()=>handleCopyMode(2)}>
                <svg className="copy-button-icon" width="20" height="20" viewBox="0 0 16 16"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryView;
