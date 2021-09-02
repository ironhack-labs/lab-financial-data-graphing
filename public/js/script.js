document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('lab-financial-data-graphing JS imported successfully!')
  },
  false,
)

document.getElementById('reload').addEventListener('click', (event) => {
  const from = document.getElementById('from').value
  let to = document.getElementById('to').value
  const date = new Date()
  const month =
    (date.getMonth() + 1 + '').length === 1
      ? '0' + (date.getMonth() + 1) + ''
      : date.getMonth() + 1
  const day =
    (date.getDate() + '').length === 1
      ? '0' + (date.getDate() + '')
      : date.getDate()
  const year = date.getFullYear()

  const formattedDate = year + '-' + month + '-' + day
  to = to.length === 0 ? formattedDate : to
  const currency = 'usd'

  getBitCloseFullService(from, to, currency)
})
