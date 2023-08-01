'use client'
import Image from 'next/image'
import header from './assets/BG1.png'
import BG from './assets/BG2.png'
import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import loader from './assets/spinner.gif'

export default function Home () {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  const fetchWeather = event => {
    event.preventDefault()
    setLoading(true)
    axios.get(url).then(response => {
      setWeather(response.data)
      setCity('')
      console.log(response.data)
    })
    setLoading(false)
  }

  if (loading) {
    return (
      <div>
        <Image
          className='w-[200px] m-auto block'
          src={loader}
          alt='loading...'
        />
      </div>
    )
  } else {
    return (
      <div>
        <Image src={BG} layout='fill' alt={''} className='object-cover' />
        <Image src={header} alt={''} className='relative mx-auto' />

        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10'>
          <form
            onSubmit={fetchWeather}
            className='flex justify-between items-cener w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'
          >
            <div>
              <input
                onChange={event => setCity(event.target.value)}
                className='bg-transparent border-none text-white focus:outline-none text-2xl'
                type='text'
                placeholder='Search City'
              />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={25} />
            </button>
          </form>
        </div>
        <div>
          {weather.main && (
            <div className='relative flex flex-col justify-between max-w-[500px] w-full h-[50vh] m-auto p-4 z-10'>
              <div className='relative flex justify-between pt-12  text-gray-300'>
                <div className='flex flex-col items-center'>
                  <Image
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt='/'
                    width='100'
                    height='100'
                  />
                  <p className='text-2xl'>{weather.weather[0].main}</p>
                </div>
                <p className='text-9xl'>{weather.main.temp.toFixed(0)}&#176;</p>
              </div>
              <div className='bg-white/50 relative p-8 rounded-md text-black-300'>
                <p className='text-2xl text-center pb-6'>
                  Weather in {weather.name}
                </p>
                <div className='flex justify-between text-center'>
                  <div>
                    <p className='font-bold text-2xl'>
                      {weather.main.feels_like.toFixed(0)}&#176;
                    </p>
                    <p className='text-xl'>Feels Like</p>
                  </div>
                  <div>
                    <p className='font-bold text-2xl'>
                      {weather.main.humidity}%
                    </p>
                    <p className='text-xl'>Humidity</p>
                  </div>
                  <div>
                    <p className='font-bold text-2xl'>
                      {weather.wind.speed.toFixed(0)} MPH
                    </p>
                    <p className='text-xl'>Winds</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
