# IceArrow - Secure Secret Sharing on Walrus 

IceArrow lets you share a secret message or file with anyone in a quick and secure manner.

The encryption/decryption happens in the browser and the encrypted files are stored on [Walrus](https://walrus.xyz).

This repository represents the frontend part of the app. The Golang backend is here [b3b/icearrow-server](https://github.com/b3b/icearrow-server).

## How it works

You upload your file, IceArrow encrypts it and gives you a unique link, which you then send through any available channel. 
The recipient opens the link and gets the file encrypted. After that, the link expires. As easy as that.

## Features

- End-to-End encryption with [OpenPGP](https://openpgpjs.org/)
- One-time links
- No account/wallet required
- Companion Chrome extension [kkomelin/icearrow-extension](https://github.com/kkomelin/icearrow-extension)

## Credits

The project has been built on top of [Yopass](https://github.com/jhaals/yopass) project. 
We're grateful to all its contributors for their exceptional work which made IceArrow project possible.
