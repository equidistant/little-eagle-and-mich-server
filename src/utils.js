export const logStart = () => {
	console.log(`${millisToString()} - ${process.env.NAME} API started on port ${process.env.PORT || 3000}`)
  }

export const millisToString = (date = new Date(Date.now())) => {
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
	const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
	const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
	const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
	const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
	return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`
}

export const catchErrors = (err, req, res, next) => {
    if (err.type && err.type === 'entity.parse.failed') {
        return res.status(400).send({
            error: 'INVALID_JSON_DATA'
        })
    } else {
        console.log(err)
        return res.status(500).send({
            error: 'INTERNAL_SERVER_ERROR'
        })
    }
}

export const setResponseHeadersAdmin = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN_ADMIN)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    if (req.method === 'OPTIONS') {
        res.status(200).send('OK')
    } else {
        next()
    }
}

export const setResponseHeadersWeb = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN_WEB)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PATCH')
    if (req.method === 'OPTIONS') {
        res.status(200).send('OK')
    } else {
        next()
    }
}