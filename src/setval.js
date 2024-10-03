import fetch from "node-fetch";



const REG_TYPE_COIL = "COIL";
const REG_TYPE_WDATA = "WDATA";


function set_val(reg_type){
    let reg_num = "";
    let reg_val = "";

    if(reg_type === REG_TYPE_COIL){
        reg_val = document.getElementById('coil_sel_val').value;
        reg_num = document.forms["coilval_form"]["num"].value;
    }
    if(reg_type === REG_TYPE_WDATA){
        reg_val = document.forms["wdataval_form"]["val"].value;
        reg_num = document.forms["wdataval_form"]["num"].value;
    }
    fetch('http://127.0.0.1:8000/setval', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type:reg_type,
            num:reg_num,
            value:reg_val
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



const coilsetval = () => set_val(REG_TYPE_COIL);
const wdatasetval = () => set_val(REG_TYPE_WDATA);



document.getElementById("coil_setval_butt").addEventListener("click", coilsetval, false);
document.getElementById("wdata_setval_butt").addEventListener("click", wdatasetval, false);


