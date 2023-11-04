import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true,
  },
  Topic: {
    type: String,
    required: true,
  },
  YoutubeLink: {
    type: String,
    required: true,
  },
  Pdf: {
    type: String, 
    required: true,
  },
    isDone: {
    type: Boolean,
    default: false, 
  },
});

const FormModel = mongoose.model('FormModel', FormSchema);

export default FormModel;