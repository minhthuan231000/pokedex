export const toFirstCharUppercase = name =>
    name.charAt(0).toUpperCase() + name.slice(1);
export const convertHeight = height =>
    parseFloat(height) / 10 + ' m';
export const convertWeight = weight =>
    parseFloat(weight) / 10 + ' kg';