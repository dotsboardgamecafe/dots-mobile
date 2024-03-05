import React from "react"

export type FilterItemType = {
  label: string,
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
  onPress?: () => void
}