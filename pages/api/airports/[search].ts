import { NextApiRequest, NextApiResponse } from 'next'

import { searchAirports } from '../../../models/airport'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { search, page } = req.query
  let pageNumber = Number(page)

  const response = await searchAirports(
    search.toString(),
    isFinite(pageNumber) ? pageNumber : undefined
  )
  const airports = response !== undefined ? response : []

  res.status(200).json(airports)
}
