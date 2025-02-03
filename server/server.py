from fastapi import FastAPI, WebSocket, BackgroundTasks
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import asyncio

import paho.mqtt.client as mqtt

import time
import datetime


DI_SETADDR_TOPIC = "SERVER/SET_ADDR/DIN/REG/"
COIL_SETADDR_TOPIC = "SERVER/SET_ADDR/DOUT/REG/"
WDATA_SETADDR_TOPIC = "SERVER/SET_ADDR/WDATA/REG/"


COIL_SETVAL_TOPIC = "SERVER/SET_VALUE/COIL/REG/"
WDATA_SETVAL_TOPIC = "SERVER/SET_VALUE/WDATA/REG/"


REG_TYPE_DI = "DI"
REG_TYPE_COIL = "COIL"
REG_TYPE_WDATA = "WDATA"


reg_values = {
    REG_TYPE_DI: [{}],
    REG_TYPE_COIL: [{}],
    REG_TYPE_WDATA: [{}]
}



def reg_add_value(reg_type, reg_num, reg_val):
    reg_values[reg_type].append({'last_update': datetime.datetime.now(), 'num': reg_num, 'value': reg_val})



# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc, properties=None):
    print("mqtt Connected with result code "+str(rc))
    client.subscribe("MCU/#")
    print("connected to mqtt broker!")


def on_connect_fail(client, userdata):
    print("failed to connect to mqtt broker")


# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    reg_num = str((msg.topic).split("REG/" ,1)[1])
    reg_val = str((msg.payload).hex())
    if(len(reg_val) == 0):
        reg_val = '0'
    print('num: %s',reg_num)
    print('value: %s',reg_val)
    val_bin = bin(int(reg_val, 16))
    lsb = val_bin[len(val_bin) - 1]
    if(msg.topic.find("/DI/") != -1):
        reg_add_value(REG_TYPE_DI, reg_num, lsb)
    elif(msg.topic.find("/COIL/") != -1):
        reg_add_value(REG_TYPE_COIL, reg_num, lsb)
    elif(msg.topic.find("/WDATA/") != -1):
        reg_add_value(REG_TYPE_WDATA, reg_num, reg_val)


mqttc = mqtt.Client()
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.on_connect_fail = on_connect_fail



app = FastAPI()
app.mount("/public", StaticFiles(directory="/home/reza/modbus_mqtt/public", html=True), name='html')
app.mount("/dist", StaticFiles(directory="/home/reza/modbus_mqtt/dist"), name='js')


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AddrData(BaseModel):
    type: str
    num: str
    addr: str


class ValueData(BaseModel):
    type: str
    num: str
    value: str    



@app.post("/setaddr")
async def setaddr(data: AddrData):
    print(data)
    if(data.type == 'di'):
        mqttc.publish(f"{DI_SETADDR_TOPIC}{data.num}", data.addr, 0, False)
    elif(data.type == 'coil'):
        mqttc.publish(f"{COIL_SETADDR_TOPIC}{data.num}", data.addr, 0, False)
    elif(data.type == 'wdata'):
        mqttc.publish(f"{WDATA_SETADDR_TOPIC}{data.num}", data.addr, 0, False)



@app.post("/setval")
async def setval(data: ValueData):
    print(data)
    if(data.type == REG_TYPE_COIL):
        mqttc.publish(f"{COIL_SETVAL_TOPIC}{data.num}", data.value, 0, False)
    elif(data.type == REG_TYPE_WDATA):
        mqttc.publish(f"{WDATA_SETVAL_TOPIC}{data.num}", data.value, 0, False)        



async def websocket_send_reg_value(websocket: WebSocket):
    if(len(reg_values[REG_TYPE_DI]) > 0):
        for di in reg_values[REG_TYPE_DI]:
            try:
                await websocket.send_json({'type': REG_TYPE_DI, 'num': di['num'], 'val': di['value']})
                # await asyncio.sleep(2)
            except:
                pass                    
    if(len(reg_values[REG_TYPE_COIL]) > 0):
        for coil in reg_values[REG_TYPE_COIL]:          
            try:
                await websocket.send_json({'type': REG_TYPE_COIL, 'num': coil['num'], 'val': coil['value']})
                # await asyncio.sleep(2)
            except:
                pass    
    if(len(reg_values[REG_TYPE_WDATA]) > 0):    
        for wdata in reg_values[REG_TYPE_WDATA]:
            try:
                await websocket.send_json({'type': REG_TYPE_WDATA, 'num': wdata['num'], 'val': wdata['value']})                
                # await asyncio.sleep(2)
            except:
                pass
        

@app.websocket('/ws')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        await websocket_send_reg_value(websocket)
        await asyncio.sleep(2)

mqttc.connect("84.47.235.178", 1883, 60)

# Non-Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.

mqttc.loop_start()


#uvicorn.run(app=app, host="0.0.0.0")
