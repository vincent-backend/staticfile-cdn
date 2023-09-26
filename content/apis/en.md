---
lang: "en"
banner:
  title: "Staticfile CDN API"
  content: "Through the following API, you can easily obtain the basic information and file list of all front-end original vehicles accelerated by Staticfile CDN."

api:
  title: API
  description: "After adding the output=human parameter in the following API link, the returned information in JSON format is well formatted and easier to view with the human eye."
  content: [
    {
      title: "Brief information list of all open source libraries",
      url: "https://api.bootcdn.cn/libraries?output=human",
      description: ""
    },
    {
      title: "List of all open source library names",
      url: "https://api.bootcdn.cn/libraries?output=human",
      description: "<p>The list is a&nbsp;json&nbsp;array (Array). Each item in the array is an array composed of the name, description, and stars of the open source library. </p>
      <p>Please open the link in your browser to view the example directly.</p>"
    },
    {
      title: "Get detailed information about an open source library",
      url: "https://api.bootcdn.cn/libraries/[name]",
      description: "<p><span>What is obtained through this interface is detailed information in JSON object format of the open source library, including all versions and file lists. </span><span class='description-highlight'>[name]</span><span> is the name of the open source library, which can be obtained from [Open Source Library Brief Information List] or [Open Source Library Name List]. </span></p>
      <p><span>Among them, the </span><span class='description-highlight'>assets</span><span> attribute is a list of all versions and corresponding files. <span></p>
      <p>Take&nbsp;jquery&nbsp; as an example, please open it in the browser </span><a href='https://api.bootcdn.cn/libraries/jquery' class='description-highlight'>https: //api.bootcdn.cn/libraries/jquery</a><span> and view directly. </span></p>"
    }
  ]

faq:
  title: FAQ
  content: ""