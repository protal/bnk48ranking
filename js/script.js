
const DATA_PATH = "https://raw.githubusercontent.com/whs/bnk48json/master/bnk48.json"

const getBNK48 = async () => {
    let result = {}
    try {
        result = await fetch(DATA_PATH)
        result = await result.json()
    } catch (error) {
        
    }
    
    return result
}
const setBNK48 = (BNK48) => {
    let ele = document.getElementById('data')
    ele.textContent = BNK48
}
(async ()=>{
    let BNK48 = await getBNK48()
    setBNK48(BNK48)
    console.log(BNK48)
})()