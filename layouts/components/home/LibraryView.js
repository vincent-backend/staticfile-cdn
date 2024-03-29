import { useEffect, useState } from "react";

import Tabs from "@layouts/shortcodes/Tabs";
import Tab from "@layouts/shortcodes/Tab";

import { getFileList, getLibraryData, getLibraryList } from "@lib/data-load";
import useTranslation from "@hooks/useTranslation";
import { notify } from "@hooks/useNotify";
import CopyToClipboard from "@hooks/useClipboard";
import clsx from "clsx";

import Image from "next/image";

const baseCdnHttpsUrl = "https://cdn.staticfile.net/";
const baseCdnHttpUrl = "http://cdn.staticfile.net/";

const LibraryView = ({ libData, section }) => {
  const { locale, setLocale } = useTranslation();

  const [isFilesLoading, setFilesLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(libData.rslt);

  const [fileList, setFileList] = useState(libData.files);
  const [currentVersion, setVersion] = useState(libData.version);
  const [libname, setLibName] = useState(libData.name);
  const [lastMode, setLastMode] = useState("HTTPS");

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

  const handleModeChange = (mode) => {
    if (mode !== "SCRIPT")
      setLastMode(mode);
  }

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
                <Tabs onChangeTab={handleModeChange}>
                  <Tab name="HTTPS">
                    <ul role="list" className="home-tab-ul">
                      {fileList &&
                        fileList.map((file, index) => {
                          const urls = baseCdnHttpsUrl + file;
                          return (<li
                            className="list-item"
                            key={index}
                            onClick={() => CopyToClipboard(urls, locale)}
                          >
                            {urls}
                          </li>)
                        })}
                    </ul>
                  </Tab>
                  <Tab name="HTTP">
                    <ul role="list" className="home-tab-ul">
                      {fileList &&
                        fileList.map((file, index) => {
                          const urls = baseCdnHttpUrl + file;
                          return (<li
                            className="list-item"
                            key={index}
                            onClick={() => CopyToClipboard(urls, locale)}
                          >
                            {urls}
                          </li>)
                        })}
                    </ul>
                  </Tab>
                  <Tab name="SCRIPT">
                    <ul role="list" className="home-tab-ul">
                      {fileList &&
                        fileList.map((file, index) => {
                          var urls = "<script src=\"" + baseCdnHttpsUrl + file + "\"></script>";
                          if (lastMode === "HTTP") {
                            urls = "<script src=\"" + baseCdnHttpUrl + file + "\"></script>";
                          }
                          return (<li
                            className="list-item"
                            key={index}
                            onClick={() => CopyToClipboard(urls, locale)}
                          >
                            {urls}
                          </li>)
                        })}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryView;
