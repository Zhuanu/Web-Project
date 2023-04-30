const displayDate = () => {
    const date = new Date();
    const s = date.toDateString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const dateTimeString = `${s} ${hours}:${minutes}`;
    return dateTimeString;
}

module.exports = {displayDate}