#!/bin/bash
#mv Animated\ gif.00*.png Animated\ gif.png
<<COMENT
VAR=0
for i in Animated*.png
do
	convert "$i" -crop 4045x2350+0+126 "out-$VAR.png"
	convert "out-$VAR.png" -resize 30% "compressed-out-$((VAR++)).png"
done

img2webp $(ls -v compressed-out*.png) -loop 1 -d 4 -o Animated.webp

img2webp -loop 1 -lossy $(ls -v compressed-out*.png) -o Animated.webp
COMENT

compressed-out-0.png -d 40 compressed-out-1.png -d 40 compressed-out-2.png -d 40 compressed-out-3.png -d 40 compressed-out-4.png -d 40 compressed-out-5.png -d 40 compressed-out-6.png -d 40 compressed-out-7.png -d 40 compressed-out-8.png -d 40 compressed-out-9.png -d 40 compressed-out-10.png -d 40 compressed-out-11.png -d 40 compressed-out-12.png -d 40 compressed-out-13.png -d 40 compressed-out-14.png -d 40 compressed-out-15.png -d 40 compressed-out-16.png -d 40 compressed-out-17.png -d 40 compressed-out-18.png -d 40 compressed-out-19.png -d 40 compressed-out-20.png -d 40 compressed-out-21.png -d 40 compressed-out-22.png -d 40 compressed-out-23.png -d 40 compressed-out-24.png -d 40 compressed-out-25.png -d 40 compressed-out-26.png -d 40 compressed-out-27.png -d 40 compressed-out-28.png -d 40 compressed-out-29.png -d 40 compressed-out-30.png -d 40 compressed-out-31.png -d 40 compressed-out-32.png -d 40 compressed-out-33.png -d 40 compressed-out-34.png -d 40 compressed-out-35.png -d 40 compressed-out-36.png -d 40 compressed-out-37.png -d 40 compressed-out-38.png -d 40 compressed-out-39.png -d 40 compressed-out-40.png -d 40 compressed-out-41.png -d 40 compressed-out-42.png -d 40 compressed-out-43.png -d 40 compressed-out-44.png -d 40 compressed-out-45.png -d 40 compressed-out-46.png -d 40 compressed-out-47.png -d 40 compressed-out-48.png -d 40 compressed-out-49.png -d 40 compressed-out-50.png -d 40 compressed-out-51.png -d 40 compressed-out-52.png -d 40 compressed-out-53.png -d 40 compressed-out-54.png -d 40 compressed-out-55.png -d 40 compressed-out-56.png -d 40 compressed-out-57.png -d 40 compressed-out-58.png -d 40 compressed-out-59.png -d 40 compressed-out-60.png -d 40 compressed-out-61.png -d 40 compressed-out-62.png -d 40 compressed-out-63.png -d 40 compressed-out-64.png -d 40 compressed-out-65.png -d 40 compressed-out-66.png -d 40 compressed-out-67.png -d 40 compressed-out-68.png -d 40 compressed-out-69.png -d 40 compressed-out-70.png -d 40 compressed-out-71.png -d 40 compressed-out-72.png -d 40 compressed-out-73.png -d 40 compressed-out-74.png -d 40 compressed-out-75.png -d 40 compressed-out-76.png -d 40 compressed-out-77.png -d 40 compressed-out-78.png -d 40 compressed-out-79.png -d 40 compressed-out-80.png -d 40 compressed-out-81.png -d 40 compressed-out-82.png -d 40 compressed-out-83.png -d 40 compressed-out-84.png -d 40 compressed-out-85.png -d 40 compressed-out-86.png -d 40 compressed-out-87.png -d 40 compressed-out-88.png -d 40 compressed-out-89.png -d 40 compressed-out-90.png -d 40 compressed-out-91.png -d 40 compressed-out-92.png -d 40 compressed-out-93.png -d 400 compressed-out-94.png
