import { Injectable } from '@nestjs/common';
import { config, CloudWatchLogs } from 'aws-sdk';

@Injectable()
export class CloudwatchService {
  constructor() {
    // TODO: get from env
    config.update({
      region: 'us-east-1', // aws region
      accessKeyId: '', // aws access key id
      secretAccessKey: '', // aws secret access key
    });
  }

  putLogByGroup(group, message): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const cloudwatchLogs = new CloudWatchLogs();

      const params = {
        logEvents: [
          {
            timestamp: Date.now(),
            message: message,
          }
        ],
        logGroupName: group,
        logStreamName: 'magic-stream', // TODO: env
        // sequenceToken: '', // TODO
      };

      cloudwatchLogs.putLogEvents(params, function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}
