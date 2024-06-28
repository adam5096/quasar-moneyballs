// currencify
const useCurrencify = (amount) => {
    // format:"+ $ 4,999.99" | "- $ 999.00"
    // 正、負數判斷後加上 + - 符號
    let posNegSymbol = ''
    if (amount > 0) posNegSymbol = '+'
    else if (amount < 0) posNegSymbol = '-'

    // 數值新增金錢符號
    const currencySymbol = '$'
    // 將一數值取絕對值化
    const amountPositive = Math.abs(amount)
    // 貨幣格式化核心邏輯
    const amountFormattd = amountPositive.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })


    return `${posNegSymbol} ${currencySymbol} ${amountFormattd}`
}

export { useCurrencify }
