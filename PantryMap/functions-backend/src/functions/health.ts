import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
  } from "@azure/functions";
  
  export async function health(
    _request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> {
    context.log("Health check invoked");
  
    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "ok" }),
    };
  }
  
  app.http("health", {
    methods: ["GET"],
    authLevel: "function",
    handler: health,
  });
  