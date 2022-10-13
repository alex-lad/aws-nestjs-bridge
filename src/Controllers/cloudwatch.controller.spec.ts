import { Test, TestingModule } from '@nestjs/testing';
import { CloudwatchController } from './cloudwatch.controller';
import { CloudwatchService } from '../Services/cloudwatch.service';

describe('AppController', () => {
  let appController: CloudwatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CloudwatchController],
      providers: [CloudwatchService],
    }).compile();

    appController = app.get<CloudwatchController>(CloudwatchController);
  });

  describe('root', () => {
    it('should put logs', () => {
      // TODO
    });
  });
});
