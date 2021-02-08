// import {composeFoundation} from '../compose-foundation';
// import {MainFactory} from '../../factories';
// import {CONFIG_MOCK_DEFAULT, FIGMA_MOCK_DEFAULT} from '../../__mock__';
// import {Config} from '../../interfaces';
//
// describe('composeFoundation', () => {
//   it('should compose foundation successfully', async () => {
//     /// should mock
//     const factory = new MainFactory();
//     factory.config = CONFIG_MOCK_DEFAULT as Config;
//     factory.json = FIGMA_MOCK_DEFAULT as any;
//     factory.foundation.call(factory.config.foundation);
//     factory.components.call(factory.config.components);
//     const result = await composeFoundation.task({factory: new MainFactory()});
//     expect(composeFoundation.title).toEqual('Composing foundation tokens');
//     expect(result).toEqual({ mocked: true });
//   });
// });
