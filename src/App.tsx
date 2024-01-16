import React from 'react';
import { Circle } from './svg/Circle';
import { Svg } from './svg/Svg';
import { Line } from './svg/Line';
import { Text } from './svg/Text';
import { useSunlightData } from './api/useSunlightData';
import { Arc } from './svg/Arc';
import { OutlinedLine } from './svg/OutlinedLine';

const hourDegree = 360 / 24;
const minuteDegree = 360 / 60;

const colors = {

  pageBackground: '#202020',  // Grey background

  night: '#2B4865',           // Lighter deep blue for night
  firstLightToDawn: '#6B8BA4', // Lighter blue for first light to dawn
  dawnToSunrise: '#8CA1B8',   // Lighter soft blue for dawn to sunrise
  daytime: '#B4C4CE',         // Lighter grey-blue for daytime
  sunsetToDusk: '#B0A6A0',    // Lighter warm grey for sunset to dusk
  duskToLastLight: '#7C7576',  // Lighter dark grey for dusk to last light

  backgroundFill: '#303030',  // Grey background

  hourHand: '#D0D0D0',        // Black hour hand
  minuteHand: '#D0D0D0',      // Black minute hand
  secondHand: '#D0D0D0',      // Black second hand
}

function convertDateToAngle(date: Date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const millisecond = date.getMilliseconds();

  const hourAngle = hour + minute / 60 + second / 3600 + millisecond / 3600000

  return hourAngle * hourDegree;
}

function App() {

  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  const millisecond = time.getMilliseconds();

  const hourAngle = hour + minute / 60 + second / 3600 + millisecond / 3600000
  const minuteAngle = minute + second / 60 + millisecond / 60000 + 30
  const secondsAngle = second + 30




  return (
    <div className="App">
      <Svg fill={colors.pageBackground}>
        <Circle r={0.9} stroke="black" strokeWidth={1} fill={colors.backgroundFill} />
        <SunlightArcs />
        <Circle r={0.02} fill="black" />
        {new Array(60).fill(0).map((_, i) => (
          <Line r1={0.78} r2={0.8} angle={i * minuteDegree} stroke="black" strokeWidth={0.1} />
        ))}
        {new Array(12).fill(0).map((_, i) => (
          <OutlinedLine r1={0.75} r2={0.8} angle={i * hourDegree * 2} strokeColor="black" strokeWidth={0.4} fillColor="green" thickness={1} />
        ))}
        {new Array(4).fill(0).map((_, i) => (
          <OutlinedLine r1={0.7} r2={0.8} angle={i * hourDegree * 6} strokeColor="black" strokeWidth={0.4} fillColor="green" thickness={1} />
        ))}
        {new Array(24).fill(0).map((_, i) => (
          <Text r={0.85} angle={i * hourDegree} fontSize={3} fill="black">{i}</Text>
        ))}
        <Line r1={0} r2={0.5} angle={hourAngle * hourDegree} stroke={colors.hourHand} strokeWidth={0.5} />
        <Line r1={0} r2={0.7} angle={minuteAngle * minuteDegree} stroke={colors.minuteHand} strokeWidth={0.3} />
        <Line r1={0} r2={0.8} angle={secondsAngle * minuteDegree} stroke={colors.secondHand} strokeWidth={0.1} />
      </Svg>
    </div>
  );
}

const arcStart = 0.61;
const arcEnd = 0.89;

const SunlightArcs = () => {
  const { data: sunlightData } = useSunlightData();

  if (!sunlightData) {
    return null;
  }

  const { sunrise, sunset, dawn, dusk, first_light, last_light, solar_noon } = sunlightData;


  const zeroAngle = 0;
  const firstLightAngle = convertDateToAngle(first_light);
  const dawnAngle = convertDateToAngle(dawn);
  const sunriseAngle = convertDateToAngle(sunrise);
  const solarNoonAngle = convertDateToAngle(solar_noon);
  const sunsetAngle = convertDateToAngle(sunset);
  const duskAngle = convertDateToAngle(dusk);
  const lastLightAngle = convertDateToAngle(last_light);
  const fullAngle = 360;

  const solarNoon = convertDateToAngle(solar_noon);

  return (
    <>
      <Arc r0={arcStart} r1={arcEnd} angle0={zeroAngle} angle1={firstLightAngle} fill={colors.night} />
      <Arc r0={arcStart} r1={arcEnd} angle0={firstLightAngle} angle1={dawnAngle} fill={colors.firstLightToDawn} />
      <Arc r0={arcStart} r1={arcEnd} angle0={dawnAngle} angle1={sunriseAngle} fill={colors.dawnToSunrise} />
      <Arc r0={arcStart} r1={arcEnd} angle0={sunriseAngle} angle1={solarNoonAngle} fill={colors.daytime} />
      <Arc r0={arcStart} r1={arcEnd} angle0={solarNoonAngle} angle1={sunsetAngle} fill={colors.daytime} />
      <Arc r0={arcStart} r1={arcEnd} angle0={sunsetAngle} angle1={duskAngle} fill={colors.sunsetToDusk} />
      <Arc r0={arcStart} r1={arcEnd} angle0={duskAngle} angle1={lastLightAngle} fill={colors.duskToLastLight} />
      <Arc r0={arcStart} r1={arcEnd} angle0={lastLightAngle} angle1={fullAngle} fill={colors.night} />
      <Line r1={0.8} r2={0.89} angle={solarNoon} stroke="yellow" strokeWidth={0.5} />
    </>);
}

export default App;
