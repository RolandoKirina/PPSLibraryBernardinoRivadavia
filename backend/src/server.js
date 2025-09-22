import app from "./app.js";

const PORT = process.env.PORT | 4000; //PORT va en mayúsculas al ser variable global, no instancia mutable

app.listen(PORT,() => {
    console.log("el server esta funcionando en el puerto 4000");
})

