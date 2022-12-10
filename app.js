import { OpenAIApi, Configuration } from "openai";
import { writeFileSync, createReadStream } from "fs";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

console.log({ apiKey });

// Your Image Source Goes Here
const src = "./Ashwin.png";

const config = new Configuration({
  apiKey,
});
const openAi = new OpenAIApi(config);

async function imageEmulator() {
  const response = await openAi.createImageVariation(
    createReadStream(src),
    1,
    "1024x1024"
  );
  const image_url = response.data.data[0].url;
  const imgResult = await fetch(image_url);
  const blob = await imgResult.blob();
  const buffer = Buffer.from(await blob.arrayBuffer());
  writeFileSync(`./img/${Date.now()}.png`, buffer);
  console.log("Image Generated Successfully");
}

const prompt =
  "Give me complete database design for highly scalable Chat Application";

async function chatGpt() {
  const response = await openAi.createCompletion({
    model,
    prompt,
    temperature: 0.6,
  });
  const { choices } = response.data;
  console.log(choices[0].text);
}

// chatGpt();

// imageEmulator();
