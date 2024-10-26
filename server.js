const express = require('express')

const app = express()
const PORT = 8080

app.get('/' , (req, res, next) =>{
	res.json({
		status: 200,
		message: "Hello RAG App 2"
	})
})

app.listen(PORT, ()=> {
	console.log(`Server running on port ${PORT}`)
})