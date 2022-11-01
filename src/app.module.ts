import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    OrderModule,
    MongooseModule.forRoot(
      'mongodb+srv://ismailakcabey:nodejs@denemedatabase.an06h.mongodb.net/order?retryWrites=true&w=majority'
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
