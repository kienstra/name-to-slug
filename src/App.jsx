import { useEffect, useState } from 'react'
import React from 'react'

function toSlug(x) {
  return x
    ?.toLowerCase()
    .replace( /[^\w ]+/g, '' )
    .replace( / +/g, '-' )
    .replace( /_+/g, '-' )
}

export default function App() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')

  useEffect(() => {
    setSlug(toSlug(name))
  }, [name])

  return (
    <div>
      <label htmlFor="field-name">
        Name
      </label>
      <input
        type="text"
        id="field-name"
        value={name}
        onChange={(event) => {
          event.preventDefault()
          setName(event.target.value)
        }}
      />
      <p>Slug {slug}</p>
    </div>
  )
}
