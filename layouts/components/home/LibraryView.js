import { useEffect, useState } from "react";

import Tabs from "@layouts/shortcodes/Tabs";
import Tab from "@layouts/shortcodes/Tab";

import { getFileList, getLibraryData, getLibraryList } from "@lib/data-load";
import { notify } from "@hooks/useNotify";

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

const LibraryView = ({libname, section}) => {

    console.log(libname);

    /// Primary Lib data
    const [libData, setLibData] = useState(null);
    const [isDataLoaded, setDataLoaded] = useState(false);

    const [fileList, setFileList] = useState(null);
    const [currentVersion, setVersion] = useState(null);

    const handleVersionChange = async (version) => {
        setVersion(version);
        const {result, ...res} = await getFileList(libname, version);
            if (result == true) {
            setFileList(res.files);
        }          
      };

    useEffect(() => {
        console.log("entering useEffect");
        const fetchLibData = async () => {
            console.log("fetching data...");
            const {result, ...response} = await getLibraryData(libname);
            
            setDataLoaded(result);

            console.log(isDataLoaded);

            if (isDataLoaded == true) {
                console.log("getting data success.");
                setLibData(response);
                setFileList(response.files);
                setVersion(response.version);
            }
        }

        fetchLibData();

    }, [libname]);

    return(
        <div className="container flex justify-center pb-[50px]">
            { libData && 
            <div className="col-12 px-1">
            <div className="section_title">{libData.name.toUpperCase()}</div>
            <div className="section_description">{libData.description}</div>
            <div className="flex flex-col relative mt-[10px] sm:mt-[30px]">
              <div className="flex justify-end mb-[10px] sm:hidden">
                <div className="dropdown">
                  <select
                    className="dropbtn"
                    value={currentVersion}
                  >
                  </select>
                </div>
              </div>
              <div>
                <Tabs>
                  <Tab name="HTTPS">
                    <ul role="list" className="home-tab-ul">
                      {fileList.map((file, index) =>
                        renderListItem("https", file, index),
                      )
                      }
                    </ul>
                  </Tab>
                  <Tab name="HTTP">
                    <ul role="list" className="home-tab-ul">
                      {fileList.map((file, index) =>
                        renderListItem("http", file, index),
                      )
                      }
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
                      {libData.versions.map((version) => (
                      <option key={version} value={version}>
                        {version}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="online-store">
              <a href={libData.homepage}>{section.homepage}</a>
            </div>
          </div>
            }
          </div>
    );
}

export default LibraryView;