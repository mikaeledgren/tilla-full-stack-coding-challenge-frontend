import airports from '../data/airports.json'
import Airport from '../types/airport'

export const findAirportByIata = async (iata: string): Promise<Airport | undefined> => {
  return airports.find((airport) => airport.iata === iata.toUpperCase())
}

export const allAirports = async (): Promise<Airport[]> => {
  return airports
}

export const searchAirports = async (
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<SearchAirportsResponse> => {
  const regex = new RegExp(query, 'i')

  const filteredAirports = airports.filter(
    (airport) =>
      regex.test(airport.iata) ||
      regex.test(airport.name) ||
      regex.test(airport.city) ||
      regex.test(airport.country)
  )

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const totalPages = Math.ceil(filteredAirports.length / limit)
  const totalCount = filteredAirports.length
  const hasNext = totalCount > endIndex

  return {
    airports: filteredAirports.slice(startIndex, endIndex),
    hasNext,
    page,
    totalPages,
    totalCount,
  }
}

export type SearchAirportsResponse = {
  page: number
  totalCount: number
  totalPages: number
  hasNext: boolean
  airports: Airport[]
}
