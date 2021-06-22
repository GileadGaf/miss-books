export const utilitiesService = {
    debounce,
    makeId
}

function debounce(func, wait = 2000) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            console.log('Go search!');
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

function makeId(length = 11) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}