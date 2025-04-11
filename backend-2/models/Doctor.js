import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  email: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
