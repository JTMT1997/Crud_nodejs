const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Mahasiswa = mongoose.model('Mahasiswa');

router.get('/',(req, res)=>{
  res.render("mahasiswa/addOrEdit",{
    viewTitle: "Insert Mahasiswa"
  });
});

router.post('/',(req, res)=>{
  if (req.body._id == '')
    insertRecord(req, res);
  else
    updateRecord(req,res)
});

function insertRecord(req, res){
  var mahasiswa = new Mahasiswa();
  mahasiswa.nama = req.body.nama;
  mahasiswa.ttl = req.body.ttl;
  mahasiswa.alamat = req.body.alamat;
  mahasiswa.jeniskelamin = req.body.jeniskelamin;
  mahasiswa.save((err, doc) => {
    if(!err)
        res.redirect('mahasiswa/list');
    else {
      console.log("Error dalam memasukan data" +err);
    }
  });
}

function updateRecord(req, res){
  Mahasiswa.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) =>
    {
      if (!err) {res.redirect('mahasiswa/list');}
      else {
        console.log("Ada Error");
      }
    }
  );
}

router.get('/list',(req, res) => {
  Mahasiswa.find((err, docs) => {
    if(!err){
      res.render("mahasiswa/list",{
       list: docs
      });
    } else {
      console.log('Error getting data: ' + err);
    }
  });
});

router.get('/:id',(req, res)=>{
  Mahasiswa.findById(req.params.id, (err, doc) =>{
    if(!err){
      res.render("mahasiswa/addOrEdit",{
        viewTitle: "Update Mahasiswa",
        mahasiswa: doc
      });
    }
  });
});

router.get('/delete/:id',(req, res) =>{
  Mahasiswa.findByIdAndRemove(req.params.id, (err, doc)=>{
    if(!err){
      res.redirect('/mahasiswa/list');
    } else {console.log('Error delete data'+ err); }
  });
});

module.exports = router;
