const express = require("express")
const uuid = require("uuid")

const port = 3000
const app = express()
app.use(express.json())

/*
     - Query params => meusite.com/users?nome=juliana&age=28 // FILTROS
     - Route params => /users/2    // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFIO
     - Request Body => {"name: "Rodolfo", "age":}
     
     - GET         => Buscar informações no back-end
     - POST        => Criar informações no back-end 
     - PUT / PACTH => Alterar /Atualizar informações no back-end
     - DELETE      => Deletar informações no back-end 
     

     - Middlewares => Interceptador => Tem o poder de parar ou aalterar dados da requisição
*/
const users = []

const checkUserId = (request, response, next ) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ Error: "User not found"})
    }

    request.userIndex = index
    request.userId = id
    next()
}

app.get("/users", (request, reponse) => {
    return reponse.json(users)

})

app.post("/users", (request, reponse) => {
    const { name, age } = request.body
    
    const user = { id:uuid.v4(), name, age }

    users.push(user)

    return reponse.status(201).json(user)

})


app.put("/users/:id", checkUserId, (request, reponse) => {
   const { name, age } = request.b
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

     users[index] = updateUser

    return reponse.json(updateUser)

})

app.delete("/users/:id", checkUserId, (request, reponse) => {
    const index = request.userIndex
   
    users.splice(index,1)

    return reponse.status(204).json()

})


app.listen(port, () => {
    console.log(`🚀 Server started on port ${port} 🚀 `) 
}) 
