export const FormatDuration = (time, type = false) => {
    if(type){
        let ms = new Date(time);
        let hh = ms.getUTCHours();
        let mm = ms.getUTCMinutes();
        let ss = ms.getSeconds();

        if (hh > 0) {hh = `${hh} giờ `} else {hh = ""}
        if (mm > 0) {mm = `${mm} phút `} else {mm = ""}
        if (ss > 0) {ss = `${ss} giây `} else {ss = ""}

        return hh + mm + (hh ? '' : ss) 
    }
    // seconds
    if(time < 1000) {
        let sec = Math.floor(time)
        let mm
        if(sec/60 > 0){
            mm = Math.floor(sec/60)
            sec = (sec % 60).toFixed(0)
        }else{ mm = 0}
        return `${mm}:${sec < 10 ? '0' : ''}${sec}`
    }
    const min = Math.floor( time / 60000)
    const sec = ( (time % 60000) / 1000).toFixed(0)
    return `${min}:${sec < 10 ? '0' : ''}${sec} `;

}