import { NextApiRequest, NextApiResponse } from 'next'

import { allAirports, SearchAirportsResponse } from '../../../models/airport'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const airports = await allAirports()
  const response: SearchAirportsResponse = {
    airports,
    hasNext: false,
    page: 1,
    totalPages: 1,
    totalCount: airports.length,
  }

  res.status(200).json(response)
}
