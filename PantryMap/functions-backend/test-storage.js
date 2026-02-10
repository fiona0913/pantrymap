const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const accountName = "pantrymapstorage";
const accountKey = process.env.STORAGE_ACCOUNT_KEY;   // 从环境变量读
const containerName = "donation-photos";

(async () => {
  try {
    if (!accountKey) {
      console.log("❌ STORAGE_ACCOUNT_KEY is missing (env var not set)");
      process.exit(1);
    }

    const cred = new StorageSharedKeyCredential(accountName, accountKey);
    const serviceUrl = "https://" + accountName + ".blob.core.windows.net";
    const client = new BlobServiceClient(serviceUrl, cred);

    let count = 0;
    for await (const c of client.listContainers()) {
      count++;
      if (count <= 10) console.log("container:", c.name);
    }
    console.log("✅ STORAGE ACCOUNT NAME + KEY is match");
    console.log("Containers count:", count);

    const exists = await client.getContainerClient(containerName).exists();
    console.log(`Container "${containerNamists);
  } catch (err) {
    console.log("❌ STORAGE is NOT match");
    console.log("StatusCode:", err.statusCode);
    console.log("Code:", err.details?.errorCode);
    console.log("Message:", err.message);
  }
})();
