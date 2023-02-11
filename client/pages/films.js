import { fetcher } from "../lib/api"
import Layout from "../components/Layout"
import Films from "../components/Films"

const FilmList = ({films}) => {
  return (
    <Layout>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
        </span>
      </h1>
      <Films films={films}/>
    </Layout>
  )
}


export default FilmList

export async function getStaticProps() {
  const filmsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films`);
  console.log(filmsResponse.data);
  return {
    props: {
      films: filmsResponse
    }
  }
}
