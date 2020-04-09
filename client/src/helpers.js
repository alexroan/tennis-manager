const getColourClass = (value) => {
    let colourClass = "badge badge-pill badge-danger";
    if (value >= 50 && value < 100) {
        colourClass = "badge badge-pill badge-warning";
    }
    else if (value >= 100 && value < 150) {
        colourClass = "badge badge-pill badge-primary";
    }
    else if (value >= 150 && value < 200) {
        colourClass = "badge badge-pill badge-info";
    }
    else if (value >= 200) {
        colourClass = "badge badge-pill badge-success";
    }
    return colourClass;
}

export default getColourClass;