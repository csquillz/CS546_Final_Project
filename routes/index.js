const userRoutes = require("./users");
const goalRoutes = require("./goals");
const transRoutes = require("./trans-history");

const constructorMethod = app => {
  app.use("/", userRoutes);
  app.use("/", goalRoutes);
  app.use("/", transRoutes);
  
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;