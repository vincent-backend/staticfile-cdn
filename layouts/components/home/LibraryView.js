import { useEffect, useState } from "react";

import Tabs from "@layouts/shortcodes/Tabs";
import Tab from "@layouts/shortcodes/Tab";

import { getFileList, getLibraryData, getLibraryList } from "@lib/data-load";
import useTranslation from "@hooks/useTranslation";
import { notify } from "@hooks/useNotify";
import CopyToClipboard from "@hooks/useClipboard";

const LibraryView = ({ libData, section }) => {
  const { locale, setLocale } = useTranslation();

  const [isLoaded, setLoaded] = useState(libData.rslt);

  const [fileList, setFileList] = useState(libData.files);
  const [currentVersion, setVersion] = useState(libData.version);
  const [libname, setLibName] = useState(libData.name);

  const handleVersionChange = async (version) => {
    setVersion(version);
    const { rslt, ...res } = await getFileList(libname, version);
    setLoaded(rslt);
    if (rslt == true) {
      setFileList(res.files);
    }
  };

  const renderListItem = (http, filename, i) => {
    const urls = http + "://cdn.staticfile.org/" + filename;
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
        <div className="flex flex-col relative mt-[10px] sm:mt-[30px]">
          <div className="flex justify-end mb-[10px] sm:hidden">
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
          <div>
            <Tabs>
              <Tab name="HTTPS">
                <ul role="list" className="home-tab-ul">
                  {fileList &&
                    fileList.map((file, index) =>
                      renderListItem("https", file, index),
                    )}
                </ul>
              </Tab>
              <Tab name="HTTP">
                <ul role="list" className="home-tab-ul">
                  {fileList &&
                    fileList.map((file, index) =>
                      renderListItem("http", file, index),
                    )}
                </ul>
              </Tab>
            </Tabs>
          </div>
          <div className="absolute top-0 right-0 hidden sm:block">
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
        <div className="online-store">
          <a href={isLoaded && libData.homepage}>{section.homepage}</a>
        </div>
      </div>
    </div>
  );
};

export default LibraryView;
