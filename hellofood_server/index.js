const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser= require('cookie-parser')

app.use(cors({
    origin: ['http://localhost:5173','https://foodhub-3a8d3.web.app'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
require('dotenv').config()

//custom middleware
const gateman = (req,res,next)=>{
    const token = req?.cookies?.token
    if (!token) {
        return res.status(401).send({message: "unauthorized access"})
    }
    jwt.verify(token, process.env.AUTH_TOKEN,(err,decoded)=>{
        if(err){
            return res.status(401).send({message:"unauthorized"})
        }
        req.user = decoded
        next()
    })
}

const port = process.env.PORT | 3200

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8gn4coa.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // user api security
        app.post('/food/v1/user', async (req, res) => {
            const user = req.body
            // console.log(user);
            const token = jwt.sign(user, process.env.AUTH_TOKEN, { expiresIn: 60 * 60 })
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
            res.send("User Successed")
        })

        //user logout api 
        app.post('/food/v1/userlogout', async (req, res) => {
            console.log("Logout user: ");
            res.clearCookie('token', { maxAge: 0 }).send({ success: true })
        })


        const dbcollection = client.db('food').collection('foods')
        const reqdbcollection = client.db('food').collection('foodrequest')

        //<-------------- get data apis --------------->

        //get foods for features
        app.get('/food/v1/foods', async (req, res) => {
            try {
                const datas = await dbcollection.find().toArray()
                res.send(datas)
            } catch (e) {
                res.send(e)
            }
        })

        //get foods for available page
        app.get('/food/v1/availablefoods',gateman, async (req, res) => {
            try {
                const emails = req.query.user
                console.log("query:", emails);
                // const reqcookie = req.cookies
                const userinfo = req.user
                if( emails !== userinfo.email){
                    return res.status(403).send({message: "forbbiden access"})
                }
                const query = { "satus": "available" }
                const availablefood = await dbcollection.find(query).toArray();
                res.send(availablefood)
            } catch (e) {
                res.send(e.message)
            }
        })

        //get single available food
        app.get('/food/v1/sfood',gateman, async (req, res) => {
            try {
                const emails = req.query.user
                // const reqcookie = req.cookies
                const userinfo = req.user
                if( emails !== userinfo.email){
                    return res.status(403).send({message: "forbbiden access"})
                }
                const id = req.query.id
                const query = { _id: new ObjectId(id) }
                const food = await dbcollection.findOne(query)
                res.send(food)
            } catch (e) {
                res.send(e)
            }
        })

        //get my food api
        app.get('/food/v1/myfood',gateman, async (req, res) => {
            try {
                const q_email = req.query.usermail
                // const reqcookie = req.cookies
                const userinfo = req.user
                if( q_email !== userinfo.email){
                    return res.status(403).send({message: "forbbiden access"})
                }
                const query = { "donator.d_email": { $eq: q_email } }
                const datas = await dbcollection.find(query).toArray()
                res.send(datas)
            } catch (e) {
                res.send(e)
            }
        })

        //get my food request api
        app.get('/food/v1/myfoodrequest', async (req, res) => {
            try {
                const q_email = req.query.usermail
                const query = {
                    u_email: { $eq: q_email }
                }
                const datas = await reqdbcollection.find(query).toArray()
                res.send(datas)
            } catch (e) {
                res.send(e)
            }
        })



        //<---------------post data apis ---------------->


        //user food request api
        app.post('/food/v1/foodrequests', async (req, res) => {
            try {
                const foodreq = req.body
                const data = await reqdbcollection.insertOne(foodreq)
                res.send(data)
            } catch (e) {
                res.send(e)
            }
        })

        // const adddbcolection = client.db("food").collection("userfood")
        // user add food api
        app.post("/food/v1/addfood", async (req, res) => {
            try {
                const reqfood = req.body
                const data = await dbcollection.insertOne(reqfood)
                res.send(data)
            } catch (e) {
                res.send(e)
            }
        })


        //<---------------update data apis ---------------->


        //<---------------delete data apis ---------------->
        app.delete("/food/v1/cancelfood", async (req, res) => {
            try {
                const id = req.query.id
                // console.log(id);
                const query = { id: id }
                const data = await reqdbcollection.deleteOne(query)
                res.send(data)
            } catch (e) {
                res.send(e)
            }
            // console.log(data);
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send(`Server is running...`)
})

app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
})