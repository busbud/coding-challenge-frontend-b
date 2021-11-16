import Image from 'next/image'
import { FC } from 'react'

const LoadingBus: FC = () => (
  <Image
    src="https://i.pinimg.com/originals/40/b0/eb/40b0eb6ebf29df527a0c080cc1227f6b.gif"
    alt="moving bus"
    width={100}
    height={500}
  />
)

export default LoadingBus
