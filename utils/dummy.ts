import { shotData } from "@/types/shotType"

export const DUMMYSHOT: shotData[] = [
  {
    _id: "642ed1d9a69faebb7421d582",
    title: "Hotel Room",
    category: "room",
    description:
      "Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people using the space. An interior designer is someone who plans, researches, coordinates, and manages such enhancement projects.",
    tags: ["Minimal", "Modern", "Luxurious"],
    images: [
      {
        title: "Hotel Room",
        url: "https://res.cloudinary.com/ds8j4z2nf/image/upload/v1678014721/Interio/l5_z8ydxy.png",
        _id: "642ed1d9a69faebb7421d583",
      },
    ],
    owner: {
      _id: "642ed18ca69faebb7421d57b",
      name: "Krishna Singh",
      email: "singhks0054@gmail.com",
      follower: [],
      following: [],
    },
  },
]

export const SHOTDATA = [
  {
    image: "/Group1.png",
    title: "Modern Designs",
    type: "modern",
  },
  {
    image: "/Group2.png",
    title: "Minimal Designs",
    type: "minimal",
  },
  {
    image: "/Group3.png",
    title: "Space Saving",
    type: "Space-Saving",
  },
  {
    image: "/Group4.png",
    title: "Luxurious Designs",
    type: "Luxurious",
  },
]

export const TAGS = [
  {
    id: "minimal",
    label: "Minimal",
  },
  {
    id: "luxurious",
    label: "Luxurious",
  },
  {
    id: "spaceSaving",
    label: "Space Saving",
  },
]
