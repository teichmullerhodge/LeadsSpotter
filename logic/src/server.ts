import express,  {Response, Request} from 'express';
import cors from 'cors';
import SQL from './connection';
import { hash_key, hash_password, validate } from './secure';
import { AuthErrors, HashedALGO } from './declarations';
import { LoginErrors, RegisterErrors } from './declarations';
import session from "express-session";


declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: any };
    }
}

const app = express();
const port = 8080;

app.use(
    session({
      secret: "qEas5ns3gxl41G",
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24, sameSite: 'lax'},
    })
);

app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());
   
app.get('/auth', async (req: Request, res: Response): Promise<any> => {

    const userKey = req.headers.authorization?.split('Bearer ')[1];
    if(!userKey){

        return res.status(401).json({"UserAuthenticated" : false, "Reason": AuthErrors.MISSING_USER_KEY})

    }

    const isValid = await validate(userKey);
    if(isValid){
        return res.status(200).json({"UserAuthenticated" : true, "UserKey" : userKey});
    }

    return res.status(401).json({"UserAuthenticated" : false, "Reason": AuthErrors.WRONG_USER_KEY})

});


app.post('/register', async (req: Request, res: Response): Promise<any> => {

    const body = req.body;
    const name = body.Name;
    const email = body.Email;
    const phone = body.Phone;
    const password = body.Password;
    const ploomesId = null; //for now i'm going to ignore this.

    if(!name || !email || !phone || !password) {

        return res.status(400).json({"UserCreated" : false, "Reason" : RegisterErrors.MISSING_FIELDS});
    }

    
    const emailRows = await SQL`SELECT "Email" 
    FROM public."Users"
    WHERE "Email" = ${email}`;
    
    const emailExists = emailRows.length > 0;
    if(emailExists){
        //409 for conflict
        return res.status(409).json({"UserCreated" : false, "Reason" : RegisterErrors.EMAIL_ALREADY_EXISTS})
    }

    
    const hashedObject: HashedALGO = await hash_password(password);


    const userPayload = {

        Name: name,
        Email: email,
        Phone: phone,
        Password: hashedObject.content,
        PloomesId: ploomesId,
        CreatedAt: new Date(),
        UserKey: await hash_key(`${email}@${hashedObject.content}`),


    };
    try {
        
        await SQL` insert into "Users" ${SQL(userPayload, 'Name', 'Email', 'Phone', 'Password', 'PloomesId', 'CreatedAt', 'UserKey')}`;
        return res.status(200).json({
            "UserCreated": true,
            "UserKey": userPayload.UserKey  
        });

    }

    catch(e) {
        console.error(e)
        return res.status(500).json({"UserCreated" : false, "Reason" : RegisterErrors.SERVER_ERROR});

    }
});


app.post('/login', async (req: Request, res: Response): Promise<any> => {

    const body = req.body;
    const email = body.Email;
    const password = body.Password;



    if(!email || !password) {

        return res.status(400).json({"UserAuthenticated" : false, "Reason" : LoginErrors.MISSING_FIELDS});
    }

    const hashedObject: HashedALGO = await hash_password(password);


    const userPayload = {

        Email: email,
        Password: hashedObject.content,

    };

    
    try {

        const rows = await SQL`
        SELECT "Email", "Password" 
        FROM public."Users"
        WHERE "Email" = ${userPayload!.Email} AND "Password" = ${userPayload.Password}`;

        const userExists = rows.length > 0;

        if(userExists){
            const userKey = await hash_key(`${userPayload.Email}@${userPayload.Password}`)
            return res.status(200).json({
                "UserAuthenticated": true,
                "UserKey": userKey  
            });

        }


       return res.status(401).json({"UserAuthenticated" : false, "Reason" : LoginErrors.WRONG_CREDENTIALS});

    }

    catch(e) {
        return res.status(500).json({"UserAuthenticated" : false, "Reason" : e});

    }
});

  

app.listen(port, () => {
    
    console.log(`Server running on port ${port}`);

  })
  


