import prisma from "../prisma";


const findAPost = async (id, res) => {

    const data = await prisma.post.findFirst({where: { id: parseInt(id) }})
    .then(post => {
        if(post) res.json(post);
        else res.status(404).json(post);
    })
    .catch(err => {
        console.error(err)
        res.status(400).json(err);
    })

    return data;
    
}

export default findAPost;