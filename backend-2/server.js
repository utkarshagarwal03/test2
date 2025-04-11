import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
const app = express();
const PORT = 5002;

// Middleware
app.use(cors());
app.use(express.json());
import doctorRoutes from "./routes/doctorRoutes.js";

app.use("/api/doctors", doctorRoutes);
import patientRoutes from "./routes/patientRoutes.js";
app.use("/api/patients", patientRoutes);


app.use("/api/auth", authRoutes);



// MongoDB Connection
mongoose.connect("mongodb+srv://admin:admin123@cluster0.zkn4iy8.mongodb.net/mindful-care?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));
// Add this just below the .connect() block
mongoose.connection.once("open", () => {
    console.log("📡 Connection to MongoDB is open and stable!");
  });

mongoose.connection.on("error", (err) => {
    console.error("🔥 MongoDB runtime error:", err);
  });

// Test route
app.get("/", (req, res) => {
  res.send("🎉 Mindful Care Backend is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
