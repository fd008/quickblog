import {describe, it, expect} from "vitest";
import request from "supertest";
import app from "../app";



describe('Post route ', () => {
    it('test get /posts', async () => {
        const res = await request(app).get("/posts");

        expect(res.statusCode).toEqual(200)
        //expect(res.body).toHaveLength(2)
        expect(res.body).toBeTruthy();
        expect(res.body[0]).toMatchObject({id:2})
        //expect(res.body[1]).toMatchObject({id:3})
    })

    it('test post /posts',async () => {
        const res = await request(app).post("/posts").send({
            id: 3,
            slug: "third-blog-slug",
            title: "third blog title",
            author: "John Doe",
            content: "<p>Great post! Keep it up! </p>"
        })

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

    
})