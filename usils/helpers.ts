const getFormateDate = (date) => {
    const curDate = new Date(date);
    const months = ['Jan', 'Feb', 'Mach', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep','Oct', 'Nov'];
    return months[curDate.getMonth()] + ' ' + (curDate.getDate()) + 'th';
};

export {getFormateDate};