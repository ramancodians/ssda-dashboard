
export const rupeeFormatter = (amt) => {
  const text = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amt)
  return `₹${text}`

}