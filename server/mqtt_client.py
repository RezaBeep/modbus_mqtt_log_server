import paho.mqtt.client as mqtt
import datetime

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc, properties=None):
    print("Connected with result code "+str(rc))
    # client.subscribe("#")
    print("connected!")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    pass


   
    

mqttc = mqtt.Client()
mqttc.on_connect = on_connect
mqttc.on_message = on_message

mqttc.connect("5.198.179.50", 1883, 60)

# Non-Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.

mqttc.loop_start()