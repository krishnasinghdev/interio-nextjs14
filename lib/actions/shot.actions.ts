"use server"

// import COLLECTION from '../model/collectionModel';
import { ErrorType } from "@/types/core"

import SHOT from "../model/shotModel"
import VENDOR from "../model/vendorModel"
import { connectToDB } from "../mongoose"

//-------------NEW SHOT-------------//
export const addShot = async (body: any) => {
  try {
    connectToDB()
    const shot = await new SHOT(body)
    await shot.save()

    const vendor = await VENDOR.findOne({ _id: body.owner })
    vendor.ownShot.push(shot._id)
    await vendor.save()
    if (!shot || !vendor) {
      throw new Error("Unable to add shot!")
    }

    return { shot }
  } catch (error) {
    const err = error as ErrorType
    throw new Error(`Failed to fetch user: ${err.message}`)
  }
}

//-------------GET ALL SHOT-------------//
export const getShot = async (limit = "10") => {
  try {
    const shots = await SHOT.find({})
      .limit(parseInt(limit))
      .select("title category description tags images owner")
      .populate("owner", "name follower following likedshot email")

    if (!shots) {
      throw Error("NO SHOT FOUND")
    }
    return { shots }
  } catch (error) {
    const err = error as ErrorType
    throw new Error(`Failed to fetch user: ${err.message}`)
  }
}

//-------------GET SHOT BY ID-------------//
export const getshot_byid = async (id: string) => {
  try {
    const shot = await SHOT.findById(id)
      .select("title category description tags images owner")
      .populate("owner", "name follower following likedshot email")

    if (!shot) {
      throw Error("NO SHOT FOUND")
    }
    return { shot }
  } catch (error) {
    const err = error as ErrorType
    throw new Error(`Failed to fetch user: ${err.message}`)
  }
}

//-------------DELETE SHOT BY ID-------------//
// export const delete_shot = async (req, res) => {
//   try {
//     const shot = await SHOT.findByIdAndDelete(req.params.id);
//     if (!shot) {
//       throw Error('NO SHOT FOUND');
//     }
//     response.r200(res, shot);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

//-------------LIKE SHOT BY ID-------------//
// export const like_shot = async (req, res) => {
//   try {
//     const { shot_id, v_id } = req.query;
//     const shot = await SHOT.findOne({ _id: shot_id });
//     if (shot.like.length > 0) {
//       const isLikedBefore = shot.like?.find((id) => id == v_id);
//       if (isLikedBefore) return response.r200(res, {}, 'Already Liked !');
//     }

//     shot.like.push(v_id);
//     await shot.save();

//     const vendor = await VENDOR.findOne({ _id: v_id });
//     vendor.likedShot.push(shot_id);

//     await vendor.save();
//     if (!shot || !vendor) {
//       throw Error('NO SHOT FOUND');
//     }
//     response.r200(res, {}, 'Shot Liked !');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

//-------------SAVE SHOT BY ID-------------//
// export const save_shot = async (req, res) => {
//   try {
//     const { shot_id, v_id } = req.query;

//     const shot = await SHOT.findOne({ _id: shot_id });
//     if (!shot) {
//       throw new Error('Invalid shot id');
//     }

//     const vendor = await VENDOR.findOne({ _id: v_id });
//     if (vendor.shotCollections.length > 0) {
//       const collection = await COLLECTION.findOne({ _id: vendor.shotCollections[0] });
//       const isSavedBefore = collection.shots?.find((id) => id == shot_id);
//       if (isSavedBefore) return response.r400(res, 'Already Saved !');
//       collection.shots.push(shot_id);
//       await collection.save();
//     } else {

//       const collection = await new COLLECTION({
//         cname: 'My Collection',
//         owner: v_id,
//         shots: [shot_id],
//       });
//       await collection.save();
//       console.log(collection)
//       if (!collection) {
//         throw new Error('Unable to create collection');
//       }
//       vendor.shotCollections.push(collection._id);
//     }

//     await vendor.save();
//     if (!shot || !vendor) {
//       throw Error('NO SHOT FOUND');
//     }
//     response.r200(res, {}, 'Shot Saved !');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
