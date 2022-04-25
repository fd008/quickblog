import request from "supertest";
import app from "../src/app.mjs";
import assert from "assert";

type PostType = {
    id: number;
    slug: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;

}

describe('Post Api', () => {
    it('should have all posts ', async () => {
        await request(app).get("/posts")
        .expect(200)
        .then(res => {
            assert(res.body.id, '1')
        })
        .catch((err) => console.error(err))
        

    })

    it('should have a post', async () => {
        const res = await request(app).get("/posts/first-blog-post");

        expect(res.statusCode).toEqual(200)
        expect(res).toHaveLength(1)
    })

    it('should create a new post', async () => {
        const res = await request(app).post("/posts")
                    .send({
                        "slug": "second-post",
                        "title": "Second post title",
                        "author": "Tom",
                        "content": "Great content! ",
                    })

        expect(res.statusCode).toEqual(201)
        expect(res.body).toMatchObject({...res.body, slug: "second-post"})
    })

    it('should update a post', async () => {
        const res = await request(app)
            .put("/posts/second-post")
            .send({title: "updated second title"})

        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({...res.body, title: "updated second title "})
    })

    it('should delete a post', async () => {
        const res = await request(app)
                    .delete("/posts/second-post")

        expect(res.statusCode).toEqual(204)
    })

})