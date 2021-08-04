import { authorizationToken } from "features/Login/authencation"

export const GetDataSpotify = async (url, method = "GET") => {
    const authToken = localStorage.getItem('jwt') 
    const link =` https://api.spotify.com/v1/${url}`
    try{
        const res = await fetch(link, {
            method: method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        })
        const data = await res.json()
        if(data?.error){
            if(data?.error?.message?.search("expired") !== -1){
                const refresh = await getRefreshToken(localStorage.getItem('rftk'))
                localStorage.setItem('jwt',refresh.access_token)
                
                // invalid token refresh
                if(refresh?.error_description?.search("Invalid") !== -1){
                    localStorage.removeItem('jwt')
                    localStorage.removeItem('rftk')
                    // alert('Tkrf not match, please login again!!')
                    window.location = '/login'
                }
            }
            // invalid token
            if(data?.error?.message?.search("Invalid")  !== -1){
                localStorage.removeItem('jwt')
                localStorage.removeItem('rftk')
                alert('Token not match, please login again!!')
                window.location = '/login'
            }
        }
        return data
    }catch(error) {
        console.log('err GetDataSpotify', error)
    }
}

const getRefreshToken = async (refresh_token) => {
    const payload =  await `grant_type=refresh_token&refresh_token=${refresh_token}`
    const result = await authorizationToken(payload)
    return result
}
