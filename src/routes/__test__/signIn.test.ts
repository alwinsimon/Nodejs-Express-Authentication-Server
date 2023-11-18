import request from "supertest";

import { app } from "../../app";
import { response } from "express";

it("Sign-In Route Test: Valid Credentials - Returns a 200 on successful Sign-In.", async () => {
  // Sign-Up to Create a New User
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(201);
  // Sign-In with same User credentials
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(200);
});

it("Sign-In Route Test: Invalid Credentials - Returns a 400 on success.", async () => {
  // Sign-Up to Create a New User
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(201);
  // Try Sign-in with a user credentials that is Invalid.
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "tester@test.com",
      password: "IncorrectPassword",
    })
    .expect(400);
});

it("Sign-In Route Test: Missing Email and Password - Returns a 400 on success.", async () => {
  return request(app).post("/api/users/signin").send({}).expect(400);
});

it("Sign-In Route Test: Missing Email or Password - Returns a 400 on success.", async () => {
  // Create a user
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(201);
  // Password Missing
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "tester@test.com",
    })
    .expect(400);
  // Email Missing
  await request(app)
    .post("/api/users/signin")
    .send({
      password: "password@123",
    })
    .expect(400);
});

// Test to check if a cookie is sent in response header after a successful Sign-In
it("Sign-In Route Test: Check if Cookie is sent in Response Header after successful Sign-In.", async () => {
  // Sign-Up with a valid Email & Password
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(201);
  // Sign-In with same User credentials
  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(200);

  // Check for presence of cookie in the response Header
  expect(response.get("Set-Cookie")).toBeDefined();
});
