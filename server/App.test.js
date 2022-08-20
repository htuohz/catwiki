const request = require("supertest");
const app = require("./index");

describe("/",() => {
    it("GET / -> array breeds", () => {
        return request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response=>{
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name:expect.any(String)
                        })
                    ])
                )
            })
    })
})

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
});

