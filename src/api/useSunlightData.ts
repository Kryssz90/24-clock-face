import { useQuery } from "@tanstack/react-query"

const url = "https://api.sunrisesunset.io/json?lat=59.946111&lng=10.756557"

interface SunlightResult<T extends string | Date> {
    date: T;
    sunrise: T;
    sunset: T;
    first_light: T;
    last_light: T;
    dawn: T;
    dusk: T;
    solar_noon: T;
    golden_hour: T;
    day_length: string;
    timezone: string;
    utc_offset: number;
}


interface SunlightResponse {
    results: SunlightResult<string>;
    status: string;
}

export const useSunlightData = () => {
    return useQuery<SunlightResult<Date>>({
        queryKey: ["sunlightData"],
        queryFn: async () => {
            const request = await fetch(url)
            const response = await request.json() as SunlightResponse;
            return {
                ...response.results,
                date: new Date(response.results.date),
                sunrise: new Date(`${response.results.date} ${response.results.sunrise}`),
                sunset: new Date(`${response.results.date} ${response.results.sunset}`),
                first_light: new Date(`${response.results.date} ${response.results.first_light}`),
                last_light: new Date(`${response.results.date} ${response.results.last_light}`),
                dawn: new Date(`${response.results.date} ${response.results.dawn}`),
                dusk: new Date(`${response.results.date} ${response.results.dusk}`),
                solar_noon: new Date(`${response.results.date} ${response.results.solar_noon}`),
                golden_hour: new Date(`${response.results.date} ${response.results.golden_hour}`),
            }
        }
    });
}
