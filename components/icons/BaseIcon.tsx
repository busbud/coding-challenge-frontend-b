type Props = {
  imgData: string
  alt: string
  large?: boolean
}
import Image from 'next/image'

export default function BaseIcon({ imgData, alt, large }: Props) {
  return (
    <Image
      src={imgData}
      alt={alt}
      width={large ? 64 : 16}
      height={large ? 64 : 16}
    />
  )
}
