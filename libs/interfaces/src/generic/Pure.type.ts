/**
 * This type cleans DTO or other interfaces from methods that are enriching, for example in DTO class,
 * method validate is also implemented, which is not needed when working with just dataytpes
 */
export type Pure<T> = Omit<T, 'validate'>
