## Setup

Add a `.env` file to the root of the repository

frodo requires the following env variables (maybe different ones for different api's)

AM_USERNAME=my-username
AM_PASSWORD=my-pass
AM_URL=am-url

## Scratchpad

We have a folder called `scratchpad` in the root, which has a `main.ts` file in it and a tsconfig.json

`pnpm scratchpad` in a terminal will invoke the `main.ts` file, compile and run the code.

You can edit code to test in the main.ts in the scratchpad, and import modules from the `src` directory or from
the other modules
