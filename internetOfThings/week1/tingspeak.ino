#include <ThingSpeak.h>
#include <ESP8266WiFi.h>

// WiFi settings
char ssid[] = "id";
char pass[] = "passw";
int status = WL_IDLE_STATUS;
WiFiClient  client;

long myChannelNumber = 106342;
const char * myWriteAPIKey = "O7KV3KA3CY61YQY3";

#define trigPin 16
#define echoPin 5

void setup() {
  // Setup wifi
  WiFi.begin(ssid, pass);  
  ThingSpeak.begin(client);
 
  pinMode(A0, INPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

}

void loop() {

 int sound = analogRead(A0);
 Serial.println (sound);
 
  ThingSpeak.writeField(myChannelNumber, 1, sound, myWriteAPIKey);
  
  delay(15000);
  int duration, distance;
  digitalWrite(trigPin, LOW);  // Added this line
  delayMicroseconds(2); // Added this line
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10); // Added this line
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2) / 29.1;
   Serial.print ("dist ");
   Serial.println (distance);

  // Write to ThingSpeak. There are up to 8 fields in a channel, allowing you to store up to 8 different
  // pieces of information in a channel.  Here, we write to field 1.
  ThingSpeak.writeField(myChannelNumber, 2, distance, myWriteAPIKey);
  delay(15000); // ThingSpeak will only accept updates every 15 seconds.
}
