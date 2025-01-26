import {SignJWT} from 'jose';
interface TokenPayload {
    email: string;
    id: string;
    role: string;
}
export async function sign(payload: TokenPayload, secret: string): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60* 60; 

    return new SignJWT({payload})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}   