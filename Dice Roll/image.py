from PIL import Image
import os

img = Image.open("game-dice.png")

print(img.size)
width, height = img.size
images = []

for i in range(2):
    for j in range(3):
        im1 = img.crop((j*(width/3),i*(height/2),(j+1)*(width/3),(i+1)*(height/2)))
        images.append(im1)
count = 0
for image in images:
    count += 1
    image.save(f"Diceimgs/gamedice{count}.png")