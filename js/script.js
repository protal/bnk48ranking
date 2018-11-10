
const DATA_PATH = "https://raw.githubusercontent.com/whs/bnk48json/master/bnk48.json"
const access_tokens = ["1449434328680756|MzeTAes8c6ljUMGomsxKs_BEDv8","337516366444437|4laT9FIIchMvAqnU75Zz2ICbmc0","1425148987779332|WIj0SWF_5FX8QmhcUeCdYPxl-1Q"]
let BNK48 
const getFanpageLike = async (fb_id) => {
    let result 
    let pagelike = 0
    let access_token = access_tokens[Math.floor(Math.random()*access_tokens.length)]
    let url = `https://graph.facebook.com/${fb_id}?fields=fan_count&access_token=${access_token}`
    try {
        result = await fetch(url)
        result = await result.json()
    } catch (error) {
        console.log(error)
    }
    if(result.fan_count)
        pagelike = result.fan_count
    return pagelike
}
const sortByFanPageLike = (obj) => {
    return obj.sort((a, b)=>{
        if(a.facebook_like < b.facebook_like)
            return 1
        else if(a.facebook_like > b.facebook_like)
            return -1
        return 0
    })
}
const loopGetData = async (bnk48) =>{
    bnk48.forEach(async (e, i) => {
        bnk48[i].facebook_like = await getFanpageLike(e.facebook)
        sortByFanPageLike(BNK48)
        render()
    })
}
const toggleInfo = (id) => {
    let ele = document.getElementById(id)
    if(ele.classList.contains('is-hidden')){
        ele.classList.remove('is-hidden')
    }else{
        ele.classList.add('is-hidden')
    }
}
const convertToHtml = (bnk48) => {
    let html = ""
    bnk48.forEach((e,i)=> {
        let rank = i + 1
        let size = (rank === 1) ? 'is-size-1' : (rank === 2 ||  rank === 3) ?  'is-size-2' : 'is-size-3'
        let pageLike = e.facebook_like ? e.facebook_like : 0
        html += `<tr onclick="toggleInfo('${e.facebook}')">`
        html += `<td class="${size}">`
        html += `${pageLike}`
        html += `</td>`
        html += `<td >`
        html += `<img src="http://graph.facebook.com/${e.facebook}/picture?type=large&width=100&height=100" width="100px" height="100px">`
        html += `</td>`
        html += `<td class="">`
        html += `<p class="is-size-4">${e.english_first_name} ${e.english_last_name}</p>`
        html += `<p class="is-size-5">${e.thai_first_name} ${e.thai_last_name}</p>`
        html += `</td>`
        html += `<td class="${size}">`
        html += `${rank}`
        html += `</td>`
        html += `</tr>`
        html += `<tr>`
        html += `<td colspan="4" class="is-hidden" id="${e.facebook}">`
        html += `<p>วันเกิด: ${e.birthday}</p>`
        html += `<p>กรุ๊ปเลือด: ${e.blood_type}</p>`
        html += `<p>ส่วนสูง: ${e.height}</p>`
        html += `<p>งานอดิเรก: ${e.hobby}</p>`
        html += `<p>fanpage: <a href="http://facebook.com/${e.facebook}" target="_BLANK">${e.facebook}</a></p>`
        html += `</td>`
        html += `</tr>`
    })
    return html
}
const getBNK48 = async () => {
    let result = {}
    try {
        result = await fetch(DATA_PATH)
        result = await result.json()
    } catch (error) {
        console.log(error)
    }
    console.log(result)
    return result
}
const setBNK48 = (html) => {
    let ele = document.getElementById('data')
    ele.innerHTML = html
}
const render = () =>{
    let BNK48Html = convertToHtml(BNK48)
    setBNK48(BNK48Html)
}

(async ()=>{
    BNK48 = await getBNK48()
    render()
    await loopGetData(BNK48)
})()