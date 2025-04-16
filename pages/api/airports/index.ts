import { NextApiRequest, NextApiResponse } from 'next'
import { searchAirports } from '../../../models/airport'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query
  let pageNumber = Number(page)

  const response = await searchAirports('', pageNumber)
  res.status(200).json(response)
}
