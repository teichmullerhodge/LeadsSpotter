import postgres from 'postgres';

const SQL = postgres({
    hostname: 'localhost',
    port: 5432,
    database: 'LeadsPicker',
    username: 'postgres',
    password: 'root'
});

export default SQL;
