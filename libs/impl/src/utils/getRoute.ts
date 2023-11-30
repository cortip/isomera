/*
    This function assumes that the dynamic route
    path is in the format of /path/{dynamicRoutePath}/static
    and that the urlParameters object is in the format of
    { dynamicRoutePath: 'dynamicRoutePathValue' }.
 */

interface IGetRouteUrlParameters {
  [key: string]: string | number
}

export const getRoute = (
  route: string,
  urlParameters?: IGetRouteUrlParameters
) => {
  if (!urlParameters) {
    return route
  }

  let finalRoute = route

  for (const [urlParametersKey, urlParameterValue] of Object.entries(
    urlParameters
  )) {
    finalRoute = finalRoute.replace(
      `{${urlParametersKey}}`,
      urlParameterValue.toString()
    )
  }

  return finalRoute
}
