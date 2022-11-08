type NameType = { name: string };

/**
 * This method generates array of objects with given interface.
 * Mostly useful at Material UI dropdowns and autocomplete components
 * to fill in the data and not break TypeScript.
 *
 * @param val {(object|string)[]}
 * @param results {object[]}
 */
export const toInterfacedObjectArray = <T = Partial<{ name: string }>>(
  val: (T | string)[],
  results: T[]
) =>
  val
    .map((t) => {
      if (
        typeof t === 'string' &&
        (val.filter((c) => typeof c !== 'string') as T[]).some(
          (c) => 'name' in c && c['name'] === t
        )
      ) {
        return false;
      }
      const next: NameType =
        typeof t === 'string'
          ? ({
              name: t,
            } as NameType)
          : { name: t['name'] };
      const found = results.find((r) => r['name'] === next.name) as T;
      if (found) {
        return found;
      }
      return next as unknown as T;
    })
    .filter((c) => c) as T[];
