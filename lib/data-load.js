import { notify } from "@hooks/useNotify";
import config from "@config/config.json";

import { network_data } from ".mock/statisticsData";

import lib_data from "public/libraries.json";


export const getLibraryList = async (searchText) => {
  try {
    //const res = await fetch(api_libraries + "?search=" + searchText);
    const res = await lib_data.results.filter(f => f.name.indexOf(searchText) > -1);
    const data = await res.map((d) => d.name);
    const rslt = true;
    return { data, rslt };
  } catch {
    console.log("Error loading data from API server.");
    notify("error", "API Server Connection Failed..");
    const rslt = false;
    return { rslt };
  }
};

export const getLibraryData = async (lib) => {
  try {
    const res = await fetch(process.env.API_HOST + lib);
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
    console.log("Error loading data from API server.");
    notify("error", "API Server Connection Failed..");

    const rslt = false;
    return { rslt };
  }
};

export const getFileList = async (lib_name, version) => {
  try {
    const res = await fetch(process.env.API_HOST + lib_name + "/" + version);
    if (res.status != 200) {
      const rslt = false;
      return { rslt };
    }
    const data = await res.json();
    const name = data.name;
    const files = data.assets.files.map((f) => name + "/" + version + "/" + f);
    const rslt = true;

    return { rslt, files };
  } catch {
    console.log("Error loading data from API server.");
    notify("error", "API Server Connection Failed..");

    const rslt = false;
    return { rslt };
  }
};

export const getNetworkData = async () => {
  try {
    //const res = await fetch(settings.api_statistics + "network");
    //const data = await res.json();
    const data = network_data;
    const rslt = true;
    return { rslt, data };
  } 
  catch (error) {
    console.log("Error loading data from API server.");
    notify("error", "API Server Connection Failed..");
    const rslt = false;
    return { rslt };
  }
}

export const getPlatformData = async () => {
  try {
    const res = await fetch(process.env.API_STATISTICS + "platforms");
    const data = await res.json();
    const rslt = true;
    return { rslt, data };
  }
  catch {
    console.log("Error loading data from API server.");
    notify("error", "API Server Connection Failed..");
    const rslt = false;
    return { rslt };
  }
}

export const getBrowsersData = async () => {
  try {
    const res = await fetch(process.env.API_STATISTICS + "browsers");
    const data = await res.json();
    const rslt = true;
    return { rslt, data };
  }
  catch {
    console.log("Error loading data from API server.");
    notify("error", "API Server Connection Failed..");

    const rslt = false;
    return { rslt };
  }
}

export const getPackagesData = async () => {
  try {
    const res = await fetch(process.env.API_STATISTICS + "packages");
    const data = await res.json();
    const rslt = true;
    return { rslt, data };
  }
  catch {
    console.log("Error loading data from API server.");
    notify("error", "API Server Connection Failed..");

    const rslt = false;
    return { rslt };
  }
}
