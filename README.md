# Bitmap Art Gallery

Bitmap 8x8 pixel art stored on-chain.

## Live Project

https://bitmap-art.josht.art/

### How it works

Bitmap art can be thought of as a digital art studio. It's able to generate 8x8 pixel art images directly in the blockchain

It does this using a very compact method. Rather than storing the color of every pixel directly, it keeps a compact, coded list of color values (the 'bitmap'). Each color value in the list is represented as a 4-bit value, which means it can range from 0 to 15. The contract has a palette of 16 colors it can paint with, so a color value of 0 might correspond to the color white (#ffffff), a value of 1 might be light grey (#aaaaaa), and so on, up to 15.

So, when given a 'bitmap' (the coded list of colors), it can then translate that into a proper picture by reading off each 4-bit value, looking up the color it represents, and painting a square that color. It does this for all 64 squares (8x8) to complete the picture.

Once you've created your bitmap artwork in the studio page you can mint it. This will save your bitmap with an associated tokenId forever in the blockchain. After that your artwork will be available for all to see in the gallery

![image](https://github.com/jtardioli/bitmap-art-gallery/assets/85530348/d143e1b5-3d8f-4579-93bc-66b9f0ffcfa6)
![image](https://github.com/jtardioli/bitmap-art-gallery/assets/85530348/cd572e5c-1296-4632-87b1-2aca710b6c67)
![image](https://github.com/jtardioli/bitmap-art-gallery/assets/85530348/dd07d693-e31c-451a-9c18-99d1d4bb91b4)

