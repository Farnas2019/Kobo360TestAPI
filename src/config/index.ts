import dotenv from "dotenv";

dotenv.config();

//Mongo stuffs
const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const MONGO_HOST = process.env.DB_URI || "mongodb://localhost:27017/kobo360";
const MONGO = { host: MONGO_HOST, options: MONGO_OPTIONS };

// Server stuffs
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const PORT = process.env.PORT || 8001;
const SERVER = { hostname: SERVER_HOSTNAME, port: PORT };

const config = { server: SERVER, mongo: MONGO};

export default config;
