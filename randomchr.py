import random
import string

def random_string(length, seq=string.digits + string.ascii_lowercase):
    sr = random.SystemRandom()
    return ''.join([sr.choice(seq) for i in range(length)])

strings=[]

for i in range(20):
    strings.append(random_string(20))

string='","'.join(strings)
print(string)

with open("randomtext.txt", "w") as file:
  file.write(string)
