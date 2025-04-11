// models/patient.model.js
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  condition: String,
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
