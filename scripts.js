function calculateSubnet() {
  const ip = document.getElementById('ip').value
  const mask = document.getElementById('mask').value
  const subnet = document.getElementById('subnet')
  const broadcast = document.getElementById('broadcast')
  //console.log(x + y)
  subnet.value = ip
  broadcast.value = mask
}
