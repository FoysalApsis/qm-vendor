// require('dotenv').config()

export const config = {
    clientId: process.env.REACT_APP_AZURE_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AZURE_APP_REDIRECT_URI,
    scopes: [
        'user.read'
    ]
};