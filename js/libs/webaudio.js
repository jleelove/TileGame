/*
 * Copyright (C) 2013, Intel Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var jWebAudio=function(){window.hasOwnProperty("AudioContext")?this.context=new AudioContext:window.hasOwnProperty("webkitAudioContext")?this.context=new webkitAudioContext:(this.context=null,console.error("Web audio is not supported in current web browser. Please try with the latest Chrome."))},jWebAudio=new jWebAudio;jWebAudio.SoundEngine=function(){this.soundArray=[]};
jWebAudio.SoundEngine.prototype={addSoundSource:function(a){if("object"===typeof a&&a.hasOwnProperty("url")){!0!==a.preLoad&&(a.preLoad=!1);"function"!==typeof a.callback&&"object"!==typeof a.callback&&(a.callback=null);!0!==a.multishot&&(a.multishot=!1);if("string"===typeof a.url)return this.soundArray.push(new jWebAudio.SoundSource(this.soundArray.length,a)),this.soundArray[this.soundArray.length-1];if("object"===typeof a.url){if(a.preLoad){var d=a.url.length,e=0,c=a.callback;a.callback=function(){++e;
e===d&&c&&c()}}var b=this.soundArray.length,g=a.url.slice(),f;for(f in a.url)a.url=g[f],this.soundArray.push(new jWebAudio.SoundSource(this.soundArray.length,a));a=[];for(f=b;f<this.soundArray.length;++f)a[f-b]=this.soundArray[f];return a}}else console.error("Error url in addSoundSource.")},destroySound:function(a){this.soundArray[a]&&(this.soundArray[a].isLoaded&&this.soundArray[a].stop(),delete this.soundArray[a])}};
jWebAudio.SoundSource=function(a,d){this.id=d.id;this.url=d.url;this.multishot=d.multishot;this.isLoaded=!1;this.options=d;this.finish=d.finish;this.sound=null;!0===d.preLoad&&this.load(d.callback)};
jWebAudio.SoundSource.prototype.load=function(a){if(!this.isLoaded){var d=new XMLHttpRequest;d.open("GET",this.url,!0);d.responseType="arraybuffer";var e=this;d.onload=function(){jWebAudio.context.decodeAudioData(d.response,function(c){e.sound=e.multishot?new jWebAudio.WebAudioMultishotSound(c):new jWebAudio.WebAudioSound(c,e.finish);e.sound.options=e.options;e.isLoaded=!0;a&&a();return!0},function(){console.error("Cannot decode: "+e.url);return!1})};d.onerror=function(){console.error("Load error")};
d.send()}};jWebAudio.extend=function(a,d){var e=function(){};e.prototype=d.prototype;a.prototype=new e;a.prototype.constructor=a};jWebAudio.leftMerge=function(a,d){for(var e in d)a.hasOwnProperty(e)&&("object"===typeof a[e]?"object"===typeof d[e]&&leftMerge(a[e],d[e]):a[e]=d[e])};
jWebAudio.Sound=function(){this.STOPPED=0;this.PLAYING=1;this.PAUSED=2;var a=this,d={loop:!1,loopGap:0,muted:!1,volume:100,fadeIn:!1,fadeOut:!1,fadeInTime:3,fadeOutTime:3};this.getOptions=function(){return d};this.__defineGetter__("options",this.getOptions);this.setOptions=function(b){b&&("boolean"===typeof b.muted&&b.muted!==d.muted&&a.setMuted(b.muted),"number"===typeof b.volume&&b.volume!==d.volume&&a.setVolume(b.volume),"boolean"===typeof b.fadeIn&&(d.fadeIn=b.fadeIn,a.setFadeIn(d.fadeIn,b.fadeInTime)),
"boolean"===typeof b.fadeOut&&(d.fadeOut=b.fadeOut,a.setFadeOut(d.fadeOut,b.fadeOutTime)),jWebAudio.leftMerge(d,b))};this.__defineSetter__("options",this.setOptions);this.setMuted=function(a){"boolean"!==typeof a?console.error("Error type of mute!"):(d.muted=a,c.gain.value=a?0:d.volume/100)};this.getMuted=function(b){return a.options.muted};this.setVolume=function(a){a=+a;isNaN(a)?console.error("Error type of volume in setVolume"):(d.volume=a,c.gain.value=a/100)};this.getVolume=function(){return a.options.volume};
this.getLoop=function(){return a.options.loop};var e=jWebAudio.context,c=e.createGain();this.__defineGetter__("gain",function(){return c});var b=[],g=[];this.addEffect=function(a){"string"===typeof a&&(a=new jWebAudio.Effect(a));if(a instanceof jWebAudio.Effect){var d;a:{for(d=0;d<b.length;++d)if(void 0!==b[d]){d=b[d];break a}d=null}var h;a:{for(h=b.length-1;0<=h;--h)if(void 0!==b[h]){h=b[h];break a}h=null}null!==d?(h.outNode.disconnect(),h.outNode.connect(a.inNode)):(c.disconnect(),c.connect(a.inNode));
a.outNode.connect(e.destination);b.push(a);g.push(a.getName());return b.length-1}console.error("Error in addEffect: effect is not instance of Effect")};this.getEffectNames=function(){return g};this.getEffect=function(a){return b[a]};this.deleteEffect=function(a){if(void 0!==b[a]){for(var d=null,h=a-1;0<=h;--h)if(void 0!==b[h]){d=b[h].outNode;break}for(var k=e.destination,h=a+1;h<b.length;++h)if(void 0!==b[h]){k=b[h].inNode;break}null===d?(c.disconnect(),c.connect(k)):(d.disconnect(),d.connect(k));
delete b[a];delete g[a]}};this.clearAllEffects=function(){for(var a=b.length-1;0<=a;--a)if(void 0!==b[a]){c.disconnect();b[a].outNode.disconnect();c.connect(e.destination);b=[];g=[];break}};c.connect(e.destination)};
jWebAudio.WebAudioSound=function(a,d){function e(){var a=h.duration-k;m=g.createBufferSource();m.buffer=h;m.loop=b.options.loop;m.connect(f);b.options.fadeIn&&(f.gain.setValueAtTime(f.gain.minValue,g.currentTime),f.gain.linearRampToValueAtTime(f.gain.maxValue,g.currentTime+b.options.fadeInTime));m.start(0,k,a);n=g.currentTime;l=b.PLAYING;p=function(){return setTimeout(function(){!0===b.options.loop?(b.seek(0),b.options.loopGap&&0<b.options.loopGap&&(b.stop(),loopGapEvent=setTimeout(function(){e()},
1E3*b.options.loopGap))):(k=0,l=b.STOPPED);d&&d()},1E3*a)}();!0===b.options.fadeOut&&(q=function(){return setTimeout(function(){f.gain.setValueAtTime(f.gain.maxValue,g.currentTime);f.gain.linearRampToValueAtTime(f.gain.minValue,g.currentTime+b.options.fadeOutTime)},1E3*(a-b.options.fadeOutTime))}())}function c(){l===b.PLAYING&&(m.stop(),m=null,k+=g.currentTime-n,clearTimeout(p),clearTimeout(q))}jWebAudio.Sound.call(this);var b=this,g=jWebAudio.context,f=g.createGain();f.connect(b.gain);var m=null,
h=a;this.__defineGetter__("duration",function(){return h.duration});var k=0;this.__defineGetter__("offset",function(){return l===b.PLAYING?g.currentTime-n+k:k});this.seek=function(a){if("number"!==typeof a||0>a||a>h.duration)console.error("Error arg in WebAudioSound.");else{var b=l;c();k=a;b===this.PLAYING&&e()}};var n=0,l=this.STOPPED;this.__defineGetter__("state",function(){return l});var p=null,q=null;this.play=function(){l!==b.PLAYING&&e()};this.pause=function(){l===b.PLAYING&&(c(),l=b.PAUSED)};
this.stop=function(){if(l!==b.STOPPED)if(b.options.fadeOut){var a=b.options.fadeOutTime;f.gain.linearRampToValueAtTime(f.gain.minValue,g.currentTime+a);setTimeout(function(){c();k=0;l=b.STOPPED},1E3*a)}else c(),k=0,l=b.STOPPED};this.setFadeIn=function(a,c){"boolean"===typeof a?(b.options.fadeIn=a,"number"===typeof c&&(b.options.fadeInTime=c)):(b.options.fadeOut=ifFadeOut,console.error("Error type in setFadeIn."))};this.setFadeOut=function(a,c){"boolean"===typeof a&&"number"===typeof c&&(b.options.fadeOutTime=
c)}};jWebAudio.extend(jWebAudio.WebAudioSound,jWebAudio.Sound);jWebAudio.WebAudioMultishotSound=function(a){jWebAudio.Sound.call(this);var d=jWebAudio.context,e=[],c=this;this.play=function(){var b=d.createBufferSource();b.buffer=a;b.loop=this.loop;b.connect(c.gain);b.start();e.push(b)};this.stop=function(){e.forEach(function(a){a.stop();a.disconnect()});e=[]}};jWebAudio.extend(jWebAudio.WebAudioMultishotSound,jWebAudio.Sound);
jWebAudio.Effect=function(a){if("telephonize"===a)return new jWebAudio.Filter(a,[{type:jWebAudio.Filter.prototype.LOWPASS,frequency:2E3},{type:jWebAudio.Filter.prototype.HIGHPASS,frequency:500}]);if("cathedral"===a)return new jWebAudio.Filter(a,[{type:jWebAudio.Filter.prototype.BANDPASS,frequency:3E3},{type:jWebAudio.Filter.prototype.ALLPASS,frequency:1E3}]);if("3d"===a)return new jWebAudio.Spatiality;console.error('Effect name: "'+a+'" not found')};
jWebAudio.Filter=function(a,d){this.getName=function(){return a};var e,c;c=[];var b,g,f=[];if(d instanceof Array)c=d;else if(d instanceof Object)c.push(d);else return;var m=jWebAudio.context;for(e=0;e<c.length;++e)b=c[e],0<=b.type&&7>=b.type&&(g=m.createBiquadFilter(),g.type=b.type,g.frequency.value=b.frequency,g.Q.value=b.Q,g.gain.value=b.gain,f.push(g));for(e=0;e<f.length-1;++e)c=e+1,f[e].connect(f[c]);this.__defineGetter__("inNode",function(){return f[0]});this.__defineGetter__("outNode",function(){return f[f.length-
1]})};jWebAudio.extend(jWebAudio.Filter,jWebAudio.Effect);jWebAudio.Filter.prototype.LOWPASS=0;jWebAudio.Filter.prototype.HIGHPASS=1;jWebAudio.Filter.prototype.BANDPASS=2;jWebAudio.Filter.prototype.LOWSHELF=3;jWebAudio.Filter.prototype.HIGHSHELF=4;jWebAudio.Filter.prototype.PEAKING=5;jWebAudio.Filter.prototype.NOTCH=6;jWebAudio.Filter.prototype.ALLPASS=7;
jWebAudio.Spatiality=function(){this.soundObject=jWebAudio.context.createPanner();var a=this;this.__defineGetter__("inNode",function(){return a.soundObject});this.__defineGetter__("outNode",function(){return a.soundObject})};jWebAudio.extend(jWebAudio.Spatiality,jWebAudio.Effect);jWebAudio.Spatiality.prototype.getName=function(){return"3d"};
(function(a){if(void 0===jWebAudio)a.error("Please include standard.jWebAudio.js first!");else{var d=new jWebAudio.SoundEngine,e={addSoundSource:function(c){return this.each(function(){e.existsSound.call(a(this))&&(console.warn("Sound already exists. It will be destroyed now."),e.destroySound.call(a(this)));"string"!==typeof c.url?a.error("Error type of url!"):(a(this).data("soundId",d.soundArray.length),d.addSoundSource(c))})},destroySound:function(){return this.each(function(){var c=a(this).data("soundId");
d.destroySound(c)})},existsSound:function(){return void 0===a(this).data("soundId")?!1:!0},load:function(c){return this.each(function(){if(void 0!==a(this).data("soundId")){var b=a(this).data("soundId");d.soundArray[b].load(c)}else a.error("Please call addSoundSource first!")})},play:function(){return this.each(function(){if(void 0!==a(this).data("soundId")){var c=a(this).data("soundId");d.soundArray[c].sound.play()}else a.error("Please call addSoundSource first!")})},pause:function(){return this.each(function(){if(void 0!==
a(this).data("soundId")){var c=a(this).data("soundId");d.soundArray[c].sound.pause()}else a.error("Please call addSoundSource first!")})},stop:function(){return this.each(function(){if(void 0!==a(this).data("soundId")){var c=a(this).data("soundId");d.soundArray[c].sound.stop()}else a.error("Please call addSoundSource first!")})},seek:function(c){if(void 0!==a(this).data("soundId")){var b=a(this).data("soundId"),e=d.soundArray[b].sound;if(e.options.multishot)a.error("You cannot call seek with multishot sound!");
else return void 0===c?e.offset:this.each(function(){e.seek(c)})}else a.error("Please call addSoundSource first!")},duration:function(){if(void 0!==a(this).data("soundId")){var c=a(this).data("soundId"),c=d.soundArray[c].sound;if(c.options.multishot)a.error("You cannot get duration with multishot sound!");else return c.duration}else a.error("Please call addSoundSource first!")},finish:function(c){return this.each(function(){if(void 0!==a(this).data("soundId")){var b=a(this).data("soundId");c&&"function"!==
typeof c?a.error("Error type of finish!"):d.soundArray[b].finish=c}else a.error("Please call addSoundSource first!")})},addEffect:function(c){if(void 0!==a(this).data("soundId")){var b=a(this).data("soundId"),b=d.soundArray[b].sound;if("string"===typeof c)return b.addEffect(c);if("object"===typeof c&&void 0!==c.name&&void 0!==c.options)return b.addEffect(new jWebAudio.Filter(c.name,c.options));a.error("Error type of effect!")}else a.error("Please call addSoundSource first!")},deleteEffect:function(c){return this.each(function(){if(void 0!==
a(this).data("soundId")){var b=a(this).data("soundId"),b=d.soundArray[b].sound;if("number"===typeof c)b.deleteEffect(c);else if("object"===typeof c)for(var e in c)b.deleteEffect(c[e])}else a.error("Please call addSoundSource first!")})},getEffect:function(c){if(void 0!==a(this).data("soundId")){var b=a(this).data("soundId");if("number"===typeof c)return d.soundArray[b].sound.getEffect(c);a.error("Error type in set3dEffectPosition!")}else a.error("Please call addSoundSource first!")},clearAllEffects:function(){return this.each(function(){if(void 0!==
a(this).data("soundId")){var c=a(this).data("soundId");d.soundArray[c].sound.clearAllEffects()}else a.error("Please call addSoundSource first!")})},options:function(c){if(void 0===c){var b=a(this).data("soundId");return d.soundArray[b].sound.options}return this.each(function(){if(void 0!==a(this).data("soundId")){var b=a(this).data("soundId");d.soundArray[b].sound.options=c}else a.error("Please call addSoundSource first!")})}};a.fn.jWebAudio=function(c,b,d){if(e[c]){if(void 0===b)return e[c].call(this);
if("object"===typeof b){var f=a.extend({callback:function(){}},b);"function"===typeof d&&a.extend(f,{callback:d})}else f=b;return e[c].call(this,f)}if("object"!==typeof c&&c)a.error("Method "+c+" does not exist on jquery.jWebAudio");else return f=a.extend({callback:function(){}},c||{}),"function"===typeof b&&a.extend(f,{callback:b}),e.init.call(this,f)}}})(jQuery);
