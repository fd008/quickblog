import prisma from "../prisma";

export default async () => {
    await prisma.comment.findMany()
    .then(res => res)
    .catch(err => console.error(err));
}
