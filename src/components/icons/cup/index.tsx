import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { IconType } from "../type"

const Cup = ({ size }: IconType) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <Path
        d="M10.625 13.75v1.75"
        stroke="url(#paint0_linear_677_2591)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.458 18.334h8.333V17.5c0-.916-.75-1.666-1.666-1.666h-5c-.917 0-1.667.75-1.667 1.666v.834z"
        stroke="url(#paint1_linear_677_2591)"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M5.625 18.334h10M10.5 13.333A5.83 5.83 0 014.667 7.5V5A3.332 3.332 0 018 1.667h5A3.332 3.332 0 0116.334 5v2.5a5.83 5.83 0 01-5.834 5.833z"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.059 9.708a4.049 4.049 0 01-1.609-1c-.75-.833-1.25-1.833-1.25-3 0-1.166.917-2.083 2.084-2.083h.541a3.13 3.13 0 00-.25 1.25v2.5c0 .833.175 1.617.484 2.333zM15.941 9.708a4.049 4.049 0 001.609-1c.75-.833 1.25-1.833 1.25-3a2.063 2.063 0 00-2.084-2.083h-.541c.166.383.25.808.25 1.25v2.5c0 .833-.175 1.617-.484 2.333z"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_677_2591"
          x1={10.625}
          y1={14.625}
          x2={11.625}
          y2={14.625}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#232526" />
          <Stop offset={1} stopColor="#434343" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_677_2591"
          x1={6.45801}
          y1={17.0835}
          x2={14.7913}
          y2={17.0835}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#232526" />
          <Stop offset={1} stopColor="#434343" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default React.memo(Cup)
