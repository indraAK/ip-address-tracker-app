import { useState, useRef } from "react";
import iconArrow from "./images/icon-arrow.svg";
import useFetch from "./hooks/useFetch";
import Map from "./components/Map";

function App() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  let url = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`;

  if (value) {
    if (isValidDomain(value)) {
      url = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&domain=${value}`;
    } else {
      url = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&ipAddress=${value}`;
    }
  }

  const { data, error, isFetching } = useFetch(url);
  let ip, isp, location;

  if (data) {
    ({ ip, isp, location } = data);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    setValue(inputRef.current.value.toLowerCase());
  }

  function isValidDomain(domain) {
    const regex =
      /((ftp|http|https):\/\/)?([a-z0-9]+\.)?([a-z0-9][a-z0-9-]*)?((\.[a-z]{2,6})|(\.[a-z]{2,6})(\.[a-z]{2,6}))$/i;
    return regex.test(domain.toLowerCase());
  }

  return (
    <>
      <div className="hero w-full h-[300px] min-h-[300px] md:h-auto md:min-h-[200px] bg-hero-pattern bg-no-repeat bg-cover bg-center pt-7">
        <div className="container mx-auto px-2 h-full flex flex-col items-center relative">
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            IP Address Tracker
          </h1>
          {/* form */}
          <form
            onSubmit={handleSubmitForm}
            className="w-full max-w-[400px] flex items-stretch h-[45px] min-h-[45px] mt-7 md:max-w-[500px]"
          >
            <div className="flex-1 h-full">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for any IP address or domain"
                className="rounded-l-lg block w-full h-full py-[10px] px-4 focus:outline-none placeholder-gray-500 placeholder-opacity-75 border border-transparent focus:border-[#2b2b2b] focus:shadow transition"
              />
            </div>
            <button
              type="submit"
              className="flex h-full justify-center items-center min-w-[45px] bg-[#2b2b2b] rounded-r-lg md:min-w-[55px]"
            >
              <img src={iconArrow} alt="Icon Arrow" />
            </button>
          </form>

          {/* detail informations */}
          <div className="w-full relative bottom-0 md:translate-y-1/2 mt-10 md:mt-0 z-20">
            <ul className="info-list w-full max-w-[992px] mx-auto bg-white p-5 md:p-7 shadow-lg rounded-md flex flex-col md:flex-row">
              <li>
                <p className="info-name">IP ADDRESS</p>
                {isFetching && <p className="info-detail">Loading...</p>}
                {error && <p className="info-detail">-</p>}
                {data && <p className="info-detail">{ip && ip}</p>}
              </li>
              <li>
                <p className="info-name">LOCATION</p>
                {isFetching && <p className="info-detail">Loading...</p>}
                {error && <p className="info-detail">-</p>}
                {data && (
                  <p className="info-detail">
                    {location &&
                      `${location.city}, ${location.country} ${location.postalCode}`}
                  </p>
                )}
              </li>
              <li>
                <p className="info-name">TIMEZONE</p>
                {isFetching && <p className="info-detail">Loading...</p>}
                {error && <p className="info-detail">-</p>}
                {data && (
                  <p className="info-detail">{location && location.timezone}</p>
                )}
              </li>
              <li>
                <p className="info-name">ISP</p>
                {isFetching && <p className="info-detail">Loading...</p>}
                {error && <p className="info-detail">-</p>}
                {data && <p className="info-detail">{isp && isp}</p>}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* map */}
      {isFetching && (
        <p className="md:mt-[100px] mt-[200px] text-center text-gray-500">
          Loading...
        </p>
      )}
      {error && (
        <p className="md:mt-[100px] mt-[200px] text-center text-gray-500">
          Invalid IP Address or Domain.
        </p>
      )}
      {data && (
        <Map
          position={[data.location.lat, data.location.lng]}
          location={data.location}
        />
      )}
    </>
  );
}

export default App;
