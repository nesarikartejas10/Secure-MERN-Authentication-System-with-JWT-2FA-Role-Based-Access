import app from "./src/app.js";

const PORT = 3000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
};

startServer();
