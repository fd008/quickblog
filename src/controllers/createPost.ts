import prisma from "../prisma";

export default async (data) => {
    const ans = await prisma.post.create({
        data
    })
    .then(res => {
        console.log("createPost res ", res)
        return res
    })
    .catch(err => {
        console.error(err);
        return err;
    })

    return ans;
}