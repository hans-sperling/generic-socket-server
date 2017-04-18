module.exports = (function _dummy() {

    // ---------------------------------------------------------------------------------------------------- Dependencies

    // ...

    // ----------------------------------------------------------------------------------------------------- Preferences

    // ...

    // -------------------------------------------------------------------------------------------------- Module methods

    function getPublicApi() {
        return {
            getFillChar : getFillChar
        };
    }

    // -------------------------------------------------------------------------------------------------- Public methods

    /**
     * Returns the given char as often as specified in amount
     *
     * @param   {String} char
     * @param   {Number} amount
     * @returns {String}
     */
    function getFillChar(char, amount) {
        var i = 0, str = '';
        char = char || ''; // Fallback

        for (; i < amount; i++) { str += char; }

        return str;
    }

    // ------------------------------------------------------------------------------------------------- Private methods

    // ...

    // -------------------------------------------------------------------------------------------------- Helper methods

    // ...

    // --------------------------------------------------------------------------------------------------- Init / Return

    return getPublicApi();
})();
