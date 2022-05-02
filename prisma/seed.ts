import prisma from "../prisma";

await prisma.post.create({
    data: {
        slug: "second-blog-post",
        title: "post title 1",
        author: "post author name here",
        content: "<h1>Hello, post content! </h1>"
    }
})
.then(res => {
    console.log("create post res ", res)
})
.catch(err => {
    console.error("Create post error ", err);
})

try {
    await prisma.comment.createMany({
        data: [
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
        
        ]
    })
    .then(res => {
        console.log("Comment create many res ", res);
        return res;
    })
    .catch(err => {
        console.error(err);
    })
} catch (error) {
    console.error("error found try else ", error);
}