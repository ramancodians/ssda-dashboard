export const getUnitCount = (toothObj) => {
  if (!toothObj) {
    return 0
  }

  let count = 0
  Object.values(toothObj).map(section => {
    if (section) {
      section.map(teeth => {
        if (teeth.isSelected) {
          count++
        }
      })
    }
  })
  return count;
}