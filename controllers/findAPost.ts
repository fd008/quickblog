import prisma from "../prisma";


const findAPost = async (id) => {

    const data = await prisma.post.findFirst({where: { id: parseInt(id) }})
    .then(res => res)
    .catch(err => console.error(err))

    return data;
    
}

export default findAPost;