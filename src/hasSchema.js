export default function hasSchema(schema, d) {
  return typeof schema === 'object'
    ? Object.entries(schema).every(([k, v]) => {
      return hasSchema(v, d[k])
    })
    : typeof d === typeof schema
}
