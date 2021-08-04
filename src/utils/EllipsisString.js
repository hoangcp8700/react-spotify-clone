export const ellips = (text) => {
   
    if (text.length > 5) {
        return text.substring(0, 30) + '...';
    }
    return text;
     
}