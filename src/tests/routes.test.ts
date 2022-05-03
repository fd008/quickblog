import {describe, it, expect} from "vitest";
import request from "supertest";
import app from "../app";

const postData = {
    id: 3,
    slug: "third-blog-slug",
    title: "third blog title",
    author: "John Doe",
    content: "<p>Great post! Keep it up! </p>"
};



describe('Post route ', () => {
    it('test get /posts', async () => {
        const res = await request(app).get("/posts");

        expect(res.statusCode).toEqual(200)
        //expect(res.body).toHaveLength(2)
        expect(res.body).toBeTruthy();
        expect(res.body[0]).toMatchObject({id:2})
        //expect(res.body[1]).toMatchObject({id:3})
    })

    it('test post /posts', async () => {
        const res = await request(app).post("/posts").send(postData)

        expect(res.statusCode).toEqual(201);

    })

    it('test get /posts/:id', async () => {
        const res = await request(app).get("/posts/3");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeTruthy();
        expect(res.body).toMatchObject({id: 3})
    })

    it('test put /posts/:id', async () => {
        const data = {title: "new title"};
        const res = await request(app).put("/posts/3")
                    .send({data: data});
                    
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeTruthy();
        expect(res.body).toMatchObject(data)

    })

    it('test delete /posts/:id ', async () => {
        const res = await request(app).delete("/posts/3");

        expect(res.statusCode).toEqual(204);

        const res1 = await request(app).get("/posts/3").expect(404);

        expect(res1.body).toBeFalsy();
        expect(res1.body).toBeNull();

        expect(res1.statusCode).toEqual(404);


    })

    it('test get /comments ',async () => {
        const res = await request(app).get("/comments");

        expect(res.statusCode).toEqual(200);

        expect(res.body).toBeTruthy()
    })

    it('test post /comments ', async () => {
        // const post = await request(app).post("/posts").send({data: postData});
        // expect(post.statusCode).toEqual(201);
        // expect(post.body).toBeTruthy();

        // console.log("post id ", post.body.id);

        const c1 = await request(app).post("/comments").send({
            id: 6,
            postId: 2,
            author: "Tom",
            content: "This is great! Keep up the great work!"
        });

        expect(c1.statusCode).toEqual(201);
        //expect(c1.body).toBeTruthy();
        expect(c1.body).toMatchObject({id: 6})

        // const c2 = await request(app).post("/comments").send({
        //     postId: post.body.id,
        //     author: "Sheila",
        //     content: "Indeed, another masterpiece! I learned a lot.",
        //     parentId: c1.body.id,
        //     level: 1
        // });

        // expect(c2.statusCode).toEqual(201)
        // expect(c2.body).toBeTruthy();

        // const c3 = await request(app).post("/comments").send({
        //     postId: post.body.id,
        //     author: "John Doe",
        //     content: "I agree with you! ",
        //     parentId: c2.body.id,
        //     level: 2
        // })

        // expect(c3.statusCode).toEqual(201)
    })

    
})