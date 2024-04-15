import Link from 'next/link'
import Image from 'next/image'

interface ProductType {
  id: number
  section: string
  link: string[]
}

interface socialLinks {
  imgSrc: string
  link: string
  width: number
}

const socialLinks: socialLinks[] = [
  {
    imgSrc: '/assets/footer/facebook.svg',
    link: 'https://www.facebook.com/luan.lytunghien',
    width: 10
  },
  {
    imgSrc: '/assets/footer/insta.svg',
    link: 'www.instagram.com',
    width: 14
  },
  {
    imgSrc: '/assets/footer/twitter.svg',
    link: 'www.twitter.com',
    width: 14
  }
]

const products: ProductType[] = [
  {
    id: 1,
    section: 'About',
    link: ['Our Story', 'Mobile', 'Blog', 'How we work?']
  },
  {
    id: 2,
    section: 'Quick Links',
    link: ['Help/FAQ', 'Courses', 'My Account', 'Courses Dashboard']
  },
  {
    id: 3,
    section: 'Contact Us',
    link: [
      'Call Us: 08-xxxx-xxxx',
      'Address: Can Tho, Viet Nam',
      'Mail Us: help@knowlink.com'
    ]
  }
]

const Footer = () => {
  return (
    <div className="mx-auto max-w-2xl sm:pt-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="my-12 grid grid-cols-1 gap-y-10 sm:grid-cols-6 lg:grid-cols-12">
        {/* COLUMN-1 */}

        <div className="sm:col-span-6 lg:col-span-5">
          <div className="flex flex-shrink-0 items-center border-right">
            <Image
              src="/assets/logo/knowlink-logo.png"
              alt="logo"
              width={214}
              height={66}
            />
          </div>
          <h3 className="text-xs text-black dark:text-white font-medium text-gunmetalgray lh-160 mt-5 mb-4 lg:mb-16">
            {' '}
            Open an account in minutes, get full financial <br /> control for
            much longer.
          </h3>
          <div className="flex gap-4">
            {socialLinks.map((items, i) => (
              <Link href={items.link} key={i}>
                <div className="bg-white h-12 w-12 shadow-xl text-base rounded-full flex items-center justify-center footer-icons hover:bg-[#4f46e5]">
                  <Image
                    src={items.imgSrc}
                    alt={items.imgSrc}
                    width={14}
                    height={2}
                    style={{ width: 'auto', height: 'auto' }}
                    className="sepiaa"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CLOUMN-2/3/4 */}

        {products.map((product) => (
          <div key={product.id} className="sm:col-span-2">
            <p className="text-black dark:text-white text-lg font-medium mb-9">
              {product.section}
            </p>
            <ul>
              {product.link.map((link: string, index: number) => (
                <li key={index} className="mb-5">
                  <Link
                    href="/"
                    className="text-black  dark:text-[#e3e3e3] text-base font-normal mb-6 space-links"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* All Rights Reserved */}

      <div className="py-10 md:flex items-center justify-between border-t border-t-gray-blue">
        <h4 className="text-black  dark:text-white opacity-75 text-sm text-center md:text-start font-normal">
          @2024.KnowLink.All rights reserved
        </h4>
        <div className="flex gap-5 mt-5 md:mt-0 justify-center md:justify-start">
          <h4 className="text-black dark:text-white opacity-75 text-sm font-normal">
            <Link href="/" target="_blank">
              Privacy policy
            </Link>
          </h4>
          <div className="h-5 bg-dark-red opacity-25 w-0.5"></div>
          <h4 className="text-black  dark:text-white opacity-75 text-sm font-normal">
            <Link href="/" target="_blank">
              Terms & conditions
            </Link>
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Footer
