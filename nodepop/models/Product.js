'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number, 
    foto: String, 
    tags: [String]
});

productSchema.statics.lista = function(filtro, skip, limit, campos, sort) {
    const query = Product.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(campos);
    query.sort(sort);
    return query.exec()

}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;