const Product = require('./models/Product');
const Products = require('./models/Product');

async function main() {
    const connection = require('./lib/connectMongoose')
    await initProducts();
    connection.close();
}

main().catch(error => console.log('Hubo un error', error));

async function initProducts() {
    const result = await Product.deleteMany();
    console.log(`Eliminated ${result.deletedCount} products`);

    const inserted = await Product.insertMany([
        {
            nombre: "bicicleta",
            venta: true,
            precio: 230.15,
            foto: 'bicicleta.jpeg',
            tags: ["lifestyle", "motor"]
        },
        {
            nombre: "iPhone 3GS",
            venta: false,
            precio: 50,
            foto: 'iphone.jpeg',
            tags: ["lifestyle", "mobile"]
        },
    ]);
    console.log(`Created ${inserted.length} new products`)
}