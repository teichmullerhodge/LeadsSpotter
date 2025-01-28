import { HashedALGO } from './declarations';
import crypto from 'crypto';



export async function hash_password(password: string): Promise<HashedALGO> {

    const hashObject: HashedALGO = {content: ""}
    hashObject.content = crypto.createHash('sha256').update(password).digest('hex');
    return hashObject;

}

export async function hash_session(userInfo: string): Promise<string> {
    const sessionObject: HashedALGO = {content: ""};
    sessionObject.content = crypto.createHash("sha256").update(userInfo).digest('hex');
    return sessionObject.content
}