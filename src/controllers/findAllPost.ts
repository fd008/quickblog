import prisma from "../prisma";

export default async () => await prisma.post.findMany()
.then((res) => {
    console.log(res);
    return res;
})
.catch((err) => console.error(err))
