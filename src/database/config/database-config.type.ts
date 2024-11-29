export type DatabaseConfig = {
    host?: string;
    port?: number;
    password?: string;
    name?: string;
    username?: string;
    synchronize?: boolean;
    schema?:string;
}