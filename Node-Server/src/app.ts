import express from 'express';
import * as http from 'http'
import router from './router';
import cors from "cors"
import ServerGlobal from './server-global';

const app = express();
const port = 4000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router)

const server = http.createServer(app)
server.listen(port)
ServerGlobal.getInstance();

ServerGlobal.getInstance().logger.info(`Server is running on port ${port}`)
// try {
//     mongoose.connect(`mongodb://localhost:27017/shopdb`).then(() => {
//         console.log("established mongo db connection")
//         app.listen(port, () => {
//             console.log(`Express is listening at http://localhost:${port}`);
//         });
//     })
// } catch (error) {
//     console.log(error)
// }
