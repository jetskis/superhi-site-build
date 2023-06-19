import {Link, useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

export async function action({request, context}) {
  const {session, storefront} = context;
  const headers = new Headers();
  const [formData, customerAccessToken] = await Promise.all([
    request.formData(),
    session.get('customerAccessToken'),
  ]);
  let authShow = false;
  let status = 200;
  let result = {};
  // TODO form action
  const authAction = formData.get('authAction');
  switch (authAction) {
    case 'OPEN_AUTH':
      authShow = true
      break;
    case 'CLOSE_AUTH':
      authShow = false
      break;
    default:
      throw new Error('Invalid cart action');
  }

  /**
   * The Cart ID may change after each mutation. We need to update it each time in the session.
   */
  headers.set('Set-Cookie', await session.commit());

  const {errors} = result;
  return json({errors}, {status, headers});

}