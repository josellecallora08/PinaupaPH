import building from '/city.svg'
import { BarChart } from 'react-chartkick'
import 'chartkick/chart.js'


const Dashboard = () => {



  return (
            <div className='w-full h-inherit px-2'>
                <h1 className='font-semibold text-2xl  p-2'>Dashboard</h1>
                <div className='w-full h-full grid justify-items-stretch grid-cols-3 grid-rows-7 gap-2 '>
                    <div className='row-span-1 col-span-3 shadow-md rounded-sm px-5  flex justify-between items-center w-full h-full'>
                        <figure className='w-full h-full object-contain'>
                            <img src={building} className='max-w-32 max-h-32 object-cover w-full h-full' alt="" />
                        </figure>
                        <div className='flex items-center justify-end w-full text-end h-full'>
                            <h1 className='font-bold text-2xl text-blue-900'>Hey, Elizabeth!</h1>
                        </div>
                    </div>
                    <div className='row-span-4 col-span-3 w-full h-full gap-2 grid md:grid-cols-3'>
                        <div className='w-full h-full md:col-span-2 shadow-md'>
                            <BarChart colors={["lightblue", "#6626"]} thousands="," curve={true} round={2} zeros={true}  
                            data={{"2020-01-01": 10000, "2024-01-02": 6500, "2024-02-20": 1000, "2024-01-01": 2000, "2024-01-02": 6500, "2024-02-20": 5000}} />
                        </div>
                        <div className='w-full h-full md:col-span-1 shadow-md'>
                            2
                        </div>
                    </div>
                    <div className='row-span-2 col-span-3 w-full h-full grid gap-2 md:grid-flow-col'>
                        <div className='md:col-span-1 shadow-xl'>1</div>
                        <div className='md:col-span-1 shadow-xl'>2</div>
                        <div className='md:col-span-1 shadow-xl'>3</div>
                    </div>
                </div>
            </div>
  )
}

export default Dashboard