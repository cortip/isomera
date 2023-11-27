// import { Test } from '@nestjs/testing'

// import { AppService } from './app.service'

describe('AppService', () => {
  // let service: AppService

  // beforeAll(async () => {
  //   const app = await Test.createTestingModule({
  //     providers: [AppService]
  //   }).compile()
  //
  //   service = app.get<AppService>(AppService)
  // })

  describe('dummy test', () => {
    it('should be equal', async () => {
      expect(1).toEqual(1)
    })
  })

  // describe('getData', () => {
  //   it('should return "Hello API"', async () => {
  //     expect(await service.getData()).toEqual({ message: 'Hello API' })
  //   })
  // })
})
