const fs = require('fs');
const Jimp = require('jimp');

const src = 'Gemini_Generated_Image_g4b0o9g4b0o9g4b0.png';
const dest = 'public/images/gemini_logo_transparent.png';

async function processImage() {
    try {
        if (!fs.existsSync(src)) {
            console.error('Source image not found:', src);
            return;
        }

        const image = await Jimp.read(src);

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];

            // Threshold for "Black" or very dark pixels
            // Adjust threshold as needed, 30 is a safe conservative bet for "dark"
            if (r < 30 && g < 30 && b < 30) {
                this.bitmap.data[idx + 3] = 0; // Make transparent
            }
        });

        await image.writeAsync(dest);
        console.log(`Success: Processed logo saved to ${dest}`);

    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
