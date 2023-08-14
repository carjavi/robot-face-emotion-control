<p align="center"><img src="./img/logo.png" height="100" alt=" " /></p>
<h1 align="center"> Robot Face Emotion Control </h1> 
<h4 align="right">Jul 23</h4>

<br>

# Testing Mode Manual
desde SSH /home/carjavi/GUI-face
```
node server.js
```

##  Structuring Your Files
```
  /GUI-face
      /server.js
      /build
         /index.html
         /emoji
         /js
         /css
 ```
> :memo: **Note:** Los videos están escalos con Adobe Premier a 600x400px, scale 73% position 310.0 / 200.0

> :warning: **Warning:** El refrescamiento del browser afecta un poco la animación de la cara.

# Run server on RPI at Startup
Edit this file
```
sudo nano /etc/rc.local
```
And add this:
```
node /home/carjavi/GUI-face/server.js
```

# Open chromium full screen on RPI4 start up

1. Hide mouse cursor
```
sudo apt-get install unclutter
```

2. Edit this file
```
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
```

3. And add this:
```
@xset s off
@xset -dpms
@xset s noblank
@chromium-browser --kiosk http://localhost:8080
@unclutter -idle 0.1 -root
```



<br>

---
Copyright &copy; 2022 [carjavi](https://github.com/carjavi). <br>
```www.instintodigital.net``` <br>
carjavi@hotmail.com <br>
<p align="center">
    <a href="https://instintodigital.net/" target="_blank"><img src="./img/developer.png" height="100" alt="www.instintodigital.net"></a>
</p>

