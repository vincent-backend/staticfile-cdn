const api_url = "https://api.cdnjs.com/libraries/";

export const getLibraryList = async (searchText) => {
  try {
    const res = await fetch(api_url + "?search=" + searchText);
    const data = await res.json();
    const rslt = true;
    return { data, rslt };
  } catch {
    console.log("Fetching data from API server failed.");
    const rslt = false;
    return { rslt };
  }
};

export const getLibraryData = async (lib) => {
  try {
    const res = await fetch(api_url + lib);
    const data = await res.json();
    const name = data.name;
    const description = data.description;
    const version = data.version;
    const versions = await data.versions.filter(
      (item) => item.split("-").length - 1 < 2
    );
    const homepage = data.homepage;
    const files = data.assets[0].files.map(
      (f) => name + "/" + version + "/" + f
    );
    const rslt = true;

    return { name, description, homepage, versions, version, files, rslt };
  } catch {
    console.log("Fetching data from API server failed.");
    const rslt = false;
    return { rslt };
  }
};

export const getFileList = async (lib_name, version) => {
  try {
    const res = await fetch(api_url + lib_name + "/" + version);
    const data = await res.json();
    const name = data.name;
    const files = data.files.map((f) => name + "/" + version + "/" + f);
    const rslt = true;

    return { rslt, files };
  } catch {
    console.log("Fetching data from API server failed.");
    const rslt = false;
    return { rslt };
  }
};
