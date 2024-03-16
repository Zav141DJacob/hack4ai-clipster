import { MouseEventHandler } from "react";

type Props = {
    onClick: MouseEventHandler
}

const Card = ({onClick}: Props) => {
    return (
        // {/* card */ }
        < div onClick = {(event) => onClick(event)} className = "z-10 mx-[12%] md:mx-auto h-[60vh] md:w-[24rem] bg-white rounded-xl shadow-md shadow-myRed1 flex flex-row text-center items-center" >
            <p className="text-center w-full font-regularBold text-2xl sm:text-3xl md:text-4xl">
                Life, destiny
            </p>
    </div >
    )
}

export default Card;