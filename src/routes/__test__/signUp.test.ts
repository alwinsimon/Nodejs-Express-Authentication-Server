import request from "supertest";

import { app } from "../../app";
import { response } from "express";

it("Sign-Up Route Test: Valid Credentials - Returns a 201 on successful sign-up.", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(201);
});

it("Sign-Up Route Test: Missing Email and Password - Returns a 400 on success.", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("Sign-Up Route Test: Missing Email or Password - Returns a 400 on success.", async () => {
  // Password Missing
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
    })
    .expect(400);
  // Email Missing
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "password@123",
    })
    .expect(400);
});

it("Sign-Up Route Test: Invalid Email - Returns a 400 on success.", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tester",
      password: "password@123",
    })
    .expect(400);
});

it("Sign-Up Route Test: Invalid Password - Returns a 400 on success.", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "123",
    })
    .expect(400);
});

// Test Sign-Up with Same Email (Prevent Duplicate Email)
it("Sign-Up Route Test: Prevent Duplicate Emails - Returns a 400 on success.", async () => {
  // Sign-Up with a valid Email & Password
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(201);

  // Retry Signing Up with same Email & Password again
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(400);
});

// Test to check if a cookie is sent in response header after a successful sign-up
it("Sign-Up Route Test: Check if Cookie is sent in Response Header after successful Sign-Up.", async () => {
  // Sign-Up with a valid Email & Password
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "password@123",
    })
    .expect(201);

  // Check for presence of cookie in the response Header
  expect(response.get("Set-Cookie")).toBeDefined();
});
