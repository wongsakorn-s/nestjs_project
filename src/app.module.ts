import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductModule, AuthModule, UsersModule]
})
export class AppModule {}
