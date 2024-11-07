function isValidHex(color: string) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}

// Function to get text color based on background luminance
export function getTextColor(color: string) {
    if(color === '#fff' || color === '#ffffff') return '#000';
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance > 140 ? '#000' : '#fff';
}
