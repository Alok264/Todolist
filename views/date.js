// module.exports = getDate; in case of single function in the module// helps in using getdate function when exporting.
let today = new Date();
// module.exports.getDate = getDate; // for multiple function in module.
/*Another method of declarstion a function in module*/module.exports.getDate = function (){
    const dateformat = {
        day : 'numeric', // numeric , 2-digit      
        weekday: 'long', // short, long, narrow
        month: 'long', // 2-digit, narrow, short, long, numeric
        year: 'numeric',  // numeric, 2-digit
        /* hour: 'numeric' ,// 2-digit
        minute: 'numeric', // 2-digit
        second: 'numeric', // 2-digit */
        // Dateobject.toLocalDateString("language", format);
    }
    return today.toLocaleDateString("en-IN", dateformat);
}
// module.exports.getDay = getDay;  // both function name and exports.getDay must be same
// we can also write only exports.getDay instead of  module.exports.getDay
 module.exports.getDay = function (){
    const dateformat = {
        // day : 'numeric', // numeric , 2-digit      
        weekday: 'long', // short, long, narrow
        // month: 'long', // 2-digit, narrow, short, long, numeric
        // year: 'numeric',  // numeric, 2-digit
        /* hour: 'numeric' ,// 2-digit
        minute: 'numeric', // 2-digit
        second: 'numeric', // 2-digit */
        // Dateobject.toLocalDateString("language", format);
    }
    return today.toLocaleDateString("en-IN", dateformat);
}
