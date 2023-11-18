import request from "supertest";

import { app } from "../../app";
import { response } from "express";

it("Sign-Out Route Test: Check if Cookies are Cleared on successful Sign-Out.", async () => {
  // Sign-Up to Create a New User
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(201);
  // Sign-Out with same User credentials
  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
