import React from 'react'

import { ThreeDots } from  'react-loader-spinner'

const Loader = () => {
  return (
    <div className='max-w-4xl mx-auto text-gray-50 pt-2 pb-50 '>
      <div className="mx-4 flex justify-center items-center">

        <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color="#ffff" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
          />
      </div>

    </div>
  )
}

export default Loader