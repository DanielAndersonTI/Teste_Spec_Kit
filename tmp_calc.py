import math
heights=[1.75,1.70,1.80,1.60,1.82]
for h in heights:
    v=24.9*h*h
    print(h, v, round(v*10)/10, math.floor(v*10)/10)
