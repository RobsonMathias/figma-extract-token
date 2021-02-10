// import {when} from 'jest-when';
//
// const loadConfig = jest.fn();
// const composeArgs = jest.fn();
// const requiredArgs = jest.fn();
// const error = new Error('mocked');
// jest.mock('../../helpers', () => ({composeArgs, requiredArgs}));
// jest.mock('../../services', () => ({loadConfig}));
//
// import {composeComponents} from '../compose-components';
// import {InitializerFactory} from '../../factories';
// import {CONFIG_MOCK_DEFAULT, FIGMA_MOCK_DEFAULT} from '../../__mock__';
// import {Config} from '../../interfaces';
// import {composeFoundation} from '../compose-foundation';
//
// describe('composeComponents', () => {
//   it('should compose components successfully', async () => {
//     /// should mock
//     const factory = new InitializerFactory();
//     factory.config = CONFIG_MOCK_DEFAULT as Config;
//     factory.json = FIGMA_MOCK_DEFAULT as any;
//     factory.components.call(factory.config.components);
//     const result = await composeFoundation.task({factory: new InitializerFactory()});
//     expect(composeFoundation.title).toEqual('Composing foundation tokens');
//     expect(result).toEqual({ mocked: true });
//   });
// });
