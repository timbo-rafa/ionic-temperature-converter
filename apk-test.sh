git stash
git branch -D apk-test
git push origin --delete apk-test
git checkout -b apk-test
git stash apply
ionic cordova build android --release
git add platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk -f
git commit -m "Testing new apk"
git push origin apk-test
git checkout master