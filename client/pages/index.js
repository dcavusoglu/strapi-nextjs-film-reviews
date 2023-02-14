import Layout from "../components/Layout";
import {useFetchUser} from "../lib/authContext";

export default function Home() {
  const {user, loading} = useFetchUser();
  return (
    <Layout user={user}>
      <h1 className="font-bold text-4xl">Hello next js!</h1>
    </Layout>
  )
}
