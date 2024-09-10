<!-- ![Yopass-horizontal](https://user-images.githubusercontent.com/37777956/59544367-0867aa80-8f09-11e9-8d6a-02008e1bccc7.png) -->

# IceArrow - Secure File Sharing on Walrus

[demo](https://icearrow.walrus.site)

TBC


---

Yopass is a project for sharing secrets in a quick and secure manner\*.
The sole purpose of Yopass is to minimize the amount of passwords floating around in ticket management systems, Slack messages and emails. The message is encrypted/decrypted locally in the browser and then sent to yopass without the decryption key which is only visible once during encryption, yopass then returns a one-time URL with specified expiry date.

There is no perfect way of sharing secrets online and there is a trade off in every implementation. Yopass is designed to be as simple and "dumb" as possible without compromising on security. There's no mapping between the generated UUID and the user that submitted the encrypted message. It's always best to send all the context except password over another channel.

**[Demo available here](https://yopass.se)**. It's recommended to host yopass yourself if you care about security.

- End-to-End encryption using [OpenPGP](https://openpgpjs.org/)
- Secrets can only be viewed once
- No accounts or user management required
- Secrets self destruct after X hours
- Custom password option
- Limited file upload functionality

## History

Yopass was first released in 2014 and has since then been maintained by me and contributed to by this fantastic group of [contributors](https://github.com/jhaals/yopass/graphs/contributors). Yopass is used by many large corporations none of which are currently listed in this readme.
If you are using yopass and want to support other then by code contributions. Give your thanks in an email, consider donating or by giving consent to list your company name as a user of Yopass in this readme(Trusted by)
