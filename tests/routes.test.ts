import {describe, it, expect} from "vitest";
import request from "supertest";
import app from "../app";



describe('Post route ', () => {
    it('test get /posts', async () => {
        const res = await request(app).get("/posts");

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveLength(2)
        expect(res.body).toBeTruthy();
        expect(res.body[0]).toContain({id:1})
        expect(res.body[1]).toContain({id:2})
    })

    // it('test post /posts',async () => {
    //     const res = await request(app).post("/posts");

    //     expect(res.statusCode).toEqual(200);
    // })

    it('test get /posts/:id', async () => {
        const res = await request(app).get("/posts/1");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeTruthy();
        expect(res.body).toMatchObject({id: 1})
    })

    it('test put /posts/:id', async (testDone) => {
        const res = await request(app).put("/posts/1", )
                    .send({data: {title: "new title"}});


                    
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeTruthy();
        expect(res.body).toMatchObject({title: "new title"})

    })

    
})