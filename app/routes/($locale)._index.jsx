import {defer} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData, useFetcher, Link} from '@remix-run/react';
import { AnalyticsPageType } from '@shopify/hydrogen';
import { flattenConnection } from '@shopify/hydrogen-react'

export async function loader({context}) {
  const collections = await context.storefront.query(COLLECTIONS_QUERY)
  const pages = await context.storefront.query(PAGES_QUERY)
  const products = await context.storefront.query(PRODUCT_QUERY)
  const articles = await context.storefront.query(ARTICLES_QUERY)

  // We're not covering accounts/auth in this class
  // const customerAccessToken = await context.session.get('customerAccessToken');
  // const customer = customerAccessToken ? 
  //   await getCustomer(context, customerAccessToken)
  //   : false

  return {
    collections,
    pages,
    articles,
    products
  }
}

const seo = ({data}) => ({
  title: 'Superhi Luggage Store',
  description: 'best place to internet',
});

export const handle = {
  seo
};

export default function Homepage() {

  const fetcher = useFetcher();
  const {collections, pages, products, articles} = useLoaderData()

  const pagesArray = flattenConnection(pages.pages)
  const productArray = flattenConnection(products.products)
  const collectionArray = flattenConnection(collections.collections)
  const articlesArray = flattenConnection(articles.articles)

  return (
    <div className='relative'>
      <>
        {/* Let's make sure to remove the 80px from the sticky top */}
        <div className='min-h-[calc(100vh-120px)] w-screen'>
          {/* 2UP Module */}
          <section className='h-[calc(100vh-80px)] min-h-[600px]'> 
            <div className='grid h-full grid-cols-2 w-full'>
              <div className='col-span-1 bg-primary-green flex items-end'>
                <div className='p-4 800:p-8 pb-6'>
                  <h1 className='text-mono-64'>Welcome to Modular Commerce</h1>
                  <div className='flex mt-4'>
                    <Link to='/products/40l-bag' className='button primary big'>
                      <span>Product Page</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='col-span-1 bg-primary-green/60' />
            </div>
          </section>
          {/* VALUE PROPS */}
          <section className='p-4 text-center 800:py-20'>
            <div className='grid grid-cols-3 gap-4 max-w-[900px] mx-auto'>
              <div className='col-span-1'>
                <h4 className='text-mono-22 mb-5'>Free Shipping</h4>
                <p>All orders of $89 or more qualify for free shipping. No promotional code needed.</p>
              </div>
              <div className='col-span-1'>
                <h4 className='text-mono-22 mb-5'>Lifetime Guarantee</h4>
                <p>Free replacement for any quality issues you experience with our bags.</p>
              </div>
              <div className='col-span-1'>
                <h4 className='text-mono-22 mb-5'>Free Returns </h4>
                <p>If you don’t love your order, return it within 30 days & shipping is on us.</p>
              </div>
            </div>
          </section>
          {/* SHOPPING MODULE */}
          <section className='p-4 800:px-8 800:py-20'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <div className='aspect-square bg-primary-green/60' />
                <h3 className='text-mono-48 my-2'>40L</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className='my-2'>
                  <div className='flex my-4'>
                    <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
                    <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
                    <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
                  </div>
                  <div>
                    <button className='button primary small'>Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square bg-primary-green/60' />
                <h3 className='text-mono-48 my-2'>60L</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className='my-2'>
                  <div className='flex my-4'>
                    <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
                    <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
                    <span className='h-10 w-10 rounded-full block mr-2 bg-primary-green' />
                  </div>
                  <div>
                    <button className='button primary small'>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* BENEFITS */}
          <section className='p-4 800:px-8 800:py-20 bg-primary-green/10'>
            <div className='max-w-[90%] mx-auto'>
              <div className='flex my-8 800:my-20 text-left'>
                <div className='max-w-[70%]'>
                  <h3 className='text-mono-64'>Global entry level comforts</h3>
                </div>
              </div>
              <div className='flex my-8 800:my-20 w-full  justify-end text-right'>
                <div className='max-w-[70%]'>
                  <h3 className='text-mono-64'>TSA Approved</h3>
                </div>
              </div>
              <div className='flex my-8 800:my-20 w-full text-left'>
                <div className='max-w-[70%]'>
                  <h3 className='text-mono-64'>Smooth Wheels</h3>
                </div>
              </div>
              <div className='flex my-8 800:my-20 w-full justify-end text-right'>
                <div className='max-w-[70%]'>
                  <h3 className='text-mono-64'>Lightweight &amp; Stylish</h3>
                </div>
              </div>
            </div>
          </section>
          {/* COLUMN MODULES */}
          <section className='p-4 800:px-8 800:py-20 '>
            <div className='grid grid-cols-2 gap-4 my-10 800:my-20 py-1'>
              <div className='col-span-1'>
                <div className='aspect-square bg-primary-green/60' />
              </div>
              <div className='col-span-1 p-3'>
                <h3 className='text-mono-64 my-2'>Our Story</h3>
                <p className='text-mono-26'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 my-10 800:my-20 py-1 800:grid-flow-dense rtl'>
              <div className='col-span-1'>
                <div className='aspect-square bg-primary-green/60' />
              </div>
              <div className='col-span-1 ltr p-3'>
                <h3 className='text-mono-64 my-2'>Our commitment</h3>
                <p className='text-mono-26'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
          </section>
          {/* IMAGE or VIDEO */}
          <section>
            <div className='aspect-video w-full bg-primary-green/60' />
          </section>
          {/* FAQ */}
          <section className='p-4 800:px-8 800:py-20 1200:py-40 text-left'>
            <div className='max-w-[1000px] mx-auto'>
              <h3 className='text-mono-100 my-2'>FAQ</h3>
              <button className='py-4 inline-flex justify-between my-2 text-mono-36 border-b text-left'>
                <span>Can you buy this even if you don't have upcoming travel plans?</span>
                <span>+</span>
              </button>
              <button className='py-4 inline-flex justify-between my-2 text-mono-36 border-b text-left'>
                <span>Can you buy this even if you don't have upcoming travel plans?</span>
                <span>+</span>
              </button>
              <button className='py-4 inline-flex justify-between my-2 text-mono-36 border-b text-left'>
                <span>Can you buy this even if you don't have upcoming travel plans?</span>
                <span>+</span>
              </button>
            </div>
          </section>
        </div>
      </>
      <div className='bg-almost-black text-primary-green hidden'>
        <div className='px-12 pt-12'>
          <h2 className='text-22'>Fetch Shopify routes (helpful for existing stores/testing):</h2>
        </div>
        <div className='relative p-12 grid grid-cols-12'>
          <div className='col-span-3'>
            <h2 className='text-mono-22'>Pages:</h2>
            {pagesArray.map(page => (
              <Link className='block underline' to={`/pages/${page.handle}`} key={page.handle}>{page.title}</Link>
            ))}
          </div>
          <div className='col-span-3'>
            <h2 className='text-mono-22'>Products:</h2>
            {productArray.map(product => (
              <Link className='block underline' to={`/products/${product.handle}`} key={product.handle}>{product.title}</Link>
            ))}
          </div>
          <div className='col-span-3'>
            <h2 className='text-mono-22'>Collections:</h2>
            {collectionArray.map(collection => (
              <Link className='block underline' to={`/collections/${collection.handle}`} key={collection.handle}>{collection.title}</Link>
            ))}
          </div>
          <div className='col-span-3'>
            <h2 className='text-mono-22'>Articles:</h2>
            {articlesArray.map(article => (
              <Link className='block underline' to={`/journal/${article.blog.handle}/${article.handle}`} key={article.handle}>{article.title}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

{/* 
  Some sample queries to get you started:
*/}

const COLLECTIONS_QUERY = `#graphql
  query collections {
    collections(first: 80) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  query products {
    products(first: 200, reverse: true, query: "inventory_total:>200") {
      edges {
        node {
          handle
          title
        }
      }
    }
  }
`;

const PAGES_QUERY = `#graphql
  query pages {
    pages(first: 100) {
      edges {
        node {
          handle
          title
        }
      }
    }
  }
`;

const ARTICLES_QUERY = `#graphql
  query articles {
    articles(first: 100, reverse: true) {
      edges {
        node {
          handle
          title
          blog {
            id
            handle
          }
        }
      }
    }
  }
`