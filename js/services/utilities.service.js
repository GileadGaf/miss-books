export const utilitiesService = {
    getDeepCopy,
    makeId
}

function getDeepCopy(obj) {
    var strObj = JSON.stringify(obj);
    return JSON.parse(strObj);

}

function makeId(length = 11) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}