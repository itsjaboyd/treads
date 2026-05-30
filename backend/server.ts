import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.SERVER_PORT || 3001;

app.listen(port, function (err: Error) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});
