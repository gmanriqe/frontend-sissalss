const exceptThisSymbols = [
    '',
    '-',
    '+',
    'e',
    'E',
    '.',
    ',',
    '^',
    '`',
    '~',
];

/*
 * Menu options groups
 */
export const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
    }, {}); // empty object is the initial value for result object
};

/*
 * Valid only number
 */
export const validOnlyNumber = (evt) => {
    if (exceptThisSymbols.includes(evt.key)) {
        evt.preventDefault()
    }
}

/*
 * Valid email
 */
export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Enable/Disable boton de busqueda
 */
export const enableSubmit = (elemHTML) => {
    // const $btnSearch = document.getElementById('btn-search')
    elemHTML.classList.remove('btn-loading')
    elemHTML.removeAttribute('disabled')
}
export const disableSubmit = (elemHTML) => {
    // const elemHTML = document.getElementById('btn-search')
    elemHTML.classList.add('btn-loading')
    elemHTML.setAttribute('disabled', 'disabled')
}