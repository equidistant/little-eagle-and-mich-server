export default (err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404)
    .send({
      message: 'NOT_FOUND'
    })
  }
  console.log(err)
  return res.status(500)
    .send({
      message: 'INTERNAL_SERVER_ERROR'
    })
}