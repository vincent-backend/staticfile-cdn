import parseMDX from "@lib/utils/mdxParser";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// get list page data, ex: _index.md
export const getDataFromContent = async (folder) => {

  const fileNames = getAllFileNames(folder);

  const allIndexData = fileNames.map((fileName) => {
  const pageData = fs.readFileSync(fileName, "utf-8");
  const pageDataParsed = matter(pageData);
  
  let frontmatter, content;

  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data;
  } 

  return {
      ...frontmatter
  };
  });

  return allIndexData;
};

// Get all filenames in posts directory as ['en/filename.md']
export function getAllFileNames(directoryPath, filesList = []) {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllFileNames(`${directoryPath}/${file}`, filesList);
    } else {
      filesList.push(path.join(directoryPath, '/', file));
    }
  });

  const filteredList = filesList.filter((file) => file.includes('.md'));
  return filteredList;
}