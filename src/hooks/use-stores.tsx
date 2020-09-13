import React from 'react'
import { rootStoreContext } from 'contexts'

export const useStores = () => React.useContext(rootStoreContext)