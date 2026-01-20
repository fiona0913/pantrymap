// IMPORTANT: Do NOT auto-refactor or delete this file.
// This file registers Azure Functions via app.http at top-level.

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

function json(status: number, body: any): HttpResponseInit {
  return {
    status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function nowIso(): string {
  return new Date().toISOString();
}

function makeId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

function getMessagesContainer() {
  const endpoint = requireEnv("COSMOS_ENDPOINT");
  const key = requireEnv("COSMOS_KEY");
  const dbId = process.env.COSMOS_DATABASE || "microPantry";
  const containerId = process.env.COSMOS_CONTAINER_MESSAGES || "messages";

  const client = new CosmosClient({ endpoint, key });
  return client.database(dbId).container(containerId);
}

async function handleGet(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  const pantryId = req.query.get("pantryId")?.trim();
  if (!pantryId) return json(400, { error: "Missing pantryId." });

  const container = getMessagesContainer();

  // Return latest 50 messages for this pantry.
  const querySpec = {
    query:
      "SELECT c.id, c.pantryId, c.content, c.userName, c.userAvatar, c.photos, c.createdAt, c.moderation FROM c WHERE c.pantryId = @pantryId ORDER BY c.createdAt DESC OFFSET 0 LIMIT 50",
    parameters: [{ name: "@pantryId", value: pantryId }],
  };

  const { resources } = await container.items.query(querySpec).fetchAll();
  return json(200, resources || []);
}

async function handlePost(req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> {
  const body = (await req.json().catch(() => null)) as any;

  const pantryId = body?.pantryId?.toString().trim();

  const contentRaw = body?.content?.toString() ?? "";
  const content = contentRaw.trim();

  const userNameRaw = body?.userName?.toString() ?? "";
  const userName = userNameRaw.trim();

  // Optional fields per your frontend contract
  const userAvatar = body?.userAvatar === undefined ? null : body.userAvatar;
  const photos = Array.isArray(body?.photos) ? body.photos : [];

  // Guardrails (anonymous allowed, but prevent spam/abuse)
  if (!pantryId) return json(400, { error: "pantryId is required." });
  if (!content) return json(400, { error: "content is required." });
  if (content.length > 500) return json(400, { error: "content too long (max 500)." });

  if (!userName) return json(400, { error: "userName is required." });
  if (userName.length > 40) return json(400, { error: "userName too long (max 40)." });

  const safePhotos = photos
    .filter((p: any) => typeof p === "string" && p.trim().length > 0)
    .slice(0, 5);

  const container = getMessagesContainer();

  const doc: any = {
    id: makeId("msg"),
    pantryId: pantryId,
    content: content,
    userName: userName,
    userAvatar: userAvatar === "" ? null : userAvatar,
    photos: safePhotos,
    createdAt: nowIso(),
    moderation: { status: "visible", flagCount: 0 },
  };

  await container.items.create(doc);

  return json(201, { ok: true, message: doc });
}

app.http("messages", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (req: HttpRequest, ctx: InvocationContext): Promise<HttpResponseInit> => {
    try {
      if (req.method === "GET") return await handleGet(req, ctx);
      return await handlePost(req, ctx);
    } catch (e: any) {
      ctx.error("messages handler error:", e?.message || e);
      return json(500, { error: "Messages function error.", detail: e?.message || String(e) });
    }
  },
});
