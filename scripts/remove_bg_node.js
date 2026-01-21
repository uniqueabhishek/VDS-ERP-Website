const Jimp = require('jimp');

async function removeBackground() {
    try {
        const image = await Jimp.read('AOL LOGO 1.png');

        // Iterate through all pixels
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // If pixel is white (or close to white), make it transparent
            if (red > 240 && green > 240 && blue > 240) {
                this.bitmap.data[idx + 3] = 0; // Set alpha to 0
            }
        });

        await image.writeAsync('AOL_LOGO_transparent.png');
        console.log('Success: Image saved as AOL_LOGO_transparent.png');

    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

removeBackground();
