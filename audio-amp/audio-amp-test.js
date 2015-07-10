//Bonescript code here for running TPA2016 mini audio amplifier.

//Setup
var b = require('bonescript');

void setup() {
 
 
 Serial.println("Audio Amp Test"); 
 audioamp.begin();
 
 // Debug with dump of register map
 /*
 for (uint8_t i=1; i<8; i++) {
   Serial.print("Register #"); Serial.print(i); 
   Serial.print(": 0x");
   Serial.println(audioamp.read8(i), HEX);
 }
 */
 
  // AGC turned off for the gain test
  audioamp.setAGCCompression(TPA2016_AGC_OFF);
  // Turn off the release to ensure AGC off
  audioamp.setReleaseControl(0);
  
  // Test the gain range, from -28dB up to 30dB
  for (int8_t i=-28; i<=30; i++) {
    Serial.print("Gain = "); Serial.println(i); 
    audioamp.setGain(i);
    delay(500);
  }
  
  // Cycle through turning off each channel individually 
  Serial.println("Left speaker off");
  audioamp.enableChannel(true, false);
  delay(1000);
  Serial.println("Left On, Right off");
  audioamp.enableChannel(false, true);
  delay(1000);
  Serial.println("Left On, Right On");
  audioamp.enableChannel(true, true);
  delay(1000);


  Serial.println("Setting Limit Level");
  audioamp.setLimitLevelOn();
  // or turn off with setLimitLevelOff()
  audioamp.setLimitLevel(25);  // range from 0 (-6.5dBv) to 31 (9dBV)
  
  Serial.println("Set AGC Attack");
  audioamp.setAttackControl(5);
  
  Serial.println("Set AGC Hold");
  audioamp.setHoldControl(0);
  
  Serial.println("Set AGC Release");
  audioamp.setReleaseControl(11);
}


void loop() {

}
