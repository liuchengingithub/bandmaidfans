export default {
    dateFormatter(timestamp) {
        var format = ''
        const now = new Date()
        format += timestamp.slice(0, 4) === now.getFullYear().toString() ? '' : timestamp.slice(0, 4) + '.'
        format += timestamp[5] === '0' ? timestamp[6] : timestamp.slice(5, 7)
        format += '.'
        format += timestamp[8] === '0' ? timestamp[9] : timestamp.slice(8, 10)
        return format
    },
    viewsFomatter(views){
        if(views < 10000){
            return views
        }else if(views < 100000000){
            return Math.floor(views/10000) + "万"
        }else {
            return Math.floor(views/100000000) + "億"
        }
    },
    test: 0
}