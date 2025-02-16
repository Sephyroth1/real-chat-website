import { pg } from "pg";


async function connectDB() {
    const client = new pg.Client({
        connectionString: process.env.Database_Url,
        ssl:false,
    });
    try {
        await client.connect().then(() => {console.log("Database Connected")})       
    } catch (error) {
        console.error("Error: ", error.message);
        throw new Error("Database connection error");
    }
}

function poolConnect() {
    const pool = new pg.Pool({
        connectionString: process.env.Database_Url
    })
    return async (query, params) => { 
        try {
            const result = await pool.query(query, params)
            return result.rows;
        } catch (error) {
            console.error("Error: ", error.message);
            throw new Error("Error Stack: ", error.stack);
        }
    };   
}

module.exports = { connectDB, poolConnect};

