import users from "../users_info.mjs";
import client from "./client.mjs";

    client.connect()
    .then(() => {
    client.query("DELETE FROM users");
    for (let user of users) {
        client.query(
        "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
        [user.userName, user.password, user.email]
        );
    }
    })
    .then(() => client.query("select * from users order by id "))
    .then((results) => {console.table(results.rows)})
    .catch((err) => {console.log('Something wrong' + err)})
    .finally(() => client.end());