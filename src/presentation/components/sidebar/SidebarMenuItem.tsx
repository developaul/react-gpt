import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Route } from '../../../interfaces'

interface Props {
  route: Route
}

export const SidebarMenuItem: FC<Props> = ({ route }) => {
  return (
    <NavLink
      key={route.to}
      to={route.to}
      className={({ isActive }) =>
        isActive ? "flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors" : "flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors"
      }
    >
      <i className={`${route.icon} text-2xl mr-4`}></i>
      <div className="flex flex-col flex-grow">
        <span className="text-white text-lg font-semibold">
          {route.title}
        </span>
        <span className="text-sm text-gray-400">
          {route.description}
        </span>
      </div>
    </NavLink>
  )
}
