function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function formatDate(date) {
    return ("0" + date.getDate()).slice(-2) + "/"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "/" + date.getFullYear();
}

function formatTimeLeft(date) {
    const now = new Date().getTime();

    // Find the distance between now an the count down date
    const distance = date - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    var text = "";

    if (days > 0) {
        text += days + " days ";
    }

    text += hours + "H "
        + minutes + "M";

    if (days < 1 && hours < 1 && minutes < 1) {
        text = 0;
    }

    return text;
}