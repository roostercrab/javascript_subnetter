function calculateSubnet()
{
  const ip = document.getElementById('ip').value
  const mask = document.getElementById('mask').value
  const binary_ip = document.getElementById('binary_ip')
  const binary_mask = document.getElementById('binary_mask')
  const subnet = document.getElementById('subnet')
  const broadcast = document.getElementById('broadcast')

  // split the input ip and mask into an array based on the "."
  const input_ip_array = ip.split('.')
  const input_mask_array = mask.split('.')
  //console.log(input_ip_array)
  //console.log(input_mask_array)

  let numeric_ip_array = []
  let numeric_mask_array = []
  let binary_ip_array = []
  let binary_mask_array = []

  let numeric_broadcast_array = []
  let binary_subnet_array = []
  let binary_broadcast_array = []

  function input_to_array(user_input_array, output_numeric_array)
  {
    for (let octet = 0; octet < user_input_array.length; octet++) {
      let current_octet = parseInt(user_input_array[octet])
      output_numeric_array.push(current_octet)
    }
  }

  function numeric_array_to_binary(numeric_array, binary_output_array)
  {
    for (let octet = 0; octet < numeric_array.length; octet++) {
      let current_octet = numeric_array[octet].toString(2)
      // handle binary that isn't 8 bits
      if (current_octet.length < 8) {
        const offset = 8 - current_octet.length
        let add_on_zeroes_list = []
        for (let index = 0; index < offset; index++) {
          add_on_zeroes_list.push(0)
        }
        add_on_zeroes_string = add_on_zeroes_list.toString().split(',').join('')
        current_octet = add_on_zeroes_string + current_octet
      }
      binary_output_array.push(current_octet)
    }
  }


  // parse the input ip address to an array of numbers
  input_to_array(input_ip_array, numeric_ip_array)
  // parse the input mask to an array of numbers
  input_to_array(input_mask_array, numeric_mask_array)

  // parse the numeric ip address array to an array of binary equivalents
  numeric_array_to_binary(numeric_ip_array, binary_ip_array)
  // parse the numeric mask array to an array of binary equivalents
  numeric_array_to_binary(numeric_mask_array, binary_mask_array)

  // calculate the subnet value 2
  // figure out which mask octet is "magic"
  magic_octet_index = -1
  interval = -1
  for (let index = 0; index < numeric_mask_array.length; index++) {
    const octet = numeric_mask_array[index];
    if (octet === 255) {
      continue
    } else {
      magic_octet_index = index
      interval = 256 - octet
      break
    }
  }

  // grab the value from the numeric ip array in the magic octet
  magic_octet_ip_value = numeric_ip_array[magic_octet_index]

  // divide the interval into the corresponding octet of the ip address until it goes over for the subnet address
  test_interval = 0
  subnet_number = 0
  numeric_subnet_array = numeric_ip_array
  if (interval === 256) {
    subnet_number = 0
  } else {
    while (magic_octet_ip_value >= test_interval) {
      test_interval += interval
      console.log(test_interval)
    }
    subnet_number = test_interval - interval
    // have to do that because it's not ending on the value before it becomes to large...
  }

  numeric_subnet_array[magic_octet_index] = subnet_number

  // zero out the remaining octets
  // grab the ip array and starting from the magic octet index, add one and zero each subsequent octet
  for (let index = magic_octet_index + 1; index < numeric_subnet_array.length; index++) {
    numeric_subnet_array[index] = 0;
  }
  console.log(numeric_subnet_array)

  // add the interval - 1 to the relevant ip address for the broadcast address
  // 255 out the remaining octets
  // then need to convert them both to binary, should pull the function out of the code that's doing it twice


  // calculate some values
  binary_ip_string = binary_ip_array.toString().split(',').join('')
  binary_mask_string = binary_mask_array.toString().split(',').join('')
  decimal_ip_number = parseInt(binary_ip_string, 2)
  decimal_mask_number = parseInt(binary_mask_string, 2)
  decimal_subnet_number = decimal_ip_number & decimal_mask_number
  binary_subnet_number = decimal_subnet_number.toString(2)

  // display the values to the webpage output (will be used for final calculation...eventually)
  subnet.value = '-'
  broadcast.value = '-'
  binary_ip.value = binary_ip_string
  binary_mask.value = binary_mask_string
}
