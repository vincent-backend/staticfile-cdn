import toast from "@layouts/components/Toast";

    
export function notify (type, message) {
    toast({ type, message });
}

const copyToClipboard = (text) => {
    if (typeof navigator !== 'undefined') {
        navigator.permissions.query({name: "clipboard-write"})
        .then(result => {
        if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(text);
            notify("success", "The url has been copied.");
        }
        })
        .catch(error => {
        if(window.ffclipboard) {
            ffclipboard.setText(text);
        }
        else {
            console.log(error);
            notify("error", "Clipboard is not avaliable in this web browser.");
        }
        
        });	
    }
};

export default copyToClipboard;