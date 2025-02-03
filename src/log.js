const DI_TABLE = document.getElementById("di_table");
const COIL_TABLE = document.getElementById("coil_table");
const WDATA_TABLE = document.getElementById("wdata_table");
const REG_TYPE_DI = "DI";
const REG_TYPE_COIL = "COIL";
const REG_TYPE_WDATA = "WDATA";

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8000/ws');

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("FROM CLIENT!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  let data = JSON.parse(event.data);
  console.log(data.type);
  console.log(data.num);
  console.log(data.val);


let convert_bin_to_state = (bin) => {
  if(bin == 0){
    return 'OFF';
  }
  else{
    return 'ON';
  }
}



  if(data.type === REG_TYPE_DI){
    DI_TABLE.rows[data.num].cells[0].innerHTML = data.num;
    DI_TABLE.rows[data.num].cells[1].innerHTML = convert_bin_to_state(data.val);
    if(data.val == 0){
      DI_TABLE.rows[data.num].style.backgroundColor = 'red';
    }
    else{
      DI_TABLE.rows[data.num].style.backgroundColor = 'green';
    }
  }


  if(data.type === REG_TYPE_COIL){
    COIL_TABLE.rows[data.num].cells[0].innerHTML = data.num;
    COIL_TABLE.rows[data.num].cells[1].innerHTML = convert_bin_to_state(data.val);
    if(data.val == 0){
      COIL_TABLE.rows[data.num].style.backgroundColor = 'red';
    }
    else{
      COIL_TABLE.rows[data.num].style.backgroundColor = 'green';
    }
  }


  if(data.type === REG_TYPE_WDATA){
    WDATA_TABLE.rows[data.num].cells[0].innerHTML = data.num;
    WDATA_TABLE.rows[data.num].cells[1].innerHTML = data.val;
  }
});