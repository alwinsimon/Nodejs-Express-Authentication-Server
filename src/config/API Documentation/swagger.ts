import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "A simple Authentication Server API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://auth.alwinsimon.com",
        description: "Prod server"
      },
      {
        url: "http://localhost:3000",
        description: "Dev server"
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "jwt",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function generateSwaggerDocs(app: Express, port: number) {

  // ======================= CSS Options =======================
  let styleOptions;
  // Uncomment the following line to remove default header in the API Documentation
  // styleOptions = {
  //   customCss: '.swagger-ui .topbar { display: none }'
  // };


  // Swagger documentation page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, styleOptions));

  // API Documentation in JSON format
  app.get("/api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(swaggerSpec);
  });
}

export default generateSwaggerDocs;
