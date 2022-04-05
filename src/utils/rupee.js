
export const rupeeFormatter = (amt) => {
  const text = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amt)
  return `₹${text}`

}

export const getPricing = (pricingObj, unitCount = 1) => {
 try {
    if (!pricingObj) {
      return "N/A"
    }
    const { price, pricing_type } = pricingObj
    if (pricing_type === "Per Unit") {
      return `${rupeeFormatter(Number(price) * unitCount)}`
    }
    return "N/a"
 } catch (error) {
   return "N/a"
 }
}

export const deformatCurrency = (str = "") => {
  if (!str) {
    return null
  }
  const finalStrinf = str.replace(/[^0-9.-]+/g, "")
  return finalStrinf
}