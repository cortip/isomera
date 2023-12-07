/**
 * Using Nest.js @ApiProperty() annotations on DTOs causes issues on front-end
 * focused projects like this, so we are aliasing this annotator to a dummy empty
 * function.
 */
export const ApiProperty = () => {
  return () => {
    //
  }
}
