// ensure new Date() is always in UTC
module.exports = async () => {
  process.env.TZ = 'UTC'
}
