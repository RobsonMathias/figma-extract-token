import {Paint} from '../../interfaces';
import {Style} from '../style';

describe('Style', () => {
  it('should convert fills to style', () => {
    const given: Paint[] = [{
      "blendMode": "NORMAL",
      "type": "SOLID",
      "color": {"r": 0.3843137323856354, "g": 0, "b": 0.9333333373069763, "a": 1}
    }];
    const when = Style.fills(given);
    expect(when).toEqual('rgba(98, 0, 238, 1)');
  });

  it('should convert value by unit', () => {
    const when = Style.valueByUnit('12', 'PIXELS');
    expect(when).toEqual('12px');
  });
});
