import prisma from "../prisma";

export default async (id) => {
    const data = await prisma.post.delete({where: { id: parseInt(id) }})
    .then((res) => {
        console.log("Post deleted! ", res);
        return res
    })
    .catch((err) => console.error(err))

    return data;
}