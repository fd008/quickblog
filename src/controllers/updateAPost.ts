import prisma from "../prisma";

export default async (id, data) => {
    const res = await prisma.post.update({
        where: {id: parseInt(id)},
        data
    })
    .then(res => {
        console.log("updatePost ", res);
        return res;
    })
    .catch((err) => {
        console.error(err);
        return err;
    })

    return res;
}