import express from "express";
import findAllPost from "./controllers/findAllPost";
import findAPost from "./controllers/findAPost";
import updateAPost from "./controllers/updateAPost";
import delAPost from "./controllers/delAPost";
import findAllComments from "./controllers/findAllComments";
import createPost from "./controllers/createPost";
import createAComment from "./controllers/createAComment";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/posts", async (req, res) => {
    res.json(await findAllPost());     
})

app.post("/posts",async (req,res) => {
    res.status(201).json(await createPost(req.body));

})

app.get("/posts/:id", async (req, res) => {
    let {id} = req.params; 

    if (id) {

        await findAPost(id, res);
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

app.delete("/posts/:id",async (req,res) => {
    const {id} = req.params;

    if(id){
        res.status(204).json(await delAPost(id))
    }else{
        res.status(400).json({msg: "Id must not be empty!"})
    }

});

app.get("/comments", async (req,res) => {
    await findAllComments(res)
});

app.post("/comments", async (req, res) => {
    if (req.body) await createAComment(req.body, res)
    else res.status(400).json({msg: "Not found!"})
})


app.listen(3000, () => {
    console.log("Started listening on port 3000");
})

export default app;