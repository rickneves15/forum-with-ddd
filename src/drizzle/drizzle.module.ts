import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { Env } from '~/env'
import { schema } from './schema'

export const DrizzleProvider = 'Drizzle'

export type Drizzle = NodePgDatabase<typeof schema>

@Module({
  providers: [
    {
      provide: DrizzleProvider,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Env, true>) => {
        const connectionString = configService.get<string>('DATABASE_URL', {
          infer: true,
        })
        const pool = new Pool({
          connectionString,
        })

        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>
      },
    },
  ],
  exports: [DrizzleProvider],
})
export class DrizzleModule {}
