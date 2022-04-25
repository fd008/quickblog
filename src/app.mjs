import * as path from "path";
import express from "express";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve("../data/data.db")
});


const Post = sequelize.define('post', {
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true, 
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false 
    },

}, {
    freezeTableName: true
})

const Comment = sequelize.define('comment', {
    slug: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    parentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    freezeTableName: true
});


try {
    await sequelize.authenticate();
    console.log("Connection has been made!")
} catch (error) {
    console.error("error ", error);
}




Post.hasMany(Comment);
Comment.belongsTo(Post)


await sequelize.sync({force: true })
    .then(() => console.log("Force synce for development"))
    .catch((err) => console.error(err));




const seedData = async () => {
    await Post.create({
        slug: "first-blog-post",
        title: "post title 1",
        author: "post author name here",
        content: "<h1>Hello, post content! </h1>"
    
    })
    .then((data) => console.info("Post created ==> ", data))
    .catch((err) => {
        console.error("Post create error ==> ", err);
    })
    
    await Comment.bulkCreate([
    {
        slug: "first-blog-post",
        author: "John",
        content: "This is a very good post with detailed step by step process. Thanks! ",
     }, 
     {
        slug: "first-blog-post",
        author: "Adam",
        content: "Great post! Keep it up",
    },
    {
    
        slug: "first-blog-post",
        author: "Vanessa",
        content: "Replying to response of the original comment id of 2",
        parentId: 2,
        level: 1,
    },
    {
    
        slug: "first-blog-post",
        author: "Chad",
        content: "very informative post... looking forward to the next posts..",
        parentId: 2,
        level: 2,
    },
    {
        slug: "first-blog-post",
        author: "Leo",
        content: "Replying to the original comment id of 1 here...",
        parentId: 1,
        level: 1
    },

])
    .then((data) => console.log("Post bulk created ==> ", data))
    .catch((err) => console.error("error found ==> ", err))

    
}

seedData();


app.get("/posts", async (req,res) => {
    await Post.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
})

app.post("/posts", async (req,res) => {
    if (req.body) {
        await Post.bulkCreate([req.body])
        .then((data) => res.json(data))
        .catch((err) => res.json(err))
    } 
    
    else res.json({msg: "req.body must not be empty! "})
});

app.get("/posts/:slug", async (req,res) => {
    const {slug} = req.params;

    if (slug) {
        await Post.findOne({where: {slug}})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    }

    else res.json({msg: "missing slug"})
})

app.put("/posts/:slug", async (req,res) => {
    const slug = req.params.slug;
    
    if (slug && req.body){
        await Post.update(req.body, {where: { slug }})
        .then((data) => res.json(data))
        .catch((err) => res.json(err))
    }

    else res.json({msg: "slug and body both must not be empty! "});
    
})

app.delete("posts/:slug", async (req,res) => {
    const slug = req.params?.slug; 

    if (slug && req.body) {
        await Post.destroy({where: { slug }})
    } 

});

app.get("/comments", async (req,res) => {
    await Comment.findAll(
        {
            order: [
                ['parentId', 'ASC'],
                ['level', 'ASC']
            ],
            raw: true,
            nest: true 
        }
    )
    .then((data) => {
        //@ts-ignore
        if (data) {
            const obj = {};
            //@ts-ignore
            data.forEach(e => obj[e.id] = {...e, replies: []})
            //@ts-ignore
            const replies = [];
            //@ts-ignore
            data.forEach(e => {
                //@ts-ignore
                if (e.parentId) obj[e.parentId].replies.push(obj[e.id])
                //@ts-ignore
                else replies.push(obj[e.id])
            })
            //@ts-ignore
            return replies
        }
        
    })
    .then(data => res.json(data))
    .catch((err) => res.json(err))

});

app.post("/comments", async (req,res) => { 
    if (req.body) {
        //@ts-ignore
        await sequelize.bulkCreate([req.body])
        //@ts-ignore
        .then((data) => res.json(data))
        //@ts-ignore
        .catch((err) => res.json(err));
    }
    else res.json({msg: "Body must not be empty! "})
    
    
})

app.get("/comments/:id", async (req,res) => {
    const id = req.params?.id;

    if(id){
        await Comment.findOne({where: {id}})
        .then((data) => res.json(data))
        .catch(err => res.json(err));
    }else{
        res.json({msg: "missing id"});
    }
    
})

app.put("/comments/:id", async (req,res) => {
    const id = req.params?.id;

    if (id && req.body) {
        await Comment.update(req.body, {where: {id: id}})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    }else{
        res.json({msg: "Either req.body or id is empty! Please fix it first. "})
    }


    
})

app.delete("/comments/:id", async (req,res) => {
    const {id} = req.params;

    if (id) {
        await Comment.destroy({where: { id: id }})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    }else{
        res.json({msg: "id is required!"})
    }
    
})

app.listen(3000, () => {
    console.log("started listening on port 3000");
})


export default app;