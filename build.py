
import json
from pprint import pprint
import os
from PIL import Image  # uses pillow
from random import randint

def format_path(path) :   
    return path.replace("\\", "/").replace("public/", '')

def load(path):

    data = {}
     
    with open(path) as data_file:    
        data = json.load(data_file)
    
    return data

def build_dir(directory):

    directory_path, directory_name = os.path.split(directory)

    data = {}
    children = []

    #iterate through the directory files ---
    for file_ in os.listdir(directory):

        file_name = os.path.splitext(file_)[0]
        file_path = os.path.join(directory, file_)

        # if the file is a directory ---
        if os.path.isdir(file_path) :
                
            dir_data = build_dir(file_path)

            if dir_data :
                children.append(dir_data)

        #if the file is not a directory ---
        else :

            if (file_name == directory_name) :

                if file_.endswith(".json"): 
                    pass # do nothing here - maybe later ---

                elif file_.endswith(".jpg") or file_.endswith(".png"):
                    data["src"] = format_path(file_path)       

                elif file_.endswith(".txt") :
                    data["content"] = [line.rstrip('\n') for line in open(file_path)]

            else :

                file_data = {}
                file_data["label"] = file_name
                file_data["type"] = 'data'

                if file_.endswith(".json"): 
                    pass # do nothing here - maybe later ---

                elif file_.lower().endswith(".jpg") or file_.lower().endswith(".png"):
                    file_data["src"] = format_path(file_path)       

                elif file_.endswith(".txt") :
                    file_data["content"] = [line.rstrip('\n') for line in open(file_path)]
                
                children.append(file_data)


    #set all outputs ---

    data["label"] = directory_name
    data["type"] = "dir"

    if len(children) :
        data["children"] = children
        
    return data

    
out = build_dir("public\\data\\root")

#pprint(out)

with open('public/data/data.json', 'w') as out_file:
    json.dump(out, out_file, indent=4, sort_keys=True)

            
