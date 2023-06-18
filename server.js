let express = require("express")
let app = express()

const passport = require("passport")
let { connnectMongoose, User } = require("./database")
let { initializingPassport, isAuthenticated } = require("./passportConfig")
let expressSession = require("express-session")

connnectMongoose()

initializingPassport(passport)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
    expressSession({ secret: "secret", resave: false, saveUninitialized: false })
)

app.use(passport.initialize())

app.use(passport.session())

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/register", async (req, res) => {
    let user = await User.findOne({ username: req.body.username })
    if (user) {
        return res.status(400).send("User already exists")
    }
    else {
        let newUser = await User.create(req.body)
        res.status(201).send(newUser)
    }
})

//
app.post("/login", passport.authenticate("local",{successRedirect:"/register", failureRedirect:"/"}))
//

app.get("/profile", isAuthenticated, (req, res)=>{
    res.send(req.user)
})

app.listen(3000, () => {
    console.log("Server is running on https://localhost:3000");
})

app.get("/logout", (req, res)=>{
    req.logOut()
    res.send("Logged Out")
})