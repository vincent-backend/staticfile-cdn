---
lang: "cn"
banner:
  title: "Staticfile CDN API"
  content: "通过以下API可以方便获取Staticfile CDN所加速的所有前端开原车的基本信息和文件列表。"

api:
  title: "API"
  description: "在以下API链接中上 output=human参数之后，获取到的JSON格式的退回信息是经过很好格式的，更于人眼查看。"
  content: [
    {
      title: "所有开源库简要信息列表",
      url: "https://api.bootcdn.cn/libraries?output=human",
      description: ""
    },
    {
      title: "所有开源库名称列表",
      url: "https://api.bootcdn.cn/libraries?output=human",
      description: "<p>该列表是一个&nbsp;json&nbsp;数组（Array），数组中的每一个条目是由开源库的名称（name）、描述（description）、星标数（stars）组成的数组。</p>请在浏览器中打开链接直接查看实例。"
    },
    {
      title: "获取某个开源库的详细信息",
      url: "https://api.bootcdn.cn/libraries/[name]",
      description: "<p><span>通过此接口获取到的是开源库的&nbsp;JSON&nbsp;对象（Object）格式的详细信息，包括所有版本以及文件列表。</span><span class='description-highlight'>[name]</span><span>是开源库的名称，可从[开源库简要信息列表]或[开源库名称列表]中获取。</span></p>
      <p><span>其中，</span><span class='description-highlight'>assets</span><span>属性是所有版本及对应文件的列表。<span></p>
      <p>以&nbsp;jquery&nbsp;为例，请在浏览器中打开 </span><a href='https://api.bootcdn.cn/libraries/jquery' class='description-highlight'>https://api.bootcdn.cn/libraries/jquery</a><span> 直接查看。</span></p>"
    }
  ]


faq:
  title: "FAQ"
  description: "  "
  content: [
    {
      title: "通过 API 获取到的数据的更新频率？",
      description: "Staticfile&nbsp;CDN&nbsp;所加速的所有开源库绝大部分同步自&nbsp;cdnjs&nbsp;仓库，我们一般是每天都同步一次，也就是每次同步的时候才会更新&nbsp;API&nbsp;中提供的信息。"
    },
    {
      title: "为什么没有搜索接口？",
      description: "<p>截止到目前，所有开源库也就不到&nbsp;4000&nbsp;个，整体可搜索的数据量很少，而且基本上都是搜索开源库的名称，所以数据量就更少了，通过上面提供的&nbsp;API&nbsp;获取到所有开源库的信息之后自己实现一个即时搜索也不难。况且能够搜索的信息基本上都是英文的，可以通过&nbsp;lunr.js&nbsp;或者正则表达式自己实现搜索功能。</p>
      <p>再者，由于我们的更新频率一般是一天，所以可以将获取到数据缓存在本地较长的时间，从而不受网络状况和&nbsp;Staticfile&nbsp;CDN&nbsp;API&nbsp;服务器的影响，最大程度加快本地搜索速度。</p>"
    }
  ]
