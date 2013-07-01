/*global Mantra: true */

Mantra['gestures']['dispecher'] = new Mantra['gestures']['Dispecher']();
var tap = new Mantra['gestures']['Tap']();
console.log(tap["tap"], tap._tap, tap['gesture'], tap._gesture);
Mantra['gestures']["Gesture"]['staticMethod']();
Mantra['gestures']["Gesture"]._staticMethod();
console.log(Mantra['gestures'].POINTER_PEN);
