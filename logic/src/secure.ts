import { HashedALGO } from './declarations';
import crypto from 'crypto';
import SQL from './connection';

export async function hash_password(password: string): Promise<HashedALGO> {

    const hashObject: HashedALGO = {content: ""}
    hashObject.content = crypto.createHash('sha256').update(password).digest('hex');
    return hashObject;

}

export async function hash_key(userInfo: string): Promise<string> {
    const sessionObject: HashedALGO = {content: ""};
    sessionObject.content = crypto.createHash("sha256").update(userInfo).digest('hex');
    return sessionObject.content
}


/**
 * Function used to verify if the api key exists 
 */
export async function validate(userKey: string): Promise<boolean> {

    const validationQueryRows = await SQL `

        SELECT "UserKey"
	    FROM public."Users"
        WHERE "UserKey" = ${userKey}
        ;    
    `
    return validationQueryRows.length > 0;
}