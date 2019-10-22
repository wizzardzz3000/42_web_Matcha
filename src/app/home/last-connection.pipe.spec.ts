import { LastConnectedTimeFormatPipe } from '../pipes/last-connection.pipe';

describe('LastConnectedTimeFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new LastConnectedTimeFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
