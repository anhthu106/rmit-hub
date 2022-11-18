export default function Search({onchange}){
    return(
            <div
                className='w-11/12 m-auto mt-40 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-0'>
                <input onChange={onchange} type='text' placeholder='Search...'/>
            </div>
        )
}