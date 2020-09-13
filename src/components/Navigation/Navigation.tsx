import React from 'react'

const list = ['Page', 'Messages', 'Settings']

const Navigation = () => {
  return (
    <div>
      {
        list.map(name => <div>{name}</div>)
      }
    </div>
  )
}

export default Navigation