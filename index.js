const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { request } = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const db = require('./queries');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use('/users', db.userRouter);

db.userRouter.get('/', db.getUsers);
db.userRouter.get('/:id', db.getUserById);
db.userRouter.post('/', db.createNewUser);
db.userRouter.put('/:id', db.updateUser);
db.userRouter.delete('/:id', db.deleteUser);

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})
