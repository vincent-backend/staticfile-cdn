import api from "@config/api";

const {api_url} = api;

export const getLibraryList = async(searchText) => {
    
    try {
        const res = await fetch(api_url + "?search=" + searchText);
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
    
}

export const getLibraryData = async(lib) => {
    try {
        const res = await fetch(api_url + lib);
        const data = await res.json();
        const name = data.name;
        const description = data.description;
        const latest_version = data.version;
        const versions  = await data.versions.filter(item => (item.split("-").length - 1) < 2);
        const files = data.assets[0].files;
        return {name, description, versions, latest_version, files};
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const getFileList = async(lib_name, version) => {
    try {
        const res = await fetch(api_url + lib_name + "/" + version);
        const data = await res.json();
        
        return data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}