import { generateURL, GET, getXDepartures, getXDeparturesPoll } from './api'

describe('GenerateURL function', () => {
  it('should produce full url with query params from given URL path & query params object', () => {
    expect(generateURL('https://busbud.com/bla', { hello: 'earth', goodbye: 'moon' }))
      .toBe('https://busbud.com/bla?hello=earth&goodbye=moon')
  })
})

describe('GET function', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should send request and retrive data from server', async () => {
    const mockedResponse = { data: { ok: true }}
    fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))

    const result = await GET('https://url.com?hello=goodbye')

    expect(result).toEqual(mockedResponse)
  })

  it('should console log the error', () => {
    console.error = jest.fn()
    fetchMock.mockRejectOnce(Error('some error'))

    const fn = async () => await GET('error!!intheurl')

    expect(fn).not.toThrow(/some error/)
  })
})

describe('getXDepartures function', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should send request for departures', async () => {
    const departures = [{ id: '10' }, { id: '20' }]
    const mockedResponse = { departures, complete: true }

    fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))

    const result = await getXDepartures({
      origin: 'fffff', destination:'fffff', outboundDate: '2020-11-08'
    })

    expect(result.departures.length).toBe(2)
  })
})

describe('getXDeparturesPoll function', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should send request for departures', async () => {
    const departures = [{ id: '10' }, { id: '20' }]
    const mockedResponse = { departures, complete: true }

    fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))

    const result = await getXDeparturesPoll({
      origin: 'fffff', destination:'fffff', outboundDate: '2020-11-08'
    }, { index: '10' })

    expect(result.departures.length).toBe(2)
  })
})