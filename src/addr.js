import fetch from "node-fetch";


const REG_TYPE_DI = "di";
const REG_TYPE_COIL = "coil";
const REG_TYPE_WDATA = "WDATA";


function set_addr(reg_type){
    let reg_num = "";
    let reg_addr = "";
    if(reg_type === REG_TYPE_DI){
        reg_addr = document.forms["diaddr_form"]["addr"].value;
        reg_num = document.forms["diaddr_form"]["num"].value;
    }
    if(reg_type === REG_TYPE_COIL){
        reg_addr = document.forms["coiladdr_form"]["addr"].value;
        reg_num = document.forms["coiladdr_form"]["num"].value;
    }
    if(reg_type === REG_TYPE_WDATA){
        reg_addr = document.forms["wdataaddr_form"]["addr"].value;
        reg_num = document.forms["wdataaddr_form"]["num"].value;
    }
    fetch('http://127.0.0.1:8000/setaddr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type:reg_type,
            num:reg_num,
            addr:reg_addr
        })
    })
    .then(resp => {
		resp.json()
		alert("sent!");
	}) // or, resp.text(), etc
    .then(data => {
        console.log(data); // handle response data
    })
    .catch(error => {
        console.error(error);
    });

}


const disetaddr = () => set_addr(REG_TYPE_DI);
const coilsetaddr = () => set_addr(REG_TYPE_COIL);
const wdatasetaddr = () => set_addr(REG_TYPE_WDATA);


document.getElementById("di_setaddr_butt").addEventListener("click", disetaddr, false);
document.getElementById("coil_setaddr_butt").addEventListener("click", coilsetaddr, false);
document.getElementById("wdata_setaddr_butt").addEventListener("click", wdatasetaddr, false);


