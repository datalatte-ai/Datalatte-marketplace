import axios, { AxiosResponse } from 'axios'
import rateAsset, { RatingResponse } from '../../../src/utils/rateAsset'
import web3 from '../__mocks__/web3'

jest.mock('axios')

describe('rateAsset()', () => {
  it('success', async () => {
    ;(axios.post as any).mockResolvedValueOnce({
      data: ['4.0', 1]
    } as AxiosResponse)

    const response: RatingResponse | string = await rateAsset('0x00', web3, 5)
    expect(response && response[0]).toBe('4.0')
  })

  it('string return', async () => {
    ;(axios.post as any).mockResolvedValueOnce({
      data: 'Missing signature'
    } as AxiosResponse)

    const response: RatingResponse | string = await rateAsset('0x00', web3, 5)
    expect(response && response).toBe('Missing signature')
  })

  it('error catch', async () => {
    ;(axios.post as any).mockResolvedValueOnce({
      data: {}
    } as AxiosResponse)

    const response: RatingResponse | string = await rateAsset(
      '0x00',
      {} as any,
      5
    )
    expect(response && response).toContain('Error: ')
  })
})
