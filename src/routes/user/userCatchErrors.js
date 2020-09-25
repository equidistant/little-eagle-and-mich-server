export default (err, req, res, next) => {
  if (err.message.startsWith('E11000')) {
    return res.status(400)
      .send({
        message: 'USERNAME_ALREADY_EXISTS'
      })
  }
  if (err.message === 'INVALID_DATA') {
    return res.status(400)
    .send({
      message: 'INVALID_DATA'
    })
  }
  console.log(err)
  return res.status(500)
    .send({
      message: 'INTERNAL_SERVER_ERROR'
    })
}