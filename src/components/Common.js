export function checkToken(history) {
    const actualDate = new Date()
    const token = localStorage.getItem('token')
    let tokenDate = localStorage.getItem('tokenDate')
    // return console.log(tokenDate, token)
    if (!token || !tokenDate) {
        return history.push('/login') 
    } else {
        tokenDate = new Date(tokenDate)
        tokenDate = new Date(tokenDate.setMinutes(tokenDate.getMinutes() + 15))
        if (actualDate < tokenDate) {
            return true
        }
        localStorage.clear()
        return history.push('/login') 
    }

    
    // if (token && tokenDate <)
}