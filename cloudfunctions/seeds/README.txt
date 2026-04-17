Cloud database seed templates for WeChat cloud development.

Collections:
1. users -> import users.seed.json
2. trips -> import trips.seed.json

Suggested usage:
- Create collections `users` and `trips` in WeChat cloud database.
- Import the JSON arrays into the matching collections.
- Set `CLOUD_ENV_ID` in miniprogram/app.js to your cloud env ID before end-to-end testing.
- For local testing, make sure at least one user document matches the current mini program OPENID if you want write operations and profile reads to succeed.

Notes:
- The sample data mirrors the current frontend mock structure.
- Timestamps are ISO strings for import convenience; cloud functions can continue reading them as strings until you migrate to server dates.
