const { PrismaClient } = require('../server/src/generated/client');

const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

const seedProducts = async () => {
    try {
        const products = [];
        for (let i = 0; i < 50; i++) {
            const randomCategoryId = Math.floor(Math.random() * 5) + 1; // Random categoryId from 1 to 5
            const randomRate = parseFloat((Math.random() * 4 + 1).toFixed(1)); // Random rate from 1 to 5
            const randomPrice = parseFloat((Math.random() * 100 + 10).toFixed(3)); // Random price from 10 to 100

            products.push({
                title: faker.commerce.productName(),
                color: faker.color.human(),
                rate: randomRate,
                image: 'https://shopsy-tcj.netlify.app/assets/women-NhG2D3pl.png', // Random fashion-related image
                price: randomPrice,
                description: faker.commerce.productDescription(),
                categoryId: randomCategoryId,
            });
        }

        // Insert all products into the database
        await prisma.product.createMany({
            data: products,
        });

        console.log('Products seeded successfully!');
    } catch (error) {
        console.error('Error seeding products:', error);
    } finally {
        await prisma.$disconnect();
    }
};

// Run the seed function
seedProducts();
