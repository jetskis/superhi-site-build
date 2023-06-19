import {useFetcher, useMatches} from '@remix-run/react';
import {Button} from '~/components';
import {CartAction} from '~/lib/type';

export function AddToCartButton({
  children,
  lines,
  className = '',
  variant = 'primary',
  width = 'full',
  productAnalytics,
  ...props
}) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
      <input type="hidden" name="countryCode" value={selectedLocale.country} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <input type="hidden" name="analytics" value={JSON.stringify(productAnalytics)} />
      <Button
        as="button"
        type="submit"
        width={width}
        variant={variant}
        className={className}
        {...props}
      >
        {children}
      </Button>
    </fetcher.Form>
  );
}
