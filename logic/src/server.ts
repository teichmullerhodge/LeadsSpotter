import express,  {Response, Request, NextFunction} from 'express';
import cors from 'cors';
import SQL from './connection';
import { hash_password, hash_session } from './secure';
import { HashedALGO } from './declarations';
import { LoginErrors, RegisterErrors } from './declarations';
import { UserData } from './declarations';
import session from "express-session";


declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: any };
    }
}

const app = express();
app.use(
    session({
      secret: "qEas5ns3gxl41G",
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24, sameSite: 'lax'},
    })
);

const port = 8080;
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
   

const auth_midleware = (req: Request, res: Response, next: NextFunction) => {

    console.log(JSON.stringify(req.session));
    console.log(req);


    if (req.session.user) {
      next();
    } else {
      res.status(401).json({ "Message": "Unauthorized" });
    }
};
  

app.get("/chat", auth_midleware, (req: Request, res: Response) => {
        res.status(200).json({ "Message": `Welcome to the chat, ${req.session.user?.username}!` });
});


app.post('/register', async (req: Request, res: Response): Promise<any> => {

    const body = req.body;


    const name = body.Name;
    const email = body.Email;
    const phone = body.Phone;
    const password = body.Password;
    const ploomesId = null; //for now i'm going to ignore this.

    if(!name || !email || !phone || !password) {

        console.log(name);
        console.log(email);
        console.log(phone);
        console.log(password);

        return res.status(400).json({"UserCreated" : false, "Reason" : RegisterErrors.MISSING_FIELDS});
    }

    
    const emailRows = await SQL`SELECT "Email", "Password" 
    FROM public.users
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
        PloomesId: ploomesId


    };
    try {
        
        await SQL` insert into users ${SQL(userPayload, 'Name', 'Email', 'Phone', 'Password', 'PloomesId')}`;
        console.log("Usuário inserido!");
        const uuid: string = await hash_session(`${email}@${password}`)
        req.session.user = { id: uuid, email: userPayload.Email };
        req.session.save();
        console.log("Session created:", req.session.user); 

        return res.status(200).json({"UserCreated" : true});
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

    console.log(JSON.stringify(body, null, 2));


    if(!email || !password) {

        return res.status(400).json({"UserAuthenticated" : false, "Reason" : LoginErrors.MISSING_FIELDS});
    }

    const hashedObject: HashedALGO = await hash_password(password);


    const userPayload = {

        Email: email,
        Password: hashedObject.content,


    };

    
    console.log(JSON.stringify(userPayload, null, 2))
    
    try {

        const rows = await SQL`
        SELECT "Email", "Password" 
        FROM public.users
        WHERE "Email" = ${userPayload!.Email} AND "Password" = ${userPayload.Password}`;

        const userExists = rows.length > 0;

        console.log(userExists);
        if(userExists){
            const uuid: string = await hash_session(`${email}@${password}`)
            req.session.user = { id: uuid, email: userPayload.Email };
            req.session.save();
            console.log("Session created:", req.session.user); // Add a debug log
            return res.status(200).json({"UserAuthenticated" : true})

        }


       return res.status(401).json({"UserAuthenticated" : false, "Reason" : LoginErrors.WRONG_CREDENTIALS});

    }

    catch(e) {
        console
        return res.status(500).json({"UserAuthenticated" : false, "Reason" : e});

    }
});

app.post("/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({"Message" : "Failed to log out", "Reason" : err});
      }
      res.clearCookie("connect.sid"); 
      res.status(200).json({ message: "Logged out successfully!" });
    });
});
  

app.listen(port, () => {
    
    console.log(`Server running on port ${port}`);

  })
  


