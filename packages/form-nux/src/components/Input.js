import React from 'react'
export default function Input ({ placeholder, onChange }) {
  return (
   <div style={{ padding: 10 }}>
     <input placeholder={placeholder} onChange={onChange}></input>
   </div>
  )
}
