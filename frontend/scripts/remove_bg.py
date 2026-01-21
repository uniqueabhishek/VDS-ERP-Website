from PIL import Image
import os

input_path = "AOL LOGO 1.png"
output_path = "AOL_LOGO_transparent.png"

try:
    if os.path.exists(input_path):
        img = Image.open(input_path)
        img = img.convert("RGBA")

        datas = img.getdata()
        newData = []

        for item in datas:
            # Check if pixel is white (or very close to white)
            # Threshold: 240/255
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0)) # Make transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print("Success: Image processing complete")
    else:
        print(f"Error: Input file {input_path} not found")

except Exception as e:
    print(f"Error: {str(e)}")
