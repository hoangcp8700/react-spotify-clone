export const FormatNumberComma = (x) => {
    if(!x) return
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}