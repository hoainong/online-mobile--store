import { Rating } from '@mui/material';
import React from 'react';
import { format, parseISO } from 'date-fns';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const Review = ({data}) => {
    let averageRate;
if (data.previews && data.previews.length > 0) {
    const totalRate = data.previews.reduce((acc, preview) => acc + preview.rate, 0);
    averageRate =Math.round(totalRate / data.previews.length);
    console.log("Giá trị trung bình của preview.rate:", averageRate);
  } else {
    console.log("Không có dữ liệu hoặc mảng previews rỗng.");
  }
  
  return (
    <section className="flex items-center py-16 bg-gray-100 font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-6 mb-6 bg-gray-50 dark:bg-gray-900">
                    <h2 className="mb-6 text-xl font-semibold text-left font-gray-600 dark:text-gray-400">
                        Ratings & Reviews</h2>
                    <div className="flex justify-start ">
                        <div
                            className="flex items-center mb-2 space-x-2 text-3xl leading-none text-gray-600 dark:text-gray-400 ">
                            <div className="items-center font-bold ">{averageRate?averageRate:''}</div>
                            <div className="items-center">
                            <Rating name="read-only" value={averageRate?averageRate:''} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 text-xs dark:text-gray-400">{data.previews?.length} customer reviews</div>
   
                </div>
                <div className="p-6 mb-6 bg-white dark:bg-gray-900">
                    <h2 className="mb-6 text-xl font-semibold text-left font-gray-600 dark:text-gray-400">
                        Leave a comment</h2>
                    <form action="" className="">
                        <div className="mb-6 ">
                            <input type="text" placeholder="your email" required=""
                                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-500 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 "/>
                        </div>
                        <div className="mb-6 ">
                            <textarea type="message" placeholder="write a comment" required=""
                                className="block w-full px-4 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-500 py-7 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 "></textarea>
                        </div>
                        <div className="">
                            <button
                                className="px-4 py-2 text-xs font-medium text-gray-100 bg-blue-500 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700">
                                Submit comment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="p-6 dark:bg-gray-900 bg-gray-50">
                {data.previews?.map((item, index) => (
                    <div className="flex flex-wrap items-center mb-4 space-x-2" key={index}>
                    <div className="flex self-start flex-shrink-0 cursor-pointer">
                        <img
                        src={item.imageUrl != null ? item.imageUrl : "https://icons.veryicon.com/png/o/miscellaneous/administration/account-25.png"}
                        alt=""
                        className="object-fill w-16 h-16 rounded-full"
                        />
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <div className="block">
                        <div className="w-auto px-2 pb-2">
                            <div className="font-medium">
                            <div className="text-lg font-semibold dark:text-gray-400 hover:underline">
                                <small>{item.userName} </small> <Rating className='ml-4' name="read-only" value={item.rate?item.rate:''} readOnly />
                            </div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item.content}
                            </div>
                        </div>
                        <div className="flex items-center justify-start w-full text-xs">
                            <div className="flex items-center justify-center px-2 space-x-1 font-semibold text-gray-700 dark:text-gray-400">
                            <span className="self-center">.</span>
                            <div className="hover:underline">
                                <span>Reply</span>
                            </div>
                            <span className="self-center">.</span>
                            <div className="hover:underline">
                                <span>{format(parseISO(item.createDate), 'dd/MM/yyyy HH:mm:ss')}</span>
                            </div>
                            </div>
                        </div>
                        {item.repPreviews?.map((rep, repIndex) => (
                            <div className="flex flex-wrap ml-5 items-center mt-4 mb-4 space-x-2" key={repIndex}>
                                <div className="flex self-start flex-shrink-0 cursor-pointer">
                                        <SupervisorAccountIcon></SupervisorAccountIcon>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="block">
                                    <div className="w-auto px-2 pb-2">
                                        <div className="font-medium">
                                        <div className="text-lg font-semibold dark:text-gray-400 hover:underline">
                                            <small>admin:{rep.content}</small>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start w-full text-xs">
                                        <div className="flex items-center justify-center px-2 space-x-1 font-semibold text-gray-700 dark:text-gray-400">
                                        <span className="self-center">.</span>
                                        <span className="self-center">.</span>
                                        <div className="hover:underline">
                                            <span>{format(parseISO(rep.createDate), 'dd/MM/yyyy HH:mm:ss')}</span>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                        ))}
                        </div>
                    </div>
                    </div>
                ))}
                </div>

        </div>
    </section>
  )
}

export default Review
