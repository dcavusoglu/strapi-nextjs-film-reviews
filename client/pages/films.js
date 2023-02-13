import { fetcher } from "../lib/api"
import { useState } from 'react';
import Layout from "../components/Layout"
import Films from "../components/Films"
import useSWR from 'swr'
const FilmList = ({films}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=${pageIndex}&pagination[pageSize]=5`,
    fetcher,
    {
      fallbackData: films,
    }
  );

  return (
    <Layout>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Films
        </span>
      </h1>
      <Films films={data}/>

      <div className="space-x-2 space-y-2">
        <button
          className={`md:p-2 rounded py-2 text-black p-2 ${ pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400' }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex-1)}
          >
          { ' ' } Previous
        </button>

        <button
          className={`md:p-2 rounded py-2 text-black p-2 ${ pageIndex === (data && data.meta.pagination.pageCount) ? 'bg-gray-300' : 'bg-blue-400' }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex+1)}
        >
          Next
        </button>
        <span>
          {`${pageIndex} of ${
          data && data.meta.pagination.pageCount
          }`}
        </span>
      </div>
    </Layout>
  )
}


export default FilmList

export async function getStaticProps() {
  const filmsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=${pageIndex}&pagination[pageSize]=5`);
  console.log(filmsResponse.data);
  return {
    props: {
      films: filmsResponse
    }
  }
}
