import express from "express";
import findAllPost from "./controllers/findAllPost";
import findAPost from "./controllers/findAPost";
import updateAPost from "./controllers/updateAPost";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/posts", async (req, res) => {
    res.json(findAllPost);     
})

app.get("/posts/:id", async (req, res) => {
    let {id} = req.params; 

    if (id) {

        res.json(await findAPost(id));
    }else{
        res.status(400).json({msg: "Id must not be empty!"});
    }
});

app.put("/posts/:id",async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if (id && data){
        res.json(await updateAPost(id, data));
    }else{
        res.status(400).json({msg: "Id must not be empty!"})
    }
})


app.listen(3000, () => {
    console.log("Started listening on port 3000");
})

export default app;