import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  personName: {
    type: String,
    required: true,
  },
  hostel: {
    type: String,
    required: true,
  },
  userImage: {
    type: Buffer, 
  },
});

const User = mongoose.model('User', userSchema);

export default User;
