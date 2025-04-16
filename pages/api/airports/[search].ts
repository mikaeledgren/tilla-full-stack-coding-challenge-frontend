import { NextApiRequest, NextApiResponse } from 'next'

import { allAirports, searchAirports, SearchAirportsResponse } from '../../../models/airport'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { search, page } = req.query

  if (search === '') {
    const all = await allAirports()
    const response: SearchAirportsResponse = {
      airports: all,
      hasNext: false,
      page: 1,
      totalPages: 1,
      totalCount: all.length,
    }
    res.status(200).json(response)
  }

  let pageNumber = Number(page)
  const response = await searchAirports(
    search.toString(),
    isFinite(pageNumber) ? pageNumber : undefined
  )
  const airports = response !== undefined ? response : []

  res.status(200).json(airports)
}
