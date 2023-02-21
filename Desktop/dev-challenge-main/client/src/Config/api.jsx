let apiUrl

if (process.env.NODE_ENV === 'development') {
    apiUrl = `http://localhost:3000`
}
else {
    apiUrl = `https://dev-challenge-production.up.railway.app`
}

export default apiUrl