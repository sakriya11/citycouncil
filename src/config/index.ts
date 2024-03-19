import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    app:{
        name:process.env.NAME,
        host:process.env.HOST,
        port:process.env.PORT,
        url:process.env.URL||"http:/localhost:3000",
    },
    db:{
        mongoUrl:process.env.MONGO_URL
    }
}

export default config;