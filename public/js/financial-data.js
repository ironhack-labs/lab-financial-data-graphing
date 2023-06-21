// @ts-nocheck
const apiURL = `https://api.coindesk.com/v1/bpi/historical/close.json`

const getHistoryData = async () => {
  const history = await axios.get(apiURL)
  console.log(history.data)
}

getHistoryData()