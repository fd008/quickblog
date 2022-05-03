import prisma from "../prisma";

export default async (res) => {
    const comments = await prisma.comment.findMany({orderBy: 
        [   {
                parentId: 'asc'
            }, 
            {
                level: 'asc'
            }
        ]}
    )
    .then(data => {
        
        if (data) {
            const obj = {};
            
            data.forEach(e => obj[e.id] = {...e, replies: []})

            const replies = [];

            data.forEach((e,i) => {
                if(e.parentId) {
                    obj[e.parentId].replies.push(obj[e.id])
                }else{
                    replies.push(obj[e.id]);
                }
            })
            return replies;
        }
    })
    .then(data => res.json(data))
    .catch(err => {
        console.error(err)
        res.status(400).json(err);
    });

    return comments;
}
