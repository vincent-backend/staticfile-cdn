import { useEffect, useState } from "react";

import Tabs from "@layouts/shortcodes/Tabs";
import Tab from "@layouts/shortcodes/Tab";

import { getFileList, getLibraryData, getLibraryList } from "@lib/data-load";
import useTranslation from "@hooks/useTranslation";
import { notify } from "@hooks/useNotify";
import CopyToClipboard from "@hooks/useClipboard";

import Image from "next/image";

const LibraryView = ({ libData, section }) => {
  const { locale, setLocale } = useTranslation();

  const [isFilesLoading, setFilesLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(libData.rslt);

  const [fileList, setFileList] = useState(libData.files);
  const [currentVersion, setVersion] = useState(libData.version);
  const [libname, setLibName] = useState(libData.name);

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

  const renderListItem = (http, filename, i) => {
    const urls = http + "://cdn.staticfile.net/" + filename;
    return (
      <li
        className="list-item"
        key={i}
        onClick={() => CopyToClipboard(urls, locale)}
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
          <div className="mb-[10px] flex justify-end sm:hidden">
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
          <div className="absolute right-0 top-0 hidden sm:block">
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
