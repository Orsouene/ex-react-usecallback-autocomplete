import React, { useCallback, useEffect, useState } from 'react'
import { debounce } from "lodash"
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from "react-icons/io";

function Ricerca() {
    const [ricerca, setRicerca] = useState([])
    const [query, setQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const fetchProduct = (query) => {
        console.log("Chiamata")
        return (fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`).then(res => res.json()).then(data => {
            setRicerca(data)
            // console.log(data)
        }


        ).catch(err => console.log("errore nella recuperazione dei dati", err))

        )


    }

    const debouncedFn = useCallback(debounce(fetchProduct, 800), [])
    useEffect(() => {
        if (query === "") {
            setRicerca([])
        }
        debouncedFn(query)
    }, [query])


    // console.log(ricerca)
    const handleInput = (e) => {
        const value = e.target.value
        setQuery(value)
    }
    const handleDropDown = () => {
        setIsOpen(!isOpen)
    }


    return (<section className="bg-blue-200 w-fit m-auto rounded-md  pb-5  ">
        <div className=' mt-48 text-center mb-3'>
            <input type='text' className=' p-2 border-stone-200   rounded-xl border-4 mt-2  mx-1  hover:border-stone-200 bg-green-100  text-stone-700 font-extralight text-xl w-80 h-12' value={query} onChange={handleInput} placeholder='ricerca' />
            <section className=' flex  gap-2 mt-4 mx-2 justify-center'>

                <div className='border-2  text-white text-center bg-blue-300 rounded-2xl w-96 h-20 flex justify-center p-5 items-center  '>
                    <span className=' rounded-2xl w-fit text-2xl font-light border border-r-0 border-t-0 p-1.5'>
                        Suggestion
                    </span>
                    {/* BUTTON CLOSE/OPEN */}
                    <button onClick={handleDropDown} className=' p-3.5   bg-blue-300 border border-white  border-b-0 border-l-0   cursor-pointer hover:bg-blue-900 rounded-2xl '>{isOpen ? <IoIosArrowDropdownCircle /> : <IoIosArrowDropupCircle />}
                    </button>
                </div>
            </section>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  m-auto bg-stone-200 items-center rounded-2xl mx-5  '>



            {isOpen && query.length > 0 ? ricerca.map(el =>
                <div key={el.id} className="border-5 border-blue-200 w-full mt-2 m-auto p-2 rounded-3xl hover:cursor-pointer hover:bg-stone-100  " >
                    <span>{el.name}</span> <br />
                </div>

            )
                : null
            }

        </div>

    </section>
    )

}

export default Ricerca
