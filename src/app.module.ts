import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DrizzleModule } from './drizzle/drizzle.module'
import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    DrizzleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
