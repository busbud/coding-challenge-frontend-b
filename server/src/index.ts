import "source-map-support/register";

import { createServer } from "./server/server";

createServer().then(async ({ run }) => run());
