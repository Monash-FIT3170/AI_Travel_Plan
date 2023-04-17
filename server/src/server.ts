// Importing module
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()


const app = express();
console.log(process.env.OPENAIKEY)
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;

// Handling GET / Request
app.get('/', (req, res) => {
	res.send('Hi');
})

// Server setup
app.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})
