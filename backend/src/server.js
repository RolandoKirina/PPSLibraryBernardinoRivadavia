import APP from "./app.js";


const PORT = process.env.PORT | 4000;

APP.listen(PORT,() => {
    console.log("el server esta funcionando en el puerto 4000");
})

