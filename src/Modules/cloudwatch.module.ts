import { Module } from '@nestjs/common';
import { CloudwatchController } from '../Controllers/cloudwatch.controller';
import { CloudwatchService } from '../Services/cloudwatch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CloudwatchController],
  providers: [CloudwatchService],
})
export class CloudwatchModule {}
