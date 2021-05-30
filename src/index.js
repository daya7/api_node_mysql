const express = require ('express');
const app = express();
//settings
app.set('port', process.env.PORT ||  3000);
//middlewares
app.use(express.json());
//routes
app.use(require('./routes/employees'));

app.listen(3000, () => {
console.log('Server on port', app.get('port'));
});