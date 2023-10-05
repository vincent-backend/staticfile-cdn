import { notify } from "./useNotify";

const CopyToClipboard = (text, locale) => {

    const msg = locale === "cn" ? "复制成功!" : "Successfully copied!"

    if (typeof navigator !== 'undefined') {
        navigator.permissions.query({name: "clipboard-write"})
        .then(result => {
        if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(text);
            notify("success", msg);
        }
        })
        .catch (async (error) => {
            const input = document.createElement("input");
            input.value = text;
            input.style.position = "fixed";
            input.style.top = "-2000px";
            document.body.appendChild(input);
            input.select();
            try {
                await new Promise((resolve) => {
                  if (document.execCommand("copy")) {
                    resolve();
                  }
                });
            
                document.body.removeChild(input);
                notify("success", msg);
              } 
              catch (err) {
                console.log(error);
                notify("error", "Clipboard is not avaliable in this web browser.");
            }
        });	
    }
    else {
        console.log("Error");
    }
};

export default CopyToClipboard;