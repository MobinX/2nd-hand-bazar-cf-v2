const {createClient} = require('@libsql/client');
const client = createClient({
    url: "file:./prisma/dev.db",
    syncUrl: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  }); // Import the 'libsql' module

  client.sync().then(() => {}) 
