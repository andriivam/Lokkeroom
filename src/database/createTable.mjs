import client from './client.mjs';


 const table = `
 CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL ,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    PRIMARY KEY ("id"));

    CREATE TABLE IF NOT EXISTS "lobbys" (
        "id" SERIAL NOT NULL,
        "id_users" SERIAL NOT NULL,
        PRIMARY KEY ("id")
      );
      CREATE TABLE IF NOT EXISTS "messages" (
        "id" SERIAL NOT NULL,
        "message" VARCHAR NOT NULL,
        "id_lobbys" SERIAL NOT NULL,
        "id_users" SERIAL NOT NULL,
        PRIMARY KEY ("id")
      );
      CREATE TABLE IF NOT EXISTS "admin_per-user" (
        "id" SERIAL NOT NULL,
        "id_lobbys" SERIAL NOT NULL,
        "id_users" SERIAL NOT NULL,
        PRIMARY KEY ("id")
      );
ALTER TABLE "lobbys" ADD FOREIGN KEY (id_users) REFERENCES "users" ("id");
ALTER TABLE "messages" ADD FOREIGN KEY (id_lobbys) REFERENCES "lobbys" ("id");
ALTER TABLE "messages" ADD FOREIGN KEY (id_users) REFERENCES "users" ("id");
ALTER TABLE "admin_per-user" ADD FOREIGN KEY (id_lobbys) REFERENCES "lobbys" ("id");
ALTER TABLE "admin_per-user" ADD FOREIGN KEY (id_users) REFERENCES "users" ("id");`
    client.query(table, (err, results) => {
        if (err) {
            console.log("something went wrong" + err);
            return;
        }
        console.log("Table was created successfully");
        client.end();
    });