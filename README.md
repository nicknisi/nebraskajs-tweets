# NebraskaJS Tweets!

A simple Node.js Application built for demonstration at the January 3, 2013 NebraskaJS Meetup.

## Setup

To run, you'll first need to get a [Twitter Developer Account](https://dev.twitter.com/apps/new). Once you
have this, create a json file called `twitter.json` in the following format:

    {
        "consumer_key": "YOUR_CONSUMER_KEY_HERE",
        "consumer_secret": "YOUR_CONSUMER_SECRET_HERE",
        "access_token_key": "YOUR_ACCESS_TOKEN_KEY_HERE",
        "access_token_secret": "YOUR_ACCESS_TOKEN_SECRET"
    }

Next, install the required dependencies

    ./install.sh

This will install all npm dependencies, and then run `bower install` to install the client-side dependencies.
