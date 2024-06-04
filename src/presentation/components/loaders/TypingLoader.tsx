import { FC } from 'react'
import './TypingLoader.css'

interface Props {
  className?: string
}

export const TypingLoader: FC<Props> = ({ className }) => {
  return (
    <div className={`typing ${className ?? ''}`}>
      <span className="circle scaling"></span>
      <span className="circle scaling"></span>
      <span className="circle scaling"></span>
    </div>
  )
}
