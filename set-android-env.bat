@echo off
REM Set ANDROID_HOME permanently
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk" /M
setx ANDROID_SDK_ROOT "%ANDROID_HOME%" /M

REM Add platform-tools and emulator to PATH permanently
setx PATH "%PATH%;C:\Users\%USERNAME%\AppData\Local\Android\Sdk\platform-tools;C:\Users\%USERNAME%\AppData\Local\Android\Sdk\emulator" /M

echo ANDROID_HOME and ANDROID_SDK_ROOT set permanently
pause
