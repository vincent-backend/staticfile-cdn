import toast from "@layouts/components/Toast";

export function notify (type, message) {
    toast({ type, message });
}
