function getDate() {
    let today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var myday = today.toLocaleDateString("en-US", options);

    return myday
}

module.exports = getDate;