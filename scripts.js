function calculateSubnet() {
  const ip = parseInt(document.getElementById('ip').value)
  const mask = parseInt(document.getElementById('mask').value)
  const subnet = document.getElementById('subnet')
  const broadcast = document.getElementById('broadcast')
  //console.log(x + y)
  subnet.value = x + y
  broadcast.value = x + y
}
