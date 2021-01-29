import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { SearchDomain } from '../../domain/search'
import { searchDomainClassFactory } from 'test/factories'
import SearchService from '../searchService'

const mockAxios = new MockAdapter(axios)

mockAxios.onGet().reply(200)

describe('SearchService', () => {
  const service = SearchService(
    SearchDomain.Search.start(searchDomainClassFactory)
  )
  it('returns fetch and poll method', () => {
    expect(service).toHaveProperty('poll')
    expect(service).toHaveProperty('fetch')
  })
  it('call axios twice', async () => {
    await service.fetch()
    await service.poll(0)
    expect(mockAxios.history.get.length).toBe(2)
  })
})
