import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  notes: { type: String, required: false },
  confirmed: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now }
})

const Appointment = mongoose.models.Appointment  || mongoose.model("Appointment", appointmentSchema)    
export default Appointment