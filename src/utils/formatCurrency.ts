export const formatCurrencyPt = (currency: any) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(currency)
}
export const formatCurrencyEn = (currency: number) => {
    return new Intl.NumberFormat('en-US').format(currency)
}
