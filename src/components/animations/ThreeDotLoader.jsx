import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

function ThreeDotLoader({color="#ffff"}) {
  return (
    <ThreeDots
  visible={true}
  height="24"
  width="32"
  color={color}
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  )
}

export default ThreeDotLoader