def convertToFloat(value):
    float_value = None
    try:
        float_value = float(value)
    except:
        print("use just Number")
    return  float_value  
    
def get_min_key(numbers):
    min_key = None
    min_value = None
    for key, value in numbers.items():
        float_value = convertToFloat(value)
        if float_value is None:
            break
        if min_value is None or float_value < min_value:
            min_key = key
            min_value = float_value
        elif float_value == min_value and key < min_key:
            min_key = key
    return min_key
    
    
    
Numbers = {
    "number_1": "10.5",
    "number_2": 20,
    "number_3": 3.5,
    "number_4": 15
}


min_key = get_min_key(Numbers)
print("Minimum key with minimum value:", min_key)

