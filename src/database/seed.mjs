import Post from "../models/post";
import Comment from "../models/comment";

export default async () => {
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
        content: "This is a very good post with detailed step by step process! Thanks! ",
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