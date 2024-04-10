namespace NodeJS {
        interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT: number;
        DB_HOST: string;
        DB_PASS: string;
        DB_CREDITS: string;
        JWT_SECRET: string;
        COOKIE_SECRET: string;
        EMAIL_SECRET: string;
        EMAIL_USER?: string;
        EMAIL_MAIN_URI: string;
    }
}