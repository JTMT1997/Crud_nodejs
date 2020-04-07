const mongoose = require ('mongoose');

var mahasiswaSchema = new mongoose.Schema({
  nama: {
    type: String
  },
  ttl: {
    type: String
  },
  alamat: {
    type: String
  },
  jeniskelamin: {
    type: String
  },
});

mongoose.model('Mahasiswa', mahasiswaSchema);
