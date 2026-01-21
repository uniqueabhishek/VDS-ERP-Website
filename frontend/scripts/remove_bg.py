"""
Script to remove background (specifically white background) from an image.
"""
import os
from PIL import Image

INPUT_PATH = "AOL LOGO 1.png"
OUTPUT_PATH = "AOL_LOGO_transparent.png"

try:
    if os.path.exists(INPUT_PATH):
        img = Image.open(INPUT_PATH)
        img = img.convert("RGBA")

        datas = img.getdata()
        newData = []

        for item in datas:
            # Check if pixel is white (or very close to white)
            # Threshold: 240/255
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))  # Make transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(OUTPUT_PATH, "PNG")
        print("Success: Image processing complete")
    else:
        print(f"Error: Input file {INPUT_PATH} not found")

except OSError as e:
    print(f"Error: {str(e)}")
