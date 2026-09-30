require("dotenv").config({path: "src/.env"})
const app = require("./app")

const PORT = process.env.PORT ?? 3000


app.listen(PORT, () => {

})