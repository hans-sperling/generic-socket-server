module.exports = (function timeHelper() {

    // ---------------------------------------------------------------------------------------------------- Dependencies

    // ...

    // ----------------------------------------------------------------------------------------------------- Preferences

    // ...

    // -------------------------------------------------------------------------------------------------- Module methods

    function getPublicApi() {
        return {
            getDateString     : getDateString,
            getDateTimeString : getDateTimeString,
            getTimeString     : getTimeString
        };
    }

    // -------------------------------------------------------------------------------------------------- Public methods

    /**
     * Returns the current date as readable string with given separator.
     * Default separator is '-'
     *
     * @param   {String} separator
     * @returns {String}
     */
    function getDateString(separator) {
        var d          = new Date(),
            dateString = [];

        separator = separator || '-';

        dateString.push(d.getFullYear());
        dateString.push(addZeros(d.getMonth(), 10));
        dateString.push(addZeros(d.getDate(),  10));

        return dateString.join(separator);
    }


    /**
     * Returns the current day time as readable string with given separator.
     * Default separator is ':'
     *
     * @param   {String} separator
     * @returns {String}
     */
    function getTimeString(separator) {
        var d          = new Date(),
            timeString = [];

        separator = separator || ':';

        timeString.push(addZeros(d.getHours(),   10));
        timeString.push(addZeros(d.getMinutes(), 10));
        timeString.push(addZeros(d.getSeconds(), 10));
        timeString.push(addZeros(d.getMilliseconds(), 1000));

        return timeString.join(separator);
    }


    /**
     * Returns the current date and day time as readable string with given separator.
     * Default separator is ' '
     *
     * @param   {String} separator
     * @param   {String} timeSeparator
     * @param   {String} dateSeparator
     * @returns {String}
     */
    function getDateTimeString(separator, timeSeparator, dateSeparator) {
        var dateTimeString = [];

        separator = separator || ' ';

        dateTimeString.push(getDateString(dateSeparator));
        dateTimeString.push(getTimeString(timeSeparator));

        return dateTimeString.join(separator);
    }

    // -------------------------------------------------------------------------------------------------- Helper methods

    /**
     * Fills zeros to the number of the first parameter to reach the amount of chars the second number has.
     *
     * @param {Number} i          - Number to be filled with zeros
     * @param {Number} fillNumber - Number to set the max amount
     * @returns {string}
     */
    function addZeros(i, fillNumber) {
        var max = Math.max(i, fillNumber).toString(),
            min = Math.min(i, fillNumber).toString(),
            dif = max.length - min.length,
            s   = '';

        while (dif--) { s += '0'; }
        s += i;

        return s;
    }

    // --------------------------------------------------------------------------------------------------- Init / Return

    return getPublicApi();
})();
