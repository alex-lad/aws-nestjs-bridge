import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { CloudwatchService } from '../Services/cloudwatch.service';

@Controller()
export class CloudwatchController {
  constructor(private readonly cloudwatchService: CloudwatchService) {}

  @Post('cloudwatch')
  @HttpCode(201)
  log(@Req() req, @Body() body): string {
    const {
      headers: {
        'user-agent': userAgent,
      }
    } = req;

    const {
      eventType,
    } = req.body;

    this.cloudwatchService.putLogByGroup(eventType, userAgent);
    return 'success';
  }
}
