export function checkToken(history) {
    const actualDate = new Date()
    const token = localStorage.getItem('token')
    let tokenDate = localStorage.getItem('tokenDate')
    if (!token || !tokenDate) {
        return history.push('/login') 
    } else {
        tokenDate = new Date(tokenDate)
        tokenDate = new Date(tokenDate.setMinutes(tokenDate.getMinutes() + 1500))
        if (actualDate < tokenDate) {
            return true
        }
        localStorage.clear()
        return history.push('/login') 
    }
}

export async function checkStatus(res) {
    if (res.ok) {
        return res;
    }
    res = await res.json()
    // return <div> SIEMANO BLAD </div>
    // return {
    //     status: false,
    //     message: res.message
    // }
}

export function uploadFile(file) {
    return fetch('http://localhost:8002/api/projects/')
}