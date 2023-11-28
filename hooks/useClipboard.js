import { notify } from "./useNotify";

const CopyToClipboard = (text, locale) => {
  const msg = locale === "cn" ? "复制成功!" : "Successfully copied!";

  const input = document.createElement("input");
  input.value = text;
  input.style.position = "fixed";
  input.style.top = "-2000px";
  document.body.appendChild(input);
  input.select();
  try {
    new Promise((resolve) => {
      if (document.execCommand("copy")) {
        resolve();
      }
    });

    document.body.removeChild(input);
    notify("success", msg);
  } catch (err) {
    notify("error", "Clipboard is not avaliable in this web browser.");
  }
};

export default CopyToClipboard;
