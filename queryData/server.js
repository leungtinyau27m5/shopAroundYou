/*class user {
    fetchData() {
        fetch('http://192.168.0.103:80/IS/User_group/shopKeeper.php')
        .then(function (res) {
          if (res.status !== 200) {
            console.error('Looks like there was a problem. Status Code: ' + res.status)
            return
          }
          res.json().then(function(data) {
            console.error(data)
          })
        })
        .catch(function(err) {
          console.error('Fecht Error: -s', err)
        })
    }
}*/
export const serverConn = {
  serverUri: 'http://192.168.0.103:80/IS/test.php',
  serverGoogleMapUri: 'http://192.168.0.103/IS/Google_Map/googleMap.php',
  serverAssets: 'http://192.168.0.103:80/IS/'
}