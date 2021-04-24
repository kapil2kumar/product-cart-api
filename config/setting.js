const crypto = require("crypto");

module.exports.jwtSetting = {
    // sessions will last for 1 full day
    SESSION_DURATION: 1000 * 60 * 60 * 24,
    // use stronger-than-normal security for signing our JWTs
    JWT_SIGNING_ALGORITHM: "HS512",
    // the 256-byte JWT signing key that we'll use to sign all user tokens.  this
    // should never be checked into version control, but should be the same among
    // all servers.  you can generate this using the secure-random library:
    //
    // const secureRandom = require("secure-random");
    // console.log(secureRandom(512, { type: "Buffer" }).toString("base64"));
    JWT_SIGNING_KEY: "ZUaHvzW6L84yRnuNKDlJmWUsgg/YgV5xuavYhcx0p2vPD8nciEB1Jjt5v4wEov3RzuidRO3SZ6xt93M7VQUsuQCHSMLnlnAeMWsNXWO5Cp8iVlCVPLnDKWcDX2GaX6RT/HV+n7C4eVUHHUv/rkPnmOmZGgpidn8Dj85jltQ1fy0Y6Ef/EAFN7PXNFj3ScQfa4j3WoZCPzHsbeJ1krSn3MlK7lUPy+T7Ewvw1g0k44W1l4UhKtuHJ0tTQDkBPR0V8JlhqfLmYj4SZYGeKoEFcbbd2gkyML+TsSz7oQE9P1XvpwDmOXHQpV/V8LHCNjX0NLv+cYjHoNkgq6UOqpXaTfaqiobPe0lSJUw3FDPnuTNZ7vRHzgveBCb3mb+8JnFSJuJkmIfHlPHZ0TCFtI/qB/FGQafLecmPh9DQ/WncukIrXdEzyaSGQHDovsb815Tnrb68P3HCtInwms5JD2K3z/eXmqIfu2F+nt7fxyTx1I1Aa6v0KTGH+s5dD4gJaoV8vdbZ2ulGjj8t+ae3IM6kiPInVr7GnBGw3gkzZxyEit/bINdJsFjLwJ2KFNiVsck/3YrsoD6oB0mhRamSsDq2izJxl1rBO29Cn/6k2vIavGwWkEJCR7IIHz5RBzt17gCyifIguaxCsFv/xFv/flqyMgfULDWjtTMNK/anTqIs88mo="
};

module.exports.defaultUser = [
    {
        user_first_name:"Kapil",
        user_last_name:"Kumar",
        user_email:"kapilboon2012@gmail.com",
        user_password:crypto.createHash('md5').update("Test@1234").digest("hex"),
        user_block:0,
        user_status:1,
        user_created_on:Math.floor(Date.now() / 1000),
        user_updated_on:Math.floor(Date.now() / 1000)
    },
    {
        user_first_name:"Kapil",
        user_last_name:"Kumar",
        user_email:"testuser1@yopmail.com",
        user_password:crypto.createHash('md5').update("Test@1234").digest("hex"),
        user_block:0,
        user_status:1,
        user_created_on:Math.floor(Date.now() / 1000),
        user_updated_on:Math.floor(Date.now() / 1000)
    },
    {
        user_first_name:"Kapil",
        user_last_name:"Kumar",
        user_email:"user_inactive@yopmail.com",
        user_password:crypto.createHash('md5').update("Test@1234").digest("hex"),
        user_status:0,
        user_block:0,
        user_created_on:Math.floor(Date.now() / 1000),
        user_updated_on:Math.floor(Date.now() / 1000)
    },
    {
        user_first_name:"Kapil",
        user_last_name:"Kumar",
        user_email:"user_block@yopmail.com",
        user_password:crypto.createHash('md5').update("Test@1234").digest("hex"),
        user_status:1,
        user_block:1,
        user_created_on:Math.floor(Date.now() / 1000),
        user_updated_on:Math.floor(Date.now() / 1000)
    }
];

module.exports.defaultProduct = [
    {
        product_name:"Nikon D850",
        product_description:"The Nikon D850 sets remarkable standards of quality in both, possessing an impressive 45.7 effective megapixels that allows it to capture the most awe-inspiring images and produce phenomenal 8K UHD time-lapse movies via images taken with its silent interval timer shooting.",
        product_price:27195.10,
        product_make:2020,
        product_status:1,
        product_created_on:Math.floor(Date.now() / 1000),
        product_updated_on:Math.floor(Date.now() / 1000)
    },
    {
        product_name:"SONY Alpha ILCE-6000",
        product_description:"SONY Alpha ILCE-6000Y/b in5 Mirrorless Camera Body with Dual Lens : 16-50 mm & 55-210 mm  (Black)",
        product_price:53990.50,
        product_make:2019,
        product_status:1,
        product_created_on:Math.floor(Date.now() / 1000),
        product_updated_on:Math.floor(Date.now() / 1000)
    },
    {
        product_name:"Canon EOS 200D",
        product_description:"Canon EOS 200D II DSLR Camera EF-S 18 - 55 mm IS STM and 55 - 250 mm IS STM  (Black)",
        product_price:64990.00,
        product_make:2021,
        product_status:1,
        product_created_on:Math.floor(Date.now() / 1000),
        product_updated_on:Math.floor(Date.now() / 1000)
    },
    {
        product_name:"Panasonic Lumix G85M",
        product_description:"Panasonic Lumix G85M Mirrorless Camera Body with 12 - 60 mm Lens  (Black)",
        product_price:55999.99,
        product_make:2020,
        product_status:1,
        product_created_on:Math.floor(Date.now() / 1000),
        product_updated_on:Math.floor(Date.now() / 1000)
    },
    {
        product_name:"dkian Digital Kids camera 20MP",
        product_description:"dkian Digital Kids camera 20MP 1080P with 32GB Memory Card Mini Mirrorless Camera  (Blue)",
        product_price:2499.99,
        product_make:2020,
        product_status:1,
        product_created_on:Math.floor(Date.now() / 1000),
        product_updated_on:Math.floor(Date.now() / 1000)
    }
];

module.exports.constant = {
    user_status_active: 1,
    user_status_inactive: 0,
    user_block: 1,
    user_unblock: 0,
};