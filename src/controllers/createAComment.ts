import prisma from "../prisma";

const createComment = async (data, res) => {
    await prisma.comment.create({data})
    .then(cdata => {
        console.log("createAComment created ", cdata);
        return res.status(201).json(cdata)
    })
    .catch(err => {
        console.error(err)
        return res.status(400).json(err);
    })  
} 

export default createComment;