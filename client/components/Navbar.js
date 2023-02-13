import Link from "next/link"
import { useUser } from '../lib/authContext';
import { fetcher } from '../lib/api';
import { setToken, unsetToken } from '../lib/auth';
import { useState } from "react";
const Navbar = () => {

  const { user, loading } = useUser();
  const [ data, setData] = useState({
    identifier: '',
    password:''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local)`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: ({
        identifier: data.identifier,
        password: data.password
      })
    });
    setToken(data);
  };

  const logout = () => {
    unsetToken();
  }

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  return (
    <nav className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white
        ">
      <div>
        <Link href="/" passHref>
          <span>
            <img
              className="m-3"
              src="/strapi-logo.png"
              width={200}
              height={50}
              alt="Strapi Logo"
            />
          </span>
        </Link>
      </div>
      <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between
              md:pt-0 space-x-2"
        >
          <li>
            <Link href="/">
              <span className="md:p-2 py-2 block hover:text-purple-400">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/films">
              <span className="md:p-2 py-2 block hover:text-purple-400" href="#">
                Films
              </span>
            </Link>
          </li>
          {!loading &&
          ( user ? (
            <li>
              <Link href="/profile" className="md:p-2 py-2 block hover:text-purple-400">
                Profile
              </Link>
            </li>
          ) : (
            ""
          ))
          }
          {!loading &&
          ( user ? (
            <li>
              <Link onClick={logout} style={{cursor: 'pointer'}} className="md:p-2 py-2 block hover:text-purple-400">
                Log out
              </Link>
            </li>
          ) : (
            ""
          ))
          }

           {!loading && !user ? (
            <>
              <li>
                <form onSubmit={handleSubmit} className="form-inline">
                  <input
                    type="text"
                    name="identifier"
                    onChange={handleChange}
                    placeholder="Username"
                    className="md:p-2 form-input py-2 rounded mx-2"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    className="md:p-2 form-input py-2 rounded mx-2"
                    required
                  />

                  <button
                    className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </li>
              <li>
                <Link href="/register">
                  <span className="md:p-2 block py-2 hover:text-purple-400 text-black">
                    Register
                  </span>
                </Link>
              </li>
            </>
          ) : (
            ''
          )}

        </ul>
      </div>
    </nav>

  )
}

export default Navbar
