const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("---------------------");
        console.log("Connected to MongoDB");
        console.log("---------------------");
    })
    .catch(err => {
        console.log(err)
    });
