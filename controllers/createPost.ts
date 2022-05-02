import prisma from "../prisma";

export default async ({slug, title, author, content, comments}) => {
    const data = await prisma.post.create({
        data: {
            title,
            author,
            slug,
            content,
            comments
        }
    })
    .then(res => {
        console.log("createPost res ", res)
        return res
    })
    .catch(err => {
        console.error(err);
        return err;
    })

    return data;
}