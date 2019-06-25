export default function toHashTitle(text) {
    return text
        .replace(/[^A-Za-zА-Яа-я0-9]/g, '-')
        .replace(/--/g,'-')
        .toLowerCase();
}
