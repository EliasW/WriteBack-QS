var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
  // title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    //db.collection('user-data').insertOne(item, function(err, result) {db.products.insert( { _id: 10, item: "box", qty: 20 } )
    //db.collection('user-data').insert({_id:req.body.title, "content": req.body.content, "author": req.body.content}, function(err, result) {
      db.collection('customer-budget').insert({_id:req.body.title, "content": req.body.content, "author": req.body.content}, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var item = {
   // title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
   // db.collection('user-data').updateOne({"_id": req.body.title}, {$set: item}, function(err, result) {
    //db.collection('user-data').updateOne({"_id": req.body.title}, {"content": req.body.content}, function(err, result) {
    db.collection('customer-budget').updateOne({"_id": req.body.title}, {"content": req.body.content}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
   //db.collection('user-data').deleteOne({"author": objectId(id)}, function(err, result) {
   // db.collection('user-data').deleteOne({"_id": req.body.id}, function(err, result) {
    db.collection('customer-budget').deleteOne({"_id": req.body.id}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
  res.redirect('/');
});

module.exports = router;