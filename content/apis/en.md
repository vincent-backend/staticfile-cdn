---
lang: "en"
banner:
  title: "Staticfile CDN API"
  content: "Through the following API, you can easily obtain the basic information and file list of all front-end original libraries accelerated by Staticfile CDN."

api:
  title: API
  description: "After adding the output=human parameter in the following API link, the returned information in JSON format is well formatted and easier to view with the human eye."
  content: [
    {
      title: "Brief information list of all open source libraries",
      url: "https://api.staticfile.org/libraries?output=human",
      description: ""
    },
    {
      title: "List of all open source library names",
      url: "https://api.staticfile.org/libs.min.json",
      description: "<p>The list is a&nbsp;json&nbsp;array (Array). Each item in the array is an array composed of the name, description, and stars of the open source library. </p>
      <p>Please open the link in your browser to view the example directly.</p>"
    },
    {
      title: "Get detailed information about an open source library",
      url: "https://api.staticfile.org/libraries/[name]",
      description: "<p><span>What is obtained through this interface is detailed information in JSON object format of the open source library, including all versions and file lists. </span><span class='description-highlight'>[name]</span><span> is the name of the open source library, which can be obtained from [Open Source Library Brief Information List] or [Open Source Library Name List]. </span></p>
      <p><span>Among them, the </span><span class='description-highlight'>assets</span><span> attribute is a list of all versions and corresponding files. <span></p>
      <p>Take&nbsp;jquery&nbsp; as an example, please open it in the browser </span><a href='https://api.staticfile.org/libraries/jquery' class='description-highlight'>https://api.staticfile.org/libraries/jquery</a><span> and view directly. </span></p>"
    }
  ]

faq:
  title: FAQ
  description: ""
  content: [
    {
      title: "How often is the data obtained through the API updated?",
      description: "Most of all open source libraries accelerated by Staticfile&nbsp;CDN&nbsp; are synchronized from the cdnjs warehouse. We generally synchronize once a day, which means that the information provided in the API is updated every time we synchronize."
    },
    {
      title: "Why is there no search interface?",
      description: "<p>As of now, there are less than &nbsp;4000&nbsp;all open source libraries. The overall amount of searchable data is very small, and basically the name of the open source library is searched, so the amount of data is even less. Through the above The provided&nbsp;API&nbsp;after obtaining the information of all open source libraries, it is not difficult to implement an instant search yourself. Moreover, the information that can be searched is basically in English, and you can implement the search function yourself through &nbsp;lunr.js&nbsp;or regular expressions. </p>
      <p>Furthermore, since our update frequency is generally one day, the acquired data can be cached locally for a longer period of time, thereby not being affected by network conditions and&nbsp;Staticfile&nbsp;CDN&nbsp;API&nbsp;servers, maximizing speed Local search speed. </p>"
    }
  ]