export const ProductionURLEnv = () => {
    let redirect_uri
    if (process.env.NODE_ENV !== 'production') {
        redirect_uri = `${process.env.REACT_APP_REDIRECT_URI}`
    }else{
        redirect_uri = `${process.env.REACT_APP_API_SERVER_PRODUCTION}`
    }
    return redirect_uri
}