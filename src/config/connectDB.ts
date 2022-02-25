import mongoose from 'mongoose'

const connectDB = async () => {
  if (!process.env.MONGO) throw new Error('No mongoDB URI variable, add MONGO to your .env')

  try {
    await mongoose.connect(process.env.MONGO)
    console.log('🙊 Monkeys Assembled')
  } catch (error) {
    console.error('@connectDB', error)
  }
}

export default connectDB
