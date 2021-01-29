import { OperatorDomain } from '../'
import { operatorsFactory } from 'test/factories'

describe('OperatorDomain', () => {
  describe('getOperatorById', () => {
    it('returns the operator object from the list', () => {
      expect(OperatorDomain.getOperatorById(operatorsFactory, '1')).toEqual(
        operatorsFactory[0]
      )
    })
  })
})
