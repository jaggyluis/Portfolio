
import json
from pprint import pprint
import os, shutil
from PIL import Image  # uses pillow
from random import randint
import uuid
import math

source_path = "src\\data\\root\\"
target_path = "public/data/"    
target_src = "data/"

file_image_pixel_target = 1000000
file_image_pixel_target_mobile = 500000
file_image_pixel_target_sm = 10

def format_path_src(path) :   
    # return path.replace("\\", "/").replace(source_path, target_path)
    return path.replace(source_path, target_src).replace("\\", "/")

def format_path(path) :
    return path.replace(source_path, target_path).replace("\\", "/")

def load_image(path):
    return Image.open(path)

def compress_image(im, target_pixel_count) :

    im_size = im.size
    im_pixel_count = im_size[0] * im_size[1] 
    im_pixel_factor =  int(math.sqrt(im_pixel_count / target_pixel_count))

    if (im_pixel_count > target_pixel_count and im_pixel_factor != 1) :

        im_new_x = im_size[0]/im_pixel_factor
        im_new_y = im_size[1]/im_pixel_factor

        if im_new_x <= 0 : im_new_x = 1
        if im_new_y <= 0 : im_new_y = 1

        im = im.resize((im_new_x,im_new_y),Image.ANTIALIAS)

        print "--> " , im_size, im_pixel_count, im.size, target_pixel_count, im_pixel_factor

    return im

def load(path):

    data = {}
     
    with open(path) as data_file:    
        data = json.load(data_file)
    
    return data

def build_dir(directory, target):

    directory_path, directory_name = os.path.split(directory)

    if not os.path.exists(target):
        print "directory does not exist - building : " , target
        os.makedirs(target)

    data = {}
    children = []
    images = []

    #iterate through the directory files ---
    for file_ in os.listdir(directory):

        print(directory, file_)

        file_name = os.path.splitext(file_)[0]
        file_path = os.path.join(directory, file_)
        
        # if the file is a directory ---
        if os.path.isdir(file_path) :
                
            dir_path_target = target + "/" + file_
            dir_data = build_dir(file_path, dir_path_target)

            if dir_data :
                children.append(dir_data)

        #if the file is not a directory ---
        else :

            file_extension = file_.split(".")[-1]

            if (file_name == directory_name) :

                if file_.endswith(".json"): 
                    pass # do nothing here - maybe later ---

                elif file_.lower().endswith(".jpg") or file_.lower().endswith(".png") or file_.lower().endswith(".bmp"):

                    file_image_target_path = format_path(file_path)
                    file_image_targed_path_mobile = format_path(directory + "/" + file_name + "_m." + file_extension)
                    file_image_targed_path_sm = format_path(directory + "/" + file_name + "_s." + file_extension)

                    file_image_target_src = format_path_src(file_path)
                    
                    file_image = load_image(file_path)
                    file_image_aspect = float(file_image.size[0]) / float(file_image.size[1])
                    file_image_size = round(file_image_aspect)

                    file_image_compressed = compress_image(file_image, file_image_pixel_target)
                    file_image_compressed_mobile = compress_image(file_image, file_image_pixel_target_mobile)
                    file_image_compressed_sm = compress_image(file_image, file_image_pixel_target_sm)

                    file_image_compressed.save(file_image_target_path, optimize=True,quality=95) 
                    file_image_compressed_mobile.save(file_image_targed_path_mobile, optimize=True, quality=95)
                    file_image_compressed_sm.save(file_image_targed_path_sm, optimize=True, quality=95)

                    # write this to the tree ---
                    data["src"] = file_image_target_src

                elif file_.endswith(".txt") :
                    data["content"] = [line.rstrip('\n') for line in open(file_path)]

            else :

                file_data = {}
                file_data["label"] = file_name
                file_data["type"] = 'data'
                file_data["id"] = str(uuid.uuid1())

                if file_.endswith(".json"): 
                    pass # do nothing here - maybe later ---

                elif file_.lower().endswith(".jpg") or file_.lower().endswith(".png") or file_.lower().endswith(".bmp"):

                    file_image_target_path = format_path(file_path)
                    file_image_targed_path_mobile = format_path(directory + "/" + file_name + "_m." + file_extension)
                    file_image_targed_path_sm = format_path(directory + "/" + file_name + "_s." + file_extension)

                    file_image_target_src = format_path_src(file_path)
                    
                    file_image = load_image(file_path)
                    file_image_aspect = float(file_image.size[0]) / float(file_image.size[1])
                    file_image_size = round(file_image_aspect)

                    file_image_compressed = compress_image(file_image, file_image_pixel_target)
                    file_image_compressed_mobile = compress_image(file_image, file_image_pixel_target_mobile)
                    file_image_compressed_sm = compress_image(file_image, file_image_pixel_target_sm)

                    file_image_compressed.save(file_image_target_path, optimize=True,quality=95) 
                    file_image_compressed_mobile.save(file_image_targed_path_mobile, optimize=True, quality=95)
                    file_image_compressed_sm.save(file_image_targed_path_sm, optimize=True, quality=95)

                    # write this to the tree ---
                    file_data["src"] = file_image_target_src   
                    images.append(file_image_target_src)

                elif file_.endswith(".txt") :
                    file_data["content"] = [line.rstrip('\n') for line in open(file_path)]
                
                children.append(file_data)

    #set all outputs ---

    data["label"] = directory_name
    data["type"] = "dir"
    data["id"] = str(uuid.uuid1())

    if not "src" in data.keys() and len(images):
        data["src"] = images[0]

    if len(children) :
        data["children"] = children
        
    return data

# remove the existing build at start ---
for filename in os.listdir(target_path):
    file_path = os.path.join(target_path, filename)
    try:
        if os.path.isfile(file_path) or os.path.islink(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)
    except Exception as e:
        print('Failed to delete %s. Reason: %s' % (file_path, e))

# build the new directory output ---
out = build_dir(source_path, target_path)

#pprint(out)

# save the tree ---
with open('public/data.json', 'w') as out_file:
    json.dump(out, out_file, indent=4, sort_keys=True)

            
