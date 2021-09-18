export const PORT = parseInt(process.env.PORT || '4000')
export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/slack-clone'
export const JWT_SECRET_KEY =
  process.env.JWT_SECRET_KEY || '243ff818-6d84-4969-8c06-817e8ca43130'
// JWT exp delta in seconds, defaults to 30 days = 86400 * 30
export const JWT_EXP_DELTA = parseInt(process.env.JWT_EXP_DELTA || '2592000')
