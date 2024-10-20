import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product-api";
import useCameraStore from "../../store/camera-store";

export default function Uploadfile(props) {
    const { form, setForm } = props;
    const token = useCameraStore((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);
  
    const hdlOnChange = (e) => {

      setIsLoading(true)
      const files = e.target.files;
      if (files) {
        setIsLoading(true);
        let allFiles = form.images;
        for (let i = 0; i < files.length; i++) {
          // validate
          const file = files[i];
          if (!file.type.startsWith("image/")) {
            toast.error(`File ${file.name} requires an image`);
            continue;
          }
  
          // Image Resize
          Resize.imageFileResizer(
            files[i],
            1000,
            1000,
            "PNG",
            100,
            0,
            (data) => {
              uploadFiles(token, data)
                .then((res) => {
                  console.log(res);
  
                  allFiles.push(res.data);
                  setForm({
                    ...form,
                    images: allFiles,
                  });
                  setIsLoading(false)
                  toast.success("Upload image Success!!");
                })
                .catch(() => {
                  console.log(err);
                  setIsLoading(false)
                });
            },
            "base64"
          );
        }
      }
    };

    const hdlDelete = (public_id)=>{
        const images = form.images
        removeFiles(token,public_id)
        .then((res)=> {
            const filterImages = images.filter((item)=>{
                return item.public_id !== public_id
            })
            console.log(filterImages)
            setForm({
                ...form,
                images: filterImages
            })

            toast.error(res.data)
        })
        .catch((err)=>{
            console.log(err)

        })
    }
  
    return (
        <div className="bg-black text-yellow-500">
        <div className="flex mx-4 gap-4 my-4">

      {
        isLoading && <span className="loading loading-spinner text-warning w-16 h-16"></span>
      }


        {/* image */}
          {form.images.map((item, index) => (
            <div key={index} className="relative  p-1">
              <img src={item.url} className="w-36 h-36 rounded-md shadow-lg hover:scale-105" />
              <span className="absolute top-0 right-0 p-1 text-yellow-500 cursor-pointer hover:text-red-500"
              onClick={()=>hdlDelete(item.public_id)}
              >
                X
              </span>
            </div>
          ))}
        </div>
      
        <div className="my-4">
          <input
            type="file"
            name="images"
            multiple
            className="file:bg-yellow-500 file:text-black file:rounded-md file:py-2 file:px-4 cursor-pointer hover:file:bg-yellow-600"
            onChange={hdlOnChange}
          />
        </div>
      </div>
      
    );
  }
  