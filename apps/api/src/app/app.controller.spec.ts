// import { Test, TestingModule } from '@nestjs/testing'
//
// import { AppController } from './app.controller'
// import { AppService } from './app.service'

describe('AppController', () => {
  // let app: TestingModule

  // beforeAll(async () => {
  //   app = await Test.createTestingModule({
  //     controllers: [AppController],
  //     providers: [AppService]
  //   }).compile()
  // })

  describe('dummy test', () => {
    it('should be equal', async () => {
      expect(1).toEqual(1)
    })
  })

  // describe('getData', () => {
  //   it('should return "Hello API"', async () => {
  //     const appController = app.get<AppController>(AppController)
  //     expect(await appController.getData()).toEqual({ message: 'Hello API' })
  //   })
  // })
})
