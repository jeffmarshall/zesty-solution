import React from 'react'
import api from 'components/api'


export default function(props) {
  let {
    propertyId
  } = props

  return (
    <img
      src={`${api.defaults.baseURL}/display/${propertyId}`}
      alt=""
      {...props}
    />
  )
}
