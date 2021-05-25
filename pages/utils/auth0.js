import { initAuth0 } from '@auth0/nextjs-auth0'

export default initAuth0 ({
    baseURL: 'http://localhost:3000',
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    secret: process.env.COOKIE_SECRET,
    httpTimeout: 5000,
    clockTolerance: 10000,
    /* storeIdToken: false,
    storeAccessToken: false,
    storeRepreshToken: false, */

    authorizationParams: {
        scope: ' openid profile'
    },
    routes: {
        callback: '/api/callback',
        postLogoutRedirect: process.env.POST_LOGOUT_REDIRECT_URI,
    },
    session: {
        rollingDuration: 60 * 60 * 8,
        absoluteDuration: 60 * 60 * 24 * 7
      }
})


