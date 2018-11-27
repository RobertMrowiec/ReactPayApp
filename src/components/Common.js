export function checkToken(history) {
    const actualDate = new Date()
    const token = localStorage.getItem('token')
    let tokenDate = localStorage.getItem('tokenDate')
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
}

export function checkStatus(res) {
    if (res.ok) {
        return res;
    } else {
        throw Error(res.statusText);
    }
}

export function uploadFile(file) {
    return fetch('http://localhost:8002/api/projects/')
}