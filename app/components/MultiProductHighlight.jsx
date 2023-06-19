import classNames from 'classnames'
import {useState} from 'react'
import { Link } from '~/components/Link'

const categories = [
  {
    title: 'Aprons',
    product: {
      title: 'The Classic',
      description: 'Ullamcorper elementum, justo est blandit libero, eu porttitor felis mauris ut purus. Sed pretium arcu nec mi placerat, ac posuere sapien.',
      variants: [
        {
          title: 'Brown',
        }
      ]
    }
  },
  {
    title: 'Knives',
    product: {
      title: 'Classic Knife',
      description: 'Ullamcorper elementum, justo est blandit libero, eu porttitor felis mauris ut purus. Sed pretium arcu nec mi placerat, ac posuere sapien.',
      variants: [
        {
          title: 'Sharp',
        }
      ]
    }
  },
  {
    title: 'Shoes',
    product: {
      title: 'Classic Knife',
      description: 'Ullamcorper elementum, justo est blandit libero, eu porttitor felis mauris ut purus. Sed pretium arcu nec mi placerat, ac posuere sapien.',
      variants: [
        {
          title: 'Sharp',
        }
      ]
    }
  },
  {
    title: 'Hats',
    product: {
      title: 'Classic Knife',
      description: 'Ullamcorper elementum, justo est blandit libero, eu porttitor felis mauris ut purus. Sed pretium arcu nec mi placerat, ac posuere sapien.',
      variants: [
        {
          title: 'Sharp',
        }
      ]
    }
  },
]

export const MultiProductHighlight = ({
  // categories =[]
}) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  const shopLink = (
    <div>
      <Link to="/aprons"
        className="flex items-center"
      >
        <span className='underline'>
          Shop all Aprons
        </span>
        <span className='ml-2'>
          <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5L14 4.5V3.5L0 3.5L0 4.5Z" fill="#2C383F"/>
          </svg>
        </span>
      </Link>
    </div>
  )

  return <div className="py-10 800:py-20  800:px-[6.25rem]">
    <p className="text-sans-36 mb-20 hidden 800:block">
    Suspendisse consequat velit magna, et iaculis mauris pretium pretium. Ut consequat rhoncus lobortis. Donec tristique libero et pharetra pretium. Etiam imperdiet diam odio, eu malesuada ante vehicula quis.
    </p>
    <div className="800:grid 800:grid-cols-12 gap-x-6">
      <div className="800:col-span-3 flex-col justify-between flex">
        <div className='w-full px-5 800:px-0 relative flex gap-x-10 800:block mb-4 800:mb-0'>
          {
            categories.map((category, index) => {
              return <button
                onClick={() => setActiveCategoryIndex(index)}
                key={category.title}
                className={classNames('block text-sans-32 800:text-sans-52 font-600 transition-opacity', {
                'opacity-50': activeCategoryIndex !== index,
                'opacity-100': activeCategoryIndex === index,
              })}>
                {category.title}
              </button>
            })
          }
          <div
            style={{
              height: `${100 / categories.length}%`,
              transform: `translateY(${activeCategoryIndex * 100}%)`
            }}
            className='hidden transition-transform absolute -left-5 top-0 800:flex items-center'
          >
            <div className='w-3 h-3 rounded-full bg-primary-grey' />
          </div>
        </div>
        <div className='hidden 800:block '>
          {shopLink}
        </div>

      </div>
      <div className="800:col-span-6 mb-7 800:mb-0 px-5 800:px-0">
        <div className="aspect-[3/4] bg-primary-yellow" />
      </div>
      <div className="800:col-span-3 flex justify-end px-5 800:px-0">
        <div className='800:max-w-[16rem] w-full'>
          <div className='border-l border-t border-r rounded-t-[5px] border-primary-grey px-5 py-4 w-full'>
            <h3>
              {categories[activeCategoryIndex].product.title}
            </h3>
          </div>
          <div className='border border-primary-grey px-5 py-4 w-full'>
            <h3>
              {categories[activeCategoryIndex].product.variants[0].title}
            </h3>
          </div>
          <button className='bg-primary-grey text-white rounded-b-[5px] px-5 py-4 w-full text-center'>
            Shop Now
          </button>
        </div>
      </div>
      <div className='800:hidden mt-10 px-5'>
        {shopLink}
      </div>
    </div>
  </div>
}