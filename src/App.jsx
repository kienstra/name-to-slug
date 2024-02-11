import { useRef, useReducer, useState } from 'react'
import React from 'react'
import hasSchema from './hasSchema'

function toSlug(x) {
  return x
    ?.toLowerCase()
    .replace( /[^\w ]+/g, '' )
    .replace( / +/g, '-' )
    .replace( /_+/g, '-' )
}

function validateSchema(schema, d) {
  if (!hasSchema(schema, d)) {
    throw new Error(`Data does not conform to schema.
      Schema: ${JSON.stringify(schema)}
      Data: ${JSON.stringify(d)}`)
  }

  return d
}

const initial = {
  isNew: true,
  name: '',
  slug: '',
  fields: {},
  autoSlugged: false,
}

function reducer(state, action) {
  return validateSchema(
    initial,
    {
      'NAME_CHANGE': {
        ...state,
        name: action.payload,
        autoSlugged: true,
        slug: state.isNew
          ? toSlug(action.payload)
          : state.slug,
      },
      'SLUG_CHANGE': {
        ...state,
        slug: action.payload,
      },
      'NAME_BLUR': {
        ...state,
        isNew: state.autoSlugged
          ? false
          : state.isNew,
      },
      'ADD': {
        ...state,
        fields: {
          ...state.fields,
          [state.slug]: state.name,
        },
        name: '',
        slug: '',
        isNew: true,
        autoSlugged: false,
      },
      'CLEAR': {
        ...state,
        name: '',
        slug: '',
        isNew: true,
        autoSlugged: false,
      }
    }[action.type]
  )
}

export default function App() {
  const ref = useRef()
  const [state, dispatch] = useReducer(
    reducer,
    initial
  )

  function selectInput() {
    if (ref.current !== ref.current?.ownerDocument.activeElement) {
      ref.current.select()
    }
  }

  function onNameChange(event) {
    dispatch({type: 'NAME_CHANGE', payload: event.target.value})
  }

  function onSlugChange(event) {
    dispatch({type: 'SLUG_CHANGE', payload: event.target.value})
  }

  function onNameBlur() {
    dispatch({type: 'NAME_BLUR'})
  }

  function onAdd() {
    selectInput()
    dispatch({type: 'ADD'})
  }

  function onClear() {
    selectInput()
    dispatch({type: 'CLEAR'})
  }

  return (
    <div>
      <label htmlFor="field-name">
        Field name
      </label>
      <input
        ref={ref}
        type="text"
        id="field-name"
        value={state.name}
        onChange={onNameChange}
        onBlur={onNameBlur}
      />
      <label htmlFor="field-slug">
        Field slug
      </label>
      <input
        type="text"
        id="field-slug"
        value={state.slug}
        onChange={onSlugChange}
      />
      <button onClick={onAdd}>
        Add
      </button>
      <button onClick={onClear}>
        Clear
      </button>
      <h2>Fields</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Slug</th>
        </tr>
        {Object.entries(state.fields).map(([k, v]) => {
          return <tr key={k}>
            <td>{v}</td>
            <td>{k}</td>
          </tr>
        })}
      </table>
    </div>
  )
}
