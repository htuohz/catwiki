const request = require("supertest");
const app = require("./index");


describe("/breeds", () => {
  it("GET /breeds/search?q -> array breeds", () => {
    return request(app)
      .get("/breeds/search?q=sib")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(expect.arrayContaining([]));
        res.body.every((item) =>
          expect(item.name.toLowerCase()).toMatch(/sib/)
        );
      });
  });

  it("GET breed detail /breeds/:id -> breed detail", () => {
    return request(app)
      .get("/breeds/abys")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res=>{
        expect(res.body.id).toEqual("abys");
      })
  });

  it("GET breed images /breeds/images?q -> array images",() => {
    return request(app)
      .get("/breeds/images?q=abys")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(expect.arrayContaining([
          expect.objectContaining({
            url:expect.any(String)
          })]))
      });
  })
});

