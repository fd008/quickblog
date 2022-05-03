import prisma from "../src/prisma";

const postData = {
    id: 2,
    slug: "second-blog-post",
    title: "post title 1",
    author: "post author name here",
    content: "<h1>Hello, post content! </h1>"
};

await prisma.post.deleteMany()
.then(res => {
    console.log("post deleted! ");
    return res;
}).catch(err => {
    console.log("Post not deleted!")
    console.error(err);
});

await prisma.comment.deleteMany()
.then(res => {
    console.log("comments deleted! ");
    return res;
}).catch(err => {
    console.log("Comments not deleted!")
    console.error(err);
});

await prisma.post.create({
    data: postData
})
.then(res => {
    console.log("create post res ", res)
})
.catch(err => {
    console.error("Create post error ", err);
})

const commentsData = [
    {   id: 1,
        postId: 2,
        author: "John",
        content: "This is a very good post with detailed step by step process. Thanks! ",
     }, 
     {
        id: 2,
        postId: 2,
        author: "Adam",
        content: "Great post! Keep it up",
    },
    {
        id: 3,
        postId: 2,
        author: "Vanessa",
        content: "Replying to response of the original comment id of 2",
        parentId: 2,
        level: 1,
    },
    {
        id: 4,
        postId: 2,
        author: "Chad",
        content: "very informative post... looking forward to the next posts..",
        parentId: 2,
        level: 2,
    },
    {
        id: 5,
        postId: 2,
        author: "Leo",
        content: "Replying to the original comment id of 1 here...",
        parentId: 1,
        level: 1
    },

];



try {
    commentsData.forEach(async (e,i) => {
        await prisma.comment.create({
            data: e 
        })
        .then(res => {
            console.log("Comment create many res ", res);
            return res;
        })
        .catch(err => {
            console.error(err);
        })
    })
} catch (error) {
    console.error("error found try else seed data ", error);
}