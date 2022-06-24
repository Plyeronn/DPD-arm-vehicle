# VEHICLE
## April Tag Recognition
### First we need to install april tag library.
```
pip install apriltag
```
### I got an error with CMake, so we need to install CMake explicitely.
```
pip install CMake
```
### To run the script put some sample_data.jpeg into /Vehicle/AprilTagRecognition/files/ folder, go the /Vehicle/AprilTagRecognition directory and start the script with
```
python3 detection.py --image files/sample_data.jpeg
```
### Program will return the initial image with borders of detected apriltags and prints the corners for every detected april tag family in the console