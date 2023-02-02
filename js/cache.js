const CACHE_PREFIX = "rls";

/**
 * Check if there is data available in cache
 * 
 * @param {string} key cached data id
 * @returns {boolean} is there a valid cached data
 */
function isDataInCache(key) {
    const interval = 10; // in minutes
    const date = localStorage.getItem((CACHE_PREFIX + '_date_' + key));
    
    if(date != null && date != "") {
        const current_date = new Date();
        const request_date = new Date((new Date()).getTime() + interval * 60000);

        if(request_date > current_date) {
            return true;
        }
    }

    return false;
}

/**
 * Get data from cache
 * 
 * @param {string} key cached data id
 * @returns {Object} ajax response saved in cache
 */
function getCachedData(key) {
    return JSON.parse(localStorage.getItem((CACHE_PREFIX + '_data_' + key)));
}

/**
 * Set data into cache
 * 
 * @param {string} key cached data id
 * @param {Object} data ajax response to save in cache
 */
function updateCachedData(key, data) {
    localStorage.setItem((CACHE_PREFIX + "_date_" + key), (new Date()));
    localStorage.setItem((CACHE_PREFIX + "_data_" + key), JSON.stringify(data));
}
