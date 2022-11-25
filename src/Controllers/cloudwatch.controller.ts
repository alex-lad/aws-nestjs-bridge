import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { CloudwatchService } from '../Services/cloudwatch.service';

const RESULT_SUCCESS = 'success';
const RESULT_FAILED = 'failed';

@Controller()
export class CloudwatchController {
  constructor(private readonly cloudwatchService: CloudwatchService) {}

  @Post('cloudwatch')
  @HttpCode(201)
  async log(@Req() req, @Body() body): Promise<string> {
    const {
      headers: {
        'user-agent': userAgent,
      }
    } = req;

    const logs = req.body.map((event) => {
      const {
        eventType,
        data,
      } = event;

      return this.cloudwatchService.putLogByGroup(eventType, userAgent, data);
    })

    const results = await Promise.allSettled(logs);
    const rejected = results.find(({ status }) => status ==='rejected');

    if (rejected) {
      return RESULT_FAILED;
    }

    return RESULT_SUCCESS;
  }
}
