weight = input("Weight: ")
measurement = input("(K)g or (L)bs: ")
lbs = float(weight)/0.45
kg = float(weight)*2.2

if measurement == "K":
    print(lbs + "lbs")
elif measurement == "L":
    print(kg + "kg")