import React from 'react'

const ChildComponent = (props, ref) => {
  return (
    <div>
      <input ref={ref} />
    </div>
  )
}

export default forwardRef(ChildComponent)
