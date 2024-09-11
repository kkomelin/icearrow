<!-- ![Yopass-horizontal](https://user-images.githubusercontent.com/37777956/59544367-0867aa80-8f09-11e9-8d6a-02008e1bccc7.png) -->

# IceArrow - Secure Secret Sharing on Walrus

IceArrow lets you share a secret message or file with anyone in a quick and secure manner.

The encryption/decryption happens in the browser and the encrypted files are stored on [Walrus](https://walrus.xyz).

**[Give it a try](https://icearrow.xyz)**

This repository represents the frontend part of the app.

## How it works

You upload your file, IceArrow encrypts it and gives you a unique link, which you then send through any available channel. 
The recipient opens the link and gets the file encrypted. After that, the link expires. As easy as that.

## Features

- End-to-End encryption with [OpenPGP](https://openpgpjs.org/)
- Choose between one-time or multiple-time link 
- Option to expire secrets
- No account required

## Credits

The project has been built on top of [Yopass](https://github.com/jhaals/yopass) project. 
We're extremely grateful to all its contributors for their exceptional work which made IceArrow project possible.
