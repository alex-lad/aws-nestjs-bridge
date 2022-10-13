import { Module } from '@nestjs/common';
import { CloudwatchController } from '../Controllers/cloudwatch.controller';
import { CloudwatchService } from '../Services/cloudwatch.service';

@Module({
  imports: [],
  controllers: [CloudwatchController],
  providers: [CloudwatchService],
})
export class CloudwatchModule {}
