import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '@/config';
import { validationPipe } from './common/pipes/validation-pipe';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: config.cors.origin,
    methods: config.cors.methods,
    allowedHeaders: config.cors.allowedHeaders,
    credentials: config.cors.credentials,
  });

  app.setGlobalPrefix(config.api.prefix);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(validationPipe());

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(config.port);
}
bootstrap();
