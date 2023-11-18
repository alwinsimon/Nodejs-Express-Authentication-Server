import request from "supertest";

import { app } from "../../app";
import { response } from "express";

it("Current-User Route Test: Check for Valid User Data Return - Returns current user data on success.", async () => {
  // Use the testUserSignUp global function written in setup.ts file in test directory to get a cookie
  const cookieFromSignUp = await global.testUserSignUp();
  // GET request to current user route with cookie
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookieFromSignUp)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("tester@test.com");
});

it("Current-User Route Test: Un-authenticated User - Returns currentUser data as null on success.", async () => {
  // GET request to current user route with-out cookie
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
