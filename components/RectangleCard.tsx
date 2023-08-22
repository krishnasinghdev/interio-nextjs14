import Image from "next/image"

// import { useDispatch } from "react-redux";
// import { toggleModal } from "../context/theme";

const RectangleCard = () => {
  // const dispatch = useDispatch();
  return (
    <div className="padding relative -bottom-14 z-10 mx-auto hidden w-[85%] items-center justify-between rounded-md bg-black  py-8 text-center text-white md:flex lg:w-[65%] ">
      <button
        className=""
        // onClick={() =>
        //   dispatch(toggleModal({ showModal: true, modalType: "signin" }))
        // }
      >
        Sign in
      </button>
      <p className="text-sm">
        Click the button & fill in the details to <br /> sign up to the xyz
        community.
      </p>
      <button className="rounded-full border-2 border-primary  px-4 py-2 ">
        <Image
          src={"/hand.png"}
          alt="interio logo"
          height={20}
          width={20}
          className="mr-2 inline"
        />
        Let&apos;s do this
      </button>
    </div>
  )
}

export default RectangleCard
