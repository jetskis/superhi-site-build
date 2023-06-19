import mongoose from 'mongoose'
// const uri = `mongodb+srv://shoreline:${process.env.SHORELINE_PASSWORD}@serverlessinstance0.khyag.mongodb.net/?retryWrites=true&w=majority`

export async function mongoClient({
  SHORELINE_PASSWORD
}) {
  const uri = `mongodb+srv://shoreline:${SHORELINE_PASSWORD}@serverlessinstance0.khyag.mongodb.net/?retryWrites=true&w=majority`
  return await mongoose.connect(uri)
}