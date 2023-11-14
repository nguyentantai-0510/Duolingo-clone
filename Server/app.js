require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const initialize = require("./src/utils/initialize");
const port = process.env.PORT;
const database = require("./src/utils/database");
const mainRouter = require("./src/routes/main_route");

//set up the Server middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());
app.use("/api/questions", mainRouter.questions);
app.use("/api/levels", mainRouter.levels);
app.use("/api/users", mainRouter.users);
app.use("/api/types", mainRouter.types);
app.use("/api/packages", mainRouter.packages);
app.use("/api/blog", mainRouter.blog);
app.use("/api/momo", mainRouter.momo);
app.use("/api/admin", mainRouter.admin);
initialize().then(()=>{
    database();
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })
}).catch(ex=>{
    console.log(ex.message);
});
