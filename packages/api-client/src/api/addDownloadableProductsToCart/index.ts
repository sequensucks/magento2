import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import type { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import {
  AddDownloadableProductsToCartInput,
  AddDownloadableProductsToCartMutation,
  AddDownloadableProductsToCartMutationVariables,
} from '../../types/GraphQL';
import addDownloadableProductsToCartMutation from './addDownloadableProductsToCart';
import getHeaders from '../getHeaders';

/**
 * Adds a set of downloadable products to a specified cart
 * @param context VSF Context
 * @param input ID of the cart and products to be added
 * @param customQuery custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function addDownloadableProductsToCart(
  context: Context,
  input: AddDownloadableProductsToCartInput,
  customQuery: CustomQuery = { addDownloadableProductsToCart: 'addDownloadableProductsToCart' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<AddDownloadableProductsToCartMutation>> {
  const { addDownloadableProductsToCart: addDownloadableProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addDownloadableProductsToCart: {
        query: addDownloadableProductsToCartMutation,
        variables: { input },
      },
    },
  );
  return context.client.mutate<AddDownloadableProductsToCartMutation, AddDownloadableProductsToCartMutationVariables>({
    mutation: addDownloadableProductsToCartGQL.query,
    variables: addDownloadableProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
