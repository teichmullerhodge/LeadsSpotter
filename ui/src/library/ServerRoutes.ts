export abstract class ServerRoutes {

    static baseURL: string = import.meta.env.VITE_SERVER_URL;
    static registerURL: String = this.baseURL + '/register';
    static loginURL: string = this.baseURL + '/login';
    static chatURL: string = this.baseURL + '/chat';
    static authURL: string = this.baseURL + '/auth';

    


}