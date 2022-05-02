import prisma from "../prisma";

const data = await prisma.post.findMany()
.then((res) => {
    console.log(res);
    return res;
})
.catch((err) => console.error(err))

export default data;