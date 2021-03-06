require('./db/mongoose.js');

const express = require('express');
const employeeRouter = require('./routers/employee');
const managerRouter = require('./routers/manager');
const path = require('path');
//const exhbs = require('express-handlebars');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, './templates/views');
const partialPath = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory));
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Employee Management',
		name: 'Akrithi'
	});
});
app.use(bodyParser.json());
app.use(employeeRouter);
app.use(managerRouter);
app.listen(port, () => {
	console.log('Server running in port ' + port);
});
