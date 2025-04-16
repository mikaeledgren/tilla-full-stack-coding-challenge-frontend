import { NextPage } from 'next'
import Link from 'next/link'
import { ChangeEventHandler, useState } from 'react'

import Layout from '../components/layout'
import useApiData from '../hooks/use-api-data'
import { SearchAirportsResponse } from '../models/airport'

const Page: NextPage = () => {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState<string>('')

  const response = useApiData<SearchAirportsResponse>(
    `/api/airports${query ? `/${query}` : ''}?page=${page}`,
    {},
    [query, page],
    1000
  )
  const airports = response?.airports || []
  const totalCount = response?.totalCount || 0

  const pages = Array.from({ length: response.totalPages }).map((_, i) => i + 1)

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value)
    setPage(1)
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Code Challenge: Airports</h1>

      <div className="mt-1 relative shadow-sm">
        <input
          type="text"
          name="query"
          id="query"
          className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 text-gray-800 rounded bg-gray-50 p-3"
          placeholder="Search by name, IATA, city, or country"
          onChange={handleQueryChange}
        />
      </div>

      <h2 className="mt-10 text-xl font-semibold flex items-center gap-2">
        Airports
        <span className="bg-blue-400 px-3 py-1 rounded-full text-white text-sm">{totalCount}</span>
      </h2>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 mt-5">
        {airports.map((airport) => (
          <Link
            className="flex flex-col gap-y-2 justify-between items-start p-5 text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            href={`/airports/${airport.iata.toLowerCase()}`}
            key={airport.iata}
          >
            <span>
              {airport.name}, {airport.city}
            </span>
            <span className=" text-gray-500">{airport.country}</span>
          </Link>
        ))}
      </div>

      <div className="flex gap-2 py-4">
        {pages &&
          (pages.length < 5 ? (
            pages.map((page) => (
              <button key={page} onClick={() => setPage(page)}>
                {page}
              </button>
            ))
          ) : (
            <>
              {pages.slice(0, 2).map((page) => (
                <button key={page} onClick={() => setPage(page)}>
                  {page}
                </button>
              ))}
              <span>...</span>
              {pages
                .reverse()
                .slice(0, 2)
                .reverse()
                .map((page) => (
                  <button key={page} onClick={() => setPage(page)}>
                    {page}
                  </button>
                ))}
            </>
          ))}
      </div>
    </Layout>
  )
}

export default Page
