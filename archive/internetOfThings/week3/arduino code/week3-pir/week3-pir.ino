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

char ssid[] = "xxx";
char pass[] = "xxx";
WiFiClient  client;

char* host = "www.caffeine-works.nl";
String path = "/iot2/pir.txt";
const int httpPort = 80;

int pirPin = D0;
int relPin = D1;
int pirLed = D5;
int redLed = D2;
int yellowLed = D3;
int greenLed = D4;
int val;


void squirt() {
  Serial.println("Begin squirt function");
  digitalWrite(relPin, LOW);
  delay(1000);
  digitalWrite(relPin, HIGH);
  Serial.println("End squirt function");
//  delay(1000);
}


void setup() {
  Serial.begin(9600);

  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }
  
  pinMode(relPin, OUTPUT);
  pinMode(pirPin, INPUT);
  pinMode(pirLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
}
 
void loop() {

  pirVal = digitalRead(pirPin); //read state of the PIR
  if (pirVal == LOW ) {
    digitalWrite(pirLed, LOW);
  } else {
    digitalWrite(pirLed, HIGH);
  }

  HTTPClient http;

  http.begin("http://caffeine-works.nl/iot2/pir.txt"); 
  int httpCode = http.GET();        
  String payload = http.getString();

  Serial.println("Server: " + payload);

  String siteMode = payload;
  
  Serial.println(siteMode);
  if (siteMode == "auto") {
   digitalWrite(redLed, LOW);
   digitalWrite(yellowLed, HIGH);
   digitalWrite(greenLed, LOW);
    if (val == LOW) {
      Serial.println("Auto and No motion"); //if the value read is low, there was no motion
      digitalWrite(relPin, HIGH);
    }
    else {
      Serial.println("Auto and Motion!"); //if the value read was high, there was motion
      // digitalWrite(relPin, LOW);
      squirt();
    }
  } else if (siteMode == "on") {
    digitalWrite(redLed, LOW);
    digitalWrite(yellowLed, LOW);
    digitalWrite(greenLed, HIGH);
    
    Serial.println("Site forces On"); //if the value read was high, there was motion
    digitalWrite(relPin, LOW);
  } else if (siteMode == "off") {
    digitalWrite(redLed, HIGH);
    digitalWrite(yellowLed, LOW);
    digitalWrite(greenLed, LOW);
    Serial.println("Site forces Off"); //if the value read is low, there was no motion
    digitalWrite(relPin, HIGH);
  } else {
    digitalWrite(redLed, HIGH);
    digitalWrite(yellowLed, HIGH);
    digitalWrite(greenLed, HIGH);
  }


 // Post Event
 String data;
 String pir;
 pir = String(digitalRead(D0));

 data = "pir="+pir;

 //check if and connect the nodeMCU to the server
 if (client.connect(host, httpPort)) {
   //make the POST headers and add the data string to it
   client.println("POST /iot2/index.php HTTP/1.1");
   client.println("Host: www.caffeine-works.nl:80");
   client.println("Content-Type: application/x-www-form-urlencoded");
   client.println("Connection: close");
   client.print("Content-Length: ");
   client.println(data.length());
   client.println();
   client.print(data);
   client.println();
   Serial.println("Sended data:" + data);

 } else {
   Serial.println("Something went wrong");
 }

  
  delay(1000);
}

