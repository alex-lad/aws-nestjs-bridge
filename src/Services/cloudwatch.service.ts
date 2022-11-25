import { Injectable } from '@nestjs/common';
import { config, CloudWatchLogs } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
}

@Injectable()
export class CloudwatchService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {
    config.update({
      region: configService.get<string>('AWS_REGION'), // aws region
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'), // aws access key id
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'), // aws secret access key
    });
  }

  putLogByGroup(group, userAgent, data): Promise<unknown> {
    const streamName = userAgent.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");

    return new Promise((resolve, reject) => {
      const cloudwatchLogs = new CloudWatchLogs();

      const streamParams = {
        logGroupName: group,
        logStreamName: streamName,
      };

      cloudwatchLogs.describeLogStreams({ logGroupName: streamName }, (err, data) => {
        if (err) console.log(err, err.stack);
        else {
          console.log(data); // TODO
        }
      });

      cloudwatchLogs.createLogStream(streamParams, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(data);
      });

      const params = {
        logEvents: [
          {
            timestamp: Date.now(),
            message: data,
          }
        ],
        logGroupName: group,
        logStreamName: streamName,
        // sequenceToken: '',
      };
      console.log('params')
      console.log(params)

      cloudwatchLogs.putLogEvents(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(data);
      });
    });
  }
}
