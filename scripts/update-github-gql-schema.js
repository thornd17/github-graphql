import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMA_URL = "https://docs.github.com/public/fpt/schema.docs.graphql";

const DEST_PATH = "src/shared/api/graphql/github-schema.docs.graphql";
const ABSOLUTE_DEST_PATH = path.resolve(__dirname, DEST_PATH);

fs.mkdirSync(path.dirname(ABSOLUTE_DEST_PATH), { recursive: true });

https
    .get(SCHEMA_URL, (response) => {
        if (response.statusCode === 200) {
            const file = fs.createWriteStream(DEST_PATH);
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                console.log(
                    `- Schema downloaded and replaced successfully.\n- Github gql schema loaded in "${DEST_PATH}".`
                );
            });
        } else {
            console.error(
                `Failed to download the schema. Status code: ${response.statusCode}`
            );
        }
    })
    .on("error", (err) => {
        console.error(`Error: ${err.message}`);
    });
