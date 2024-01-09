import { AiFillAppstore, AiOutlineEye, AiOutlineHeart, AiOutlineUser } from "react-icons/ai"
import { BsChatDots, BsFillPlayFill, BsShareFill } from "react-icons/bs"
import { CgMenuRightAlt } from "react-icons/cg"
import { FiFolderMinus, FiSettings } from "react-icons/fi"
import { HiOutlineLogout, HiOutlineMail, HiOutlinePhotograph } from "react-icons/hi"
import { IoEyeOffOutline as EyeOff, IoEyeOutline as EyeOn, IoSearch as Search } from "react-icons/io5"
import {
  MdOutlineDateRange as Calender,
  MdOutlineModeEdit as Edit,
  MdOutlineLocationOn as Location,
  MdCancelPresentation,
  MdOutlineCancelPresentation,
} from "react-icons/md"
import { RiSuitcaseLine } from "react-icons/ri"

export const Icons = {
  AiFillAppstore,
  AiOutlineUser,
  BsChatDots,
  BsShareFill,
  FiFolderMinus,
  FiSettings,
  HiOutlineLogout,
  HiOutlineMail,
  HiOutlinePhotograph,
  RiSuitcaseLine,
  AiOutlineEye,
  AiOutlineHeart,
  BsFillPlayFill,
  MdOutlineCancelPresentation,
  MdCancelPresentation,
  CgMenuRightAlt,
  EyeOn,
  EyeOff,
  Search,
  Edit,
  Location,
  Calender,
  Loading: () => (
    <div
      className={`inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    ></div>
  ),
}
