const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

//the model name Product is also set as collection name
module.exports = mongoose.model('Product', productSchema);

//without mongoose code
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//     constructor(title, price, description, imageUrl, _id, userId) {
//         this.title=title;
//         this.price= price;
//         this.description=description;
//         this.imageUrl=imageUrl;
//         this._id = _id ? new mongodb.ObjectId(_id) : null;
//         this.userId = userId;
//     }

//     save(){
//         const db = getDb();
//         let dbOp;
//         if(this._id){
//             //update the product
//             dbOp = db.collection('products')
//             .updateOne({ _id: this._id }, {$set: this});
//         } else if (!this._id){
//             //add new product
//             dbOp = db.collection('products')
//         .insertOne(this);
//         }
//         return dbOp
//         .then(result => {
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static fetchAll() {
//         const db = getDb();
//         //in find we can put filters like title: 'A book' etc etc filters
//         return db
//         .collection('products')
//         .find()
//         .toArray()
//         .then(products => {
//             console.log(products);
//             return products;
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static findById(prodId) {
//         const db = getDb();
//         return db.collection('products')
//         .find({ _id: new mongodb.ObjectId(prodId) })
//         .next()
//         .then(product => {
//             console.log(product);
//             return product;
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static deleteById(prodId){
//         const db = getDb();
//         return db.collection('products')
//         .deleteOne({_id: new mongodb.ObjectId(prodId)})
//         .then(result => {
//             console.log('Deleted Product');
//     })
//         .catch(err => {
//             console.log(err);
//         })
//     }
// }

// module.exports = Product;