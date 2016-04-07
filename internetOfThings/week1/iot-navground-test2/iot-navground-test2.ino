#include <EIoTCloudRestApi.h>
#include <EIoTCloudRestApiConfig.h>

#define trigPin 16
#define echoPin 5


EIoTCloudRestApi eiotcloud;

void setup() {
 Serial.begin(9600);
 eiotcloud.begin();
 pinMode(A0, INPUT);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
 //delay(2000);
 int sound = analogRead(A0);
 Serial.println (sound);
 eiotcloud.sendParameter("5703b2f8c943a0661cf314a3/3FbVzg6Ka4pngTWe", sound);

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
  eiotcloud.sendParameter("5703b2f8c943a0661cf314a3/CD0KnGtQymeXnKiK", distance);
}
