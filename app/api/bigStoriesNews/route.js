import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "bigStories.json"); // Path to JSON file
  const jsonData = await fs.readFile(filePath, "utf-8");
  const storiesNewsData = JSON.parse(jsonData);

  return new Response(JSON.stringify(storiesNewsData), {
    headers: { "Content-Type": "application/json" },
  });
}
