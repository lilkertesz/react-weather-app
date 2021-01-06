// import React, { useState, useEffect } from "react";
// import styled from 'styled-components';
// import axios from "axios";
// import CurrentWeather from "./CurrentWeather";
// import HourlyForecast from "./HourlyForecast";
// import DailyForecast from "./DailyForecast";

// function Weather() {
//   const [location, setLocation] = useState({});

//   useEffect(() => {
//     axios.get("https://localhost:44386/api/location")
//     .then(async res => {
//         setLocation(res.data)
//     })
//     .catch((err) => {
//         console.log(err);
//     });         
//   }, [location])

//   return (
//     <React.Fragment>
//     {location !== undefined && 
//       <div>
//         <Fishing> The weather for {location.city}, {location.country} is: </Fishing>
//         <Container>
//         <CurrentWeather location={location} />
//         <HourlyForecast location={location} />
//         </Container>
//         <DailyForecast location={location} />
//       </div>
//     }
//     </React.Fragment>
//   )
// }

// const Fishing = styled.div`
//   margin: 20px;
//   color: white;
// `
// const Container = styled.div`
//   overflow: hidden;
//   width: 85%;
//   margin: auto;
//   `
// export default Weather
