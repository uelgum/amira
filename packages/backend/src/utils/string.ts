const normalizeString = (input: string) => {
    return input.split(/ +/g)
        .map((section) => section[0].toUpperCase() + section.slice(1).toLowerCase())
        .join(" ");
};

export {
    normalizeString
};