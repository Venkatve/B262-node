import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const PORT=process.env.PORT;

app.use(express.json());


const users=[
    {
    "createdAt": "2021-10-01T00:49:47.780Z",
    "name": "Bennie Aufderhar",
    "avatar": "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
    "age": 59,
    "color": "silver",
    "id": "5"
    },
    {
    "createdAt": "2021-09-30T14:22:51.638Z",
    "name": "Lana Witting",
    "avatar": "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
    "age": 77,
    "color": "olive",
    "id": "6"
    },
    {
    "createdAt": "2021-09-30T18:01:06.642Z",
    "name": "Vickie Brekke",
    "avatar": "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
    "age": 80,
    "color": "tan",
    "id": "7"
    },
    {
    "createdAt": "2021-09-30T09:39:22.586Z",
    "name": "Al Runolfsdottir",
    "avatar": "https://cdn.fakercloud.com/avatars/areus_128.jpg",
    "age": 28,
    "color": "orange",
    "id": "8"
    },
    {
    "createdAt": "2021-09-30T18:22:41.955Z",
    "name": "Sam Orn",
    "avatar": "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
    "age": 49,
    "color": "indigo",
    "id": "9"
    },
    {
    "createdAt": "2021-09-30T18:30:05.224Z",
    "name": "Grace Grimes",
    "avatar": "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
    "age": 72,
    "color": "yellow",
    "id": "10"
    },
    {
    "createdAt": "2021-09-30T11:26:57.667Z",
    "name": "Cindy Reinger",
    "avatar": "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
    "age": 30,
    "color": "yellow",
    "id": "11"
    },
    {
    "createdAt": "2021-10-01T06:26:55.203Z",
    "name": "Beth Koelpin",
    "avatar": "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
    "age": 0,
    "color": "purple",
    "id": "12"
    },
    {
    "createdAt": "2021-09-30T12:28:17.426Z",
    "name": "Doug Mayer",
    "avatar": "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
    "age": 25,
    "color": "cyan",
    "id": "13"
    },
    {
    "createdAt": "2021-10-01T01:09:41.654Z",
    "name": "Mrs. Garrett Becker",
    "avatar": "https://cdn.fakercloud.com/avatars/increase_128.jpg",
    "age": 20,
    "color": "yellow",
    "id": "14"
    }
    ]
async function createconnection(){
        // const MONGO_URL = "mongodb://localhost/venkat";
        const MONGO_URL =process.env.MONGO_URL;
        const client = new MongoClient(MONGO_URL);
        await client.connect();

        console.log("successfully connected11");
        const insertdata=client.db("venkat").collection("people").insertMany(users);
        
         return client;
         // const user = await client.db("2402").collection("data").findOne({id = "5"});
}
createconnection();

app.get("/",(request,response)=>{
    response.send("hii welcome all!!!*")
})

// app.get("/users",(request,response)=>{
//     response.send(users)
// })

app.get("/users/:id", async (request,response)=>{
    console.log(request.params);
    const { id } = request.params;
   

    const client = await createconnection();
    const user = await client
      .db("venkat")
      .collection("people")
      .findOne({ id : id });

    console.log(user);
    response.send(user)
})  

app.get("/users",async (request,response)=>{
    // const {color,ageGT} = request.query;
    const client = await createconnection();
    const user = await client
    .db("venkat")
    .collection("people")
    .findOne({})
    .toArray();

    console.log(user);
    response.send(users);
    // response.send(users.filter((user)=>user.color === color))
})
app.post("/users", async (request,response)=>{
    const client = await createconnection();
    const adduser=request.body;

    const result = await client.db("venkat").collection("people").insertMany(adduser);
    response.send(result);
})

app.delete("/users/:id", async (request,response)=>{
    console.log(request.params);
    const { id } = request.params;
   

    const client = await createconnection();
    const user = await client
      .db("venkat")
      .collection("people")
      .deleteOne({ id : id });

    console.log(user);
    response.send(user)
})

app.patch("/users/:id", async (request,response)=>{
    console.log(request.params);
    const { id } = request.params;
   

    const client = await createconnection();
    const newData=request.body;
    const user = await client
      .db("venkat")
      .collection("people")
      .UpdateOne({ id : id },{ $set: newData});

    console.log(user);
    response.send(user)
})  


app.listen(PORT,()=> console.log("connected Successfully", PORT ))


// app.get("/users",(request,response)=>{
//     const {color,ageGT} = request.query;
//     console.log(request.query);

//     if(!color&&!ageGT){
//         response.send(users)
//     }else if(color&&!ageGT){
//         response.send(users.filter((user)=>user.color===color))
//     }else if(!color&&ageGT){
//         response.send(users.filter((user)=>user.age>=ageGT))
//     }else if(color&&ageGT){
//         response.send(users.filter((user)=>user.color===color & user.age>=ageGT))
//     }
//     // response.send(users.filter((user)=>user.color === color))
// })