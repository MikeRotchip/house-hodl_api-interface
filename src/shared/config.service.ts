import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();
require('dotenv').config({
  path: `${__dirname}/../../.env.${process.env.MODE.toLowerCase()}`,
});

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));

    return this;
  }

  public isProduction(): boolean {
    return this.getValue('MODE') === 'PROD';
  }

  public getPort(): number {
    return parseInt(this.getValue('PORT'));
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.getValue('DATABASE_URL'),
      ssl:
        this.isProduction() || !!parseInt(this.getValue('DATABASE_SSL', false))
          ? { rejectUnauthorized: false }
          : false,
      logging: !!parseInt(this.getValue('DATABASE_LOGGING', false)),
      synchronize: false,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      migrationsTableName: 'migration',
      migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }

  public getJwtSecret(): string {
    return this.getValue('JWT_SECRET');
  }

  public getKafkaUrl(): string {
    return this.getValue('KAFKA_URL', false) ?? 'localhost:9092';
  }

  public getHouseServiceGrpcUrl(): string {
    return this.getValue('HOUSE_SERVICE_GRPC_URL', false) ?? 'localhost:3001';
  }
}

const config = new ConfigService(process.env);

export { config };
