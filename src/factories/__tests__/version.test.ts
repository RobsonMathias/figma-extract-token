import { InitializerFactory } from '../initializer'
import { VersionFactory } from '../version'
import { VERSION_MOCK } from '../../__mock__/version'

describe('VersionVersionFactory', () => {
  it('should create successfully', () => {
    const main = new InitializerFactory()
    const factory = new VersionFactory(main)
    factory.call(VERSION_MOCK as any)
    expect(factory.json).toEqual({
      current: {
        created_at: '2021-02-13T20:30:27Z',
        description:
          '- Add deprecated comment\n- Create Shadow style extract\n- Change POC structure',
        id: '677126762',
        label: 'Release Version - First Step',
        thumbnail_url:
          'https://s3-alpha-sig.figma.com/thumbnails/beaf5016-75da-4323-aea9-f89d7acd5dd7?Expires=1614556800&Signature=eq8YF6LE8~BM6Zz7rOH-6yzI7WSAFaHW9ojMqttB0yKXjK6Y3QFRQdDpTv9fKSfWBfKa3vDoIfNcA7zuIZvqxuWWcNOA5AosIZxHzI-ep~AqaVr2w6d6pfTLz0e2KXWAiH7a8Oi0g6XtqHj1-1REWhKWeJ38kNFsVheuW2cu~0BQAPLiA-YnewIlscqJNrfkJNzdNEE22OkvuRQSVs9tJxVYOvbTvrpvGqCDRI~Ncb-P1LWLWMRK2BUf9icl154xx2MpFAQqvwA1hnV1SoYslQ1t0k6~8oTJ7EfHujXI0nz2KgUz1tS37wvdsdvW~n07JjP1tRBEF-4xyAxqxmV2TQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        user: {
          handle: 'Robson Mathias',
          id: '822874519498276169',
          img_url:
            'https://www.gravatar.com/avatar/6c5d8340605a0b7129e609ff059d876a?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_r_v2.png',
        },
      },
      all: [
        {
          created_at: '2021-02-13T20:30:27Z',
          description:
            '- Add deprecated comment\n- Create Shadow style extract\n- Change POC structure',
          id: '677126762',
          label: 'Release Version - First Step',
          thumbnail_url:
            'https://s3-alpha-sig.figma.com/thumbnails/beaf5016-75da-4323-aea9-f89d7acd5dd7?Expires=1614556800&Signature=eq8YF6LE8~BM6Zz7rOH-6yzI7WSAFaHW9ojMqttB0yKXjK6Y3QFRQdDpTv9fKSfWBfKa3vDoIfNcA7zuIZvqxuWWcNOA5AosIZxHzI-ep~AqaVr2w6d6pfTLz0e2KXWAiH7a8Oi0g6XtqHj1-1REWhKWeJ38kNFsVheuW2cu~0BQAPLiA-YnewIlscqJNrfkJNzdNEE22OkvuRQSVs9tJxVYOvbTvrpvGqCDRI~Ncb-P1LWLWMRK2BUf9icl154xx2MpFAQqvwA1hnV1SoYslQ1t0k6~8oTJ7EfHujXI0nz2KgUz1tS37wvdsdvW~n07JjP1tRBEF-4xyAxqxmV2TQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          user: {
            handle: 'Robson Mathias',
            id: '822874519498276169',
            img_url:
              'https://www.gravatar.com/avatar/6c5d8340605a0b7129e609ff059d876a?size=240&default=https%3A%2F%2Fs3-alpha.figma.com%2Fstatic%2Fuser_r_v2.png',
          },
        },
      ],
    })
  })
})
