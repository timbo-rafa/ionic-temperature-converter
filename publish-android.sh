set -x
ionic cordova platform add android
ionic cordova plugin rm org.apache.cordova.console
ionic cordova plugin rm cordova-plugin-console
#keytool -genkey -v -keystore ../keystore/temperature-converter-release-key.keystore \
#    -alias temperature-converter -keyalg RSA -keysize 2048 -validity 10000
ionic cordova build android --release
cd platforms/android/app/build/outputs/apk/release
rm temperature-converter.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../../../../../../keystore/temperature-converter-release-key.keystore app-release-unsigned.apk temperature-converter
$ANDROID_HOME/build-tools/27.0.3/zipalign -v 4 app-release-unsigned.apk temperature-converter.apk
cd ../../../../../../../
cp platforms/android/app/build/outputs/apk/release/temperature-converter.apk android-release/
