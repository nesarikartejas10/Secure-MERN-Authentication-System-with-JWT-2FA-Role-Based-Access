import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { config } from "./src/config/envConfig.js";

const PORT = config.port || 8000;

const startServer = () => {
  app.listen(PORT, async () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    await connectDB();
  });
};

startServer();
