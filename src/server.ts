import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Data base is connected successfully')

    app.listen(config.port, () => {
      console.log(`application app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Failled to connect databse', error)
  }
}
bootstrap()
