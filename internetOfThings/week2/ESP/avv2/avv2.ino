#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiServer.h>
#include <WiFiUdp.h>

#include <ESP8266HTTPClient.h>
char ssid[] = "iPhone van Leander van Baekel";
char pass[] = "31051993";
//int status = WL_IDLE_STATUS;
WiFiClient  client;


char* host = "www.caffeine-works.nl";
String path = "/iot/light.json";
const int httpPort = 80;

void setup() {
  // put your setup code here, to run once:
  pinMode(D1, OUTPUT);
  pinMode(D2, INPUT);
  Serial.begin(9600);

  
  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }
}

void loop() {

  HTTPClient http;

  http.begin("http://caffeine-works.nl/iot/lampje.txt"); 
  int httpCode = http.GET();        
  String payload = http.getString();

  int test = digitalRead(D2);
  Serial.println(payload);

  if (payload == "off") {
    Serial.println("lamp is off");
    digitalWrite(D1, LOW);
  } else {
    Serial.println("lamp is on");
    digitalWrite(D1, HIGH);
  }

  //delay(1000);



  // POST
 // Define data
 String data;
 String light;
 light = String(analogRead(D1));
 if (light == "1023") {
   light = 11;
 } else {
   light = 10;
 }
 data = "light="+light;

 //check if and connect the nodeMCU to the server
 if (client.connect(host, httpPort)) {
   //make the POST headers and add the data string to it
   client.println("POST /iot/index.php HTTP/1.1");
   client.println("Host: www.caffeine-works.nl:80");
   client.println("Content-Type: application/x-www-form-urlencoded");
   client.println("Connection: close");
   client.print("Content-Length: ");
   client.println(data.length());
   client.println();
   client.print(data);
   client.println();
   Serial.println(data);
   Serial.println("Data send");

 } else {
   Serial.println("Something went wrong");
 }
     
  // wait .5s to reloop this loop
  delay(500);
  
}


