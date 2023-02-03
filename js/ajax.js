/**
 * ajax request data from endpoint
 * 
 * @param {String} url endpoint to request
 * @param {Function} func callback function
 */
function _ajaxrequest(url, func, err) {
    fetch(url)
        .then(function(response) {
            if (response.status != 200) {
                return false;
            }
            return response.json();
        })
        .then(func)
        .catch(err);
}
