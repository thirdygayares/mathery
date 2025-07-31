import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"

interface JwtPayload { exp?: number }

/**
 * Save a JWT in a cookie that expires when the token expires.
 */
export function setTokenCookie(token: string) {
    // decode token payload
    const { exp } = jwtDecode<JwtPayload>(token)
    if (exp) {
        // `exp` is in seconds; JS Date wants ms
        const expires = new Date(exp * 1000)
        // js-cookie will format this date in UTC for the cookie
        Cookies.set("token", token, { expires })
    } else {
        // fallback: no exp claim
        Cookies.set("token", token)
    }
}
