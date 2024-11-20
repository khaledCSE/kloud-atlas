import Image from "next/image"

type Props = {
  screen?: 'large' | 'small'
  alt?: boolean
}

const Logo = ({ screen = 'large', alt }: Props) => {
  return (
    <div className={screen === 'large' ? 'hidden h-auto items-center gap-2 lg:flex' : 'flex items-center gap-2'}>
      <Image
        src={alt ? "/assets/icons/logo-brand-alt.svg" : "/assets/icons/logo-brand.svg"}
        alt='Logo'
        width={52}
        height={52}
        // className='hidden h-auto lg:block'
        className={screen === 'large' ? 'hidden h-auto lg:block' : 'h-auto lg:hidden'}
      />
      <span className={`text-2xl font-semibold ${alt ? 'text-white' : 'text-brand-600'}`}>Kloud Atlas</span>
    </div>
  )
}

export default Logo